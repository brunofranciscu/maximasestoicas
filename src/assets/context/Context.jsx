import React, { createContext, useState } from 'react';

export const MaximaContext = createContext();

export const MaximaProvider = ({ children }) => {
  const [maxima, setMaxima] = useState('');

  return (
    <MaximaContext.Provider value={{ maxima, setMaxima }}>
      {children}
    </MaximaContext.Provider>
  )
};