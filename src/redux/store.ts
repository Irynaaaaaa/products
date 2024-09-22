import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './slices/products';

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['products'],
        ignoredActions: [
          'products/selectProduct',
          'products/updateProduct',
          'products/initProducts',
          'products/addProduct',
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
