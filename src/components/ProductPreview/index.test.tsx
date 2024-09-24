import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { configureStore, Store } from '@reduxjs/toolkit';
import { render, fireEvent } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import ProductPreview from '.';
import ActionsPanel from '../ActionsPanel';
import { productsSlice } from '../../redux/slices/products';
import { RootState } from '../../redux/store';
import { findByLabelTextType, getByRole } from '../../types';

let store: Store<RootState>;

beforeEach(() => {
  store = configureStore({
    reducer: {
      products: productsSlice.reducer,
    },
  });
});

afterEach(cleanup);

const renderWithStore = (component: React.ReactElement) =>
  render(<Provider store={store}>{component}</Provider>);

const getFormFields = async (findByLabelText: findByLabelTextType) => {
  const nameInput = await findByLabelText('Name');
  const descriptionTextArea = await findByLabelText('Description');
  const priceInput = await findByLabelText('Price');

  return { nameInput, descriptionTextArea, priceInput };
};

const clickAddButton = (getByRole: getByRole) => {
  const addButton = getByRole('button', { name: '+ Add' });
  fireEvent.click(addButton);
};

describe('ProductPreview', () => {
  it('should render the placeholder if no products selected', () => {
    const { getByTestId } = renderWithStore(<ProductPreview />);

    const placeholder = getByTestId('preview-placeholder');
    expect(placeholder).toBeInTheDocument();
  });

  it('should display form fields after adding a new product', async () => {
    const { getByRole, findByLabelText, getByText } = renderWithStore(
      <>
        <ActionsPanel />
        <ProductPreview />
      </>
    );

    clickAddButton(getByRole);

    const { nameInput, descriptionTextArea, priceInput } =
      await getFormFields(findByLabelText);

    expect(nameInput).toBeInTheDocument();
    expect(descriptionTextArea).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(
      getByText(/name is required, only 30 symbols allowed/i)
    ).toBeInTheDocument();
    expect(
      getByText(/price should be a number greater than 0/i)
    ).toBeInTheDocument();

    expect(store.getState().products.selectedProduct).toEqual({
      id: expect.any(Number),
      name: '',
      description: '',
      price: 0,
      creationDate: expect.any(Date),
    });
  });

  it('should show validation messages for inputs', async () => {
    const { getByRole, findByLabelText, getByText } = renderWithStore(
      <>
        <ActionsPanel />
        <ProductPreview />
      </>
    );

    clickAddButton(getByRole);

    const { nameInput, descriptionTextArea, priceInput } =
      await getFormFields(findByLabelText);

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

  it('save product', async () => {
    const { getByRole, findByLabelText, getByTestId } = renderWithStore(
      <>
        <ActionsPanel />
        <ProductPreview />
      </>
    );

    clickAddButton(getByRole);

    const { nameInput, descriptionTextArea, priceInput } =
      await getFormFields(findByLabelText);

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
    expect(store.getState().products.selectedProduct).toBeNull();
  });
});
