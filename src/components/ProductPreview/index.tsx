import React, { useEffect, useState } from 'react';
import Input from '../Input';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addProduct, updateProduct } from '../../redux/slices/products';
import Button from '../Button';
import TextArea from '../TextArea';
import { ProductIcon } from '../../assets/icons';
import Placeholder from './Placeholder';
import styles from './styles.module.scss';

const ProductPreview = () => {
  const dispatch = useAppDispatch();
  const { selectedProduct, isNewProduct } = useAppSelector(
    (state) => state.products
  );
  const { name = '', price = '' } = selectedProduct || {};

  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const saveButtonDisabled =
    !newName ||
    !Number(newPrice) ||
    (newName === name && Number(newPrice) === price);

  const onSave = () => {
    if (!selectedProduct) return;
    const newProduct = {
      ...selectedProduct,
      name: newName,
      price: Number(newPrice),
      description: newDescription,
    };

    if (isNewProduct) {
      return dispatch(addProduct(newProduct));
    }
    dispatch(updateProduct(newProduct));
  };

  useEffect(() => {
    if (!selectedProduct) return;
    setNewName(selectedProduct.name);
    setNewPrice(selectedProduct.price.toString());
    setNewDescription(selectedProduct?.description || '');
  }, [selectedProduct]);

  if (!selectedProduct) return <Placeholder title="Add/Select a product" />;

  return (
    <div className={styles.preview}>
      <div className={styles.preview_icon_wrapper}>
        <ProductIcon fill="white" />
      </div>
      <Input
        name="name"
        label="Name"
        value={newName}
        placeholder="Product name"
        onChange={(e) => setNewName(e.target.value)}
        maxLength={30}
      />
      <TextArea
        name="description"
        label="Description"
        value={newDescription}
        placeholder="Product description"
        onChange={(e) => setNewDescription(e.target.value)}
        rows={4}
        maxLength={200}
      />
      <Input
        name="price"
        label="Price"
        value={newPrice}
        type="number"
        placeholder="Product price"
        onChange={(e) => setNewPrice(e.target.value)}
        className={styles.price}
        min={0}
      />
      <Button
        title="Save"
        onClick={onSave}
        disabled={saveButtonDisabled}
        size="small"
      />
    </div>
  );
};

export default ProductPreview;
