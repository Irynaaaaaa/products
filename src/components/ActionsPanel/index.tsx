import React, { useEffect, useState } from 'react';
import { SingleValue } from 'react-select';
import Button from '../Button';
import Input from '../Input';
import { useDebounce } from '../../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Product, SortOptions } from '../../types';
import {
  changePage,
  searchProducts,
  selectProduct,
  sortProducts,
} from '../../redux/slices/products';
import styles from './styles.module.scss';
import CustomSelect from '../Select';

export type SelectOption = {
  value: SortOptions;
  label: string;
};

const options: SelectOption[] = [
  { value: '', label: 'Initial' },
  { value: 'name', label: 'Name' },
  { value: 'creationDate', label: 'Date' },
];

const ActionsPanel = () => {
  const [search, setSearch] = useState('');

  const { page, sortBy } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const debouncedSearch = useDebounce(search, 500);

  const onAddProduct = () => {
    const emptyProduct: Product = {
      id: new Date().getTime(),
      name: '',
      description: '',
      price: 0,
      creationDate: new Date(),
    };
    dispatch(selectProduct({ product: emptyProduct, isNew: true }));
  };

  const onSortChange = (option: SingleValue<SelectOption>) => {
    dispatch(sortProducts(option?.value || ''));
  };

  useEffect(() => {
    dispatch(searchProducts(debouncedSearch));
    if (page !== 1) {
      dispatch(changePage(1));
    }
  }, [debouncedSearch]);

  return (
    <div className={styles.panel}>
      <Button title="+ Add" onClick={onAddProduct} />
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        name="search"
      />
      <CustomSelect
        options={options}
        onChange={onSortChange}
        value={options.find((option) => option.value === sortBy) || null}
        className={styles.select}
        placeholder="Sort by"
      />
    </div>
  );
};

export default ActionsPanel;
