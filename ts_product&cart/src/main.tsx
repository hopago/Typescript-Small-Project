import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { CartContextProvider } from './context/CartProvider.tsx'
import { ProductsContextProvider } from './context/ProductsProvider.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProductsContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </ProductsContextProvider>
  </React.StrictMode>
);
