import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../types';
import { ProductsState } from './utils';
import {
  addProductHandler,
  removeProductHandler,
  searchProductsHandler,
  sortProductsHandler,
  updateProductHandler,
} from './productsHandlers';

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  isNewProduct: false,
  page: 1,
  sortBy: null,
  searchValue: '',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    initProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: addProductHandler,
    removeProduct: removeProductHandler,
    updateProduct: updateProductHandler,
    selectProduct: (
      state,
      action: PayloadAction<{
        product: ProductsState['selectedProduct'];
        isNew?: boolean;
      }>
    ) => {
      state.selectedProduct = action.payload.product;
      state.isNewProduct = !!action.payload.isNew;
    },
    searchProducts: searchProductsHandler,
    sortProducts: sortProductsHandler,
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
  searchProducts,
  changePage,
  sortProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
