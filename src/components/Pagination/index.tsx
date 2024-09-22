import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Button from '../Button';
import { changePage } from '../../redux/slices/products';
import { productsPerPage } from '../../constants';
import styles from './styles.module.scss';

const Pagination = () => {
  const { page, products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const totalPages = Math.ceil(products.length / productsPerPage);

  const onPrevious = () => {
    dispatch(changePage(page - 1));
  };

  const onNext = () => {
    dispatch(changePage(page + 1));
  };

  useEffect(() => {
    if (totalPages && page > totalPages) {
      dispatch(changePage(totalPages));
    }
  }, [totalPages]);

  return (
    <div className={styles.pagination}>
      <Button
        title="< Previous"
        onClick={onPrevious}
        disabled={page === 1}
        size="small"
      />
      <span>
        {page} {!!totalPages && <span>of {totalPages}</span>}
      </span>
      <Button
        title="Next >"
        onClick={onNext}
        disabled={page === totalPages || !totalPages}
        size="small"
      />
    </div>
  );
};

export default Pagination;
