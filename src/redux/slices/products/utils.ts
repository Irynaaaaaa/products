import { Product, SortOptions } from '../../../types';

export type ProductsState = {
  products: Product[];
  selectedProduct: Product | null;
  isNewProduct: boolean;
  page: number;
  sortBy: SortOptions | null;
  searchValue: string;
};

export const checkSearchValue = (product: Product, searchValue: string) =>
  product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
  product.description?.toLowerCase().includes(searchValue.toLowerCase());

export const sortProducts = (
  products: Product[],
  sortValue: SortOptions | null
) => {
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

export const getStoredProducts = () =>
  JSON.parse(localStorage.getItem('products') || '[]') as Product[];
