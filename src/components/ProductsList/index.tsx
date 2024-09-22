import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Product from '../Product';
import styles from './styles.module.scss';
import { removeProduct, selectProduct } from '../../redux/slices/products';
import { Product as ProductType } from '../../types';
import { productsPerPage } from '../../constants';

const ProductsList = () => {
  const { products, page } = useAppSelector((state) => state.products);

  const startIndex = (page - 1) * productsPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const dispatch = useAppDispatch();

  const onDeleteProduct = (id: number) => {
    dispatch(removeProduct(id));
  };

  const onSelectProduct = (product: ProductType) => {
    dispatch(selectProduct({ product }));
  };

  return (
    <ul className={styles.products}>
      {paginatedProducts.map((product) => (
        <Product
          key={product.id}
          product={product}
          onDeleteProduct={onDeleteProduct}
          onSelectProduct={onSelectProduct}
        />
      ))}
    </ul>
  );
};

export default ProductsList;
