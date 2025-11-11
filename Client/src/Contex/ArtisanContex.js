import { createContext, useContext } from 'react';

export const ContextValue = createContext({}); 

export const useContextValue = () => useContext(ContextValue);