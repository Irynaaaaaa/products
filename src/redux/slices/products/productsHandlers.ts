import { PayloadAction } from '@reduxjs/toolkit';
import { Product, SortOptions } from '../../../types';
import {
  checkSearchValue,
  ProductsState,
  sortProducts,
  getStoredProducts,
} from './utils';

export const addProductHandler = (
  state: ProductsState,
  action: PayloadAction<Product>
) => {
  if (
    !state.searchValue ||
    checkSearchValue(action.payload, state.searchValue)
  ) {
    state.products.push(action.payload);
  }

  if (state.sortBy) {
    state.products = sortProducts(state.products, state.sortBy);
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
  state.selectedProduct = action.payload;
  state.products = state.products.map((product) =>
    product.id === action.payload.id ? action.payload : product
  );

  if (state.sortBy) {
    state.products = sortProducts(state.products, state.sortBy);
  }
  if (
    state.searchValue &&
    !checkSearchValue(action.payload, state.searchValue)
  ) {
    state.products = state.products.filter(
      (product) => product.id !== action.payload.id
    );
  }

  localStorage.setItem(
    'products',
    JSON.stringify(
      getStoredProducts().map((product) =>
        product.id === action.payload.id ? action.payload : product
      )
    )
  );
};

export const sortProductsHandler = (
  state: ProductsState,
  action: PayloadAction<SortOptions>
) => {
  state.sortBy = action.payload;
  state.products = sortProducts(state.products, action.payload);
};

export const searchProductsHandler = (
  state: ProductsState,
  action: PayloadAction<string>
) => {
  const sortedProducts = sortProducts(getStoredProducts(), state.sortBy);

  if (!action.payload.trim()) {
    state.products = sortedProducts;
    return;
  }

  state.searchValue = action.payload;
  state.products = sortedProducts.filter((product) =>
    checkSearchValue(product, action.payload)
  );
};
