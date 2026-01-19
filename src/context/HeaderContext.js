'use client';

import { createContext, useContext, useState } from 'react';

const HeaderContext = createContext({
  isTransparent: false,
  setIsTransparent: () => {},
});

export function HeaderProvider({ children }) {
  const [isTransparent, setIsTransparent] = useState(false);

  return (
    <HeaderContext.Provider value={{ isTransparent, setIsTransparent }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}
