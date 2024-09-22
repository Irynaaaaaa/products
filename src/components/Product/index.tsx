import React from 'react';
import { Product as ProductType } from '../../types';
import { useAppSelector } from '../../redux/hooks';
import { ProductIcon } from '../../assets/icons';
import Button from '../Button';
import styles from './styles.module.scss';

type ProductProps = {
  product: ProductType;
  onDeleteProduct: (id: number) => void;
  onSelectProduct: (product: ProductType) => void;
};

const Product = ({
  product,
  onDeleteProduct,
  onSelectProduct,
}: ProductProps) => {
  const { id, name, description } = product;
  const selectedProduct = useAppSelector(
    (state) => state.products.selectedProduct
  );

  return (
    <li
      className={`${styles.product} ${selectedProduct?.id === id ? styles.product_active : ''}`}
      onClick={() => onSelectProduct(product)}
    >
      <div className={styles.product_icon_wrapper}>
        <ProductIcon fill="white" />
      </div>
      <div className={styles.product_info}>
        <h3 className={styles.product_info_title}>{name}</h3>
        <span className={styles.product_info_description}>{description}</span>
      </div>
      <Button
        title="Delete"
        color="delete"
        onClick={() => onDeleteProduct(id)}
        className={styles.product_delete}
      />
    </li>
  );
};

export default Product;
