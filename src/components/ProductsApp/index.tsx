import React, { useEffect } from 'react';
import Header from '../Header';
import ProductsList from '../ProductsList';
import { useAppDispatch } from '../../redux/hooks';
import { initProducts } from '../../redux/slices/products';
import products from './productsList';
import ProductPreview from '../ProductPreview';
import ActionsPanel from '../ActionsPanel';
import Pagination from '../Pagination';
import styles from './styles.module.scss';

const ProductsApp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initProducts(products));
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <ActionsPanel />
        <div className={styles.products}>
          <ProductsList />
          <ProductPreview />
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default ProductsApp;
