import React, { useEffect } from 'react';
import Header from '../Header';
import ProductsList from '../ProductsList';
import ProductPreview from '../ProductPreview';
import ActionsPanel from '../ActionsPanel';
import Pagination from '../Pagination';
import styles from './styles.module.scss';

const ProductsApp = () => {
  useEffect(() => {
    if (!window.location.pathname.startsWith('/products/')) {
      window.history.pushState(null, '', '/products');
    }
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
