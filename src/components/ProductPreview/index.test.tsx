import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import ProductPreview from '.';
import ActionsPanel from '../ActionsPanel';
import { productsSlice, selectProduct } from '../../redux/slices/products';
import { configureStore } from '@reduxjs/toolkit';

const mockStore = configureStore({
  reducer: {
    products: productsSlice.reducer,
  },
});

const store = mockStore;

describe('ProductPreview', () => {
  it('render placeholder', () => {
    const store = mockStore;
    const { getByTestId } = render(
      <Provider store={store}>
        <ProductPreview />
      </Provider>
    );

    const placeholder = getByTestId('preview-placeholder');
    expect(placeholder).toBeInTheDocument();
  });

  it('add new product preview', async () => {
    const { getByLabelText, getByRole, getByTestId } = render(
      <Provider store={store}>
        <React.Fragment>
          <ActionsPanel />
          <ProductPreview />
        </React.Fragment>
      </Provider>
    );

    const addButton = getByRole('button', { name: '+ Add' });
    fireEvent.click(addButton);
    store.dispatch(
      selectProduct({
        product: {
          name: 'Product 1',
          description: '',
          price: 0,
          id: 1,
          creationDate: new Date(),
        },
        isNew: true,
      })
    );

    const nameInput = getByLabelText('Name');
    const descriptionTextArea = getByLabelText('Description');
    const priceInput = getByLabelText('Price');
    const saveButton = getByRole('button', { name: 'Save' });

    expect(nameInput).toBeInTheDocument();
    expect(descriptionTextArea).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeDisabled();
    expect(() => getByTestId('preview-placeholder')).toThrow();
  });

  it('messages for name and description', () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <ProductPreview />
      </Provider>
    );

    const nameInput = getByLabelText('Name');
    const descriptionTextArea = getByLabelText('Description');
    const priceInput = getByLabelText('Price');

    fireEvent.change(nameInput, { target: { value: 'a'.repeat(30) } });
    fireEvent.change(descriptionTextArea, {
      target: { value: 'a'.repeat(200) },
    });
    fireEvent.change(priceInput, { target: { value: -1 } });

    expect(
      getByText(/name is required, only 30 symbols allowed/i)
    ).toBeInTheDocument();
    expect(getByText(/only 200 symbols allowed/i)).toBeInTheDocument();
    expect(
      getByText(/price should be a number greater than 0/i)
    ).toBeInTheDocument();
  });

  it('save product', () => {
    const { getByLabelText, getByRole, getByTestId } = render(
      <Provider store={store}>
        <ProductPreview />
      </Provider>
    );

    const nameInput = getByLabelText('Name');
    const descriptionTextArea = getByLabelText('Description');
    const priceInput = getByLabelText('Price');
    const saveButton = getByRole('button', { name: 'Save' });

    fireEvent.change(nameInput, { target: { value: 'a'.repeat(10) } });
    fireEvent.change(descriptionTextArea, {
      target: { value: 'a'.repeat(20) },
    });
    fireEvent.change(priceInput, { target: { value: 1 } });

    expect(saveButton).toBeEnabled();
    fireEvent.click(saveButton);

    const placeholder = getByTestId('preview-placeholder');
    expect(placeholder).toBeInTheDocument();
  });
});
