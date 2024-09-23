import React, { useEffect } from 'react';
import Header from '../../components/Header';
import ProductsList from '../../components/ProductsList';
import ProductPreview from '../../components/ProductPreview';
import ActionsPanel from '../../components/ActionsPanel';
import Pagination from '../../components/Pagination';
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
