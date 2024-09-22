import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Product from '../Product';
import {
  initProducts,
  removeProduct,
  selectProduct,
} from '../../redux/slices/products';
import { Product as ProductType } from '../../types';
import { productsPerPage } from '../../constants';
import defaultProducts from './productsList';
import styles from './styles.module.scss';

const ProductsList = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.products.page);
  const products = useAppSelector((state) => state.products.products);
  const selectedProduct = useAppSelector(
    (state) => state.products.selectedProduct
  );

  const startIndex = (page - 1) * productsPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const onDeleteProduct = (id: number) => {
    dispatch(removeProduct(id));
  };

  const onSelectProduct = (product: ProductType) => {
    dispatch(selectProduct({ product }));
    window.history.pushState(null, '', `/products/${product.id}`);
  };

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (!savedProducts) {
      localStorage.setItem('products', JSON.stringify(defaultProducts));
      dispatch(initProducts(defaultProducts));
    } else {
      dispatch(initProducts(JSON.parse(savedProducts)));
    }
  }, []);

  useEffect(() => {
    if (!products.length) return;
    const urlParts = window.location.pathname.split('/');
    const productId = urlParts[urlParts.length - 1];
    if (productId && !isNaN(Number(productId))) {
      const product = products.find((p) => p.id === Number(productId));
      if (product) {
        dispatch(selectProduct({ product }));
      } else {
        window.history.pushState(null, '', '/products');
      }
    }
  }, [!!products.length]);

  if (!products.length) {
    return (
      <div className={styles.products}>
        <p className={styles.no_products}>No products found</p>
      </div>
    );
  }

  return (
    <ul className={styles.products}>
      {paginatedProducts.map((product) => (
        <Product
          key={product.id}
          product={product}
          isSelected={selectedProduct?.id === product.id}
          onDeleteProduct={onDeleteProduct}
          onSelectProduct={onSelectProduct}
        />
      ))}
    </ul>
  );
};

export default ProductsList;
