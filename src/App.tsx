import React from 'react';
import ProductsApp from './pages/ProductsApp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ProductsApp />
      <ToastContainer />
    </div>
  );
}

export default App;
