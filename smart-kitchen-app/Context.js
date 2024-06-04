import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  return (
    <ProductContext.Provider value={[products, setProducts, user, setUser]}>
      {children}
    </ProductContext.Provider>
  )
}
