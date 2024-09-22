export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  creationDate: Date;
};

export type SortOptions = 'name' | 'creationDate';
