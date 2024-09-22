import { PayloadAction } from '@reduxjs/toolkit';
import { Product, SortOptions } from '../../types';

export type ProductsState = {
  initialProducts: Product[];
  products: Product[];
  selectedProduct: Product | null;
  isNewProduct: boolean;
  page: number;
  sortBy: SortOptions | null;
};

const sortedProducts = (products: Product[], sortValue: SortOptions) => {
  return [...products].sort((a, b) => {
    if (sortValue === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sortValue === 'creationDate') {
      return (
        new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
      );
    }
    return 0;
  });
};

const getStoredProducts = () =>
  JSON.parse(localStorage.getItem('products') || '[]') as Product[];

export const addProductHandler = (
  state: ProductsState,
  action: PayloadAction<Product>
) => {
  state.products.push(action.payload);
  state.initialProducts.push(action.payload);

  if (state.sortBy) {
    state.products = sortedProducts(state.products, state.sortBy);
    state.initialProducts = sortedProducts(state.initialProducts, state.sortBy);
  }

  state.isNewProduct = false;
  state.selectedProduct = null;

  localStorage.setItem(
    'products',
    JSON.stringify([...getStoredProducts(), action.payload])
  );

  window.history.pushState(null, '', '/products');
};

export const removeProductHandler = (
  state: ProductsState,
  action: PayloadAction<number>
) => {
  const productIndex = state.products.findIndex(
    ({ id }) => id === action.payload
  );
  if (state.selectedProduct?.id === action.payload) {
    if (state.products[productIndex + 1]) {
      state.selectedProduct = state.products[productIndex + 1];
    } else if (state.products[productIndex - 1]) {
      state.selectedProduct = state.products[productIndex - 1];
    } else {
      state.selectedProduct = null;
    }
  }
  state.products = state.products.filter(
    (product) => product.id !== action.payload
  );
  state.initialProducts = state.initialProducts.filter(
    (product) => product.id !== action.payload
  );

  const storedProductsFiltered = getStoredProducts().filter(
    (product) => product.id !== action.payload
  );
  localStorage.setItem('products', JSON.stringify(storedProductsFiltered));

  if (state.selectedProduct) {
    window.history.pushState(null, '', `/products/${state.selectedProduct.id}`);
  } else {
    window.history.pushState(null, '', '/products');
  }
};

export const updateProductHandler = (
  state: ProductsState,
  action: PayloadAction<Product>
) => {
  state.products = state.products.map((product) =>
    product.id === action.payload.id ? action.payload : product
  );
  state.initialProducts = state.initialProducts.map((product) =>
    product.id === action.payload.id ? action.payload : product
  );

  const sortedProducts = getStoredProducts();
  const updatedProducts = sortedProducts.map((product) =>
    product.id === action.payload.id ? action.payload : product
  );
  localStorage.setItem('products', JSON.stringify(updatedProducts));
};

export const sortProductsHandler = (
  state: ProductsState,
  action: PayloadAction<SortOptions>
) => {
  state.sortBy = action.payload;
  if (!action.payload) {
    state.products = getStoredProducts();
    return;
  }
  state.products = sortedProducts(state.products, action.payload);
  state.initialProducts = sortedProducts(state.initialProducts, action.payload);
};

export const searchProductsHandler = (
  state: ProductsState,
  action: PayloadAction<string>
) => {
  if (!action.payload) {
    state.products = state.initialProducts;
    return;
  }
  state.products = state.initialProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(action.payload.toLowerCase()) ||
      product.description?.toLowerCase().includes(action.payload.toLowerCase())
  );
};
