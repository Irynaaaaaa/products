import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, SortOptions } from '../../types';

type ProductsState = {
  initialProducts: Product[];
  products: Product[];
  selectedProduct: Product | null;
  isNewProduct: boolean;
  page: number;
  sortBy: SortOptions | null;
};

const initialState: ProductsState = {
  initialProducts: [],
  products: [],
  selectedProduct: null,
  isNewProduct: false,
  page: 1,
  sortBy: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    initProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.initialProducts = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      state.isNewProduct = false;
    },
    removeProduct: (state, action: PayloadAction<number>) => {
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
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    },
    selectProduct: (
      state,
      action: PayloadAction<{ product: Product; isNew?: boolean }>
    ) => {
      state.selectedProduct = action.payload.product;
      state.isNewProduct = !!action.payload.isNew;
    },
    filterProducts: (state, action: PayloadAction<string>) => {
      if (!action.payload) {
        state.products = state.initialProducts;
        return;
      }
      state.products = state.initialProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          product.description
            ?.toLowerCase()
            .includes(action.payload.toLowerCase())
      );
    },
    sortProducts: (state, action: PayloadAction<SortOptions>) => {
      state.sortBy = action.payload;
      if (!action.payload) {
        state.products = state.initialProducts;
        return;
      }
      state.products = state.products.sort((a, b) => {
        if (action.payload === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (action.payload === 'creationDate') {
          return a.creationDate.getTime() - b.creationDate.getTime();
        }
        return 0;
      });
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateProduct,
  selectProduct,
  initProducts,
  filterProducts,
  changePage,
  sortProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
