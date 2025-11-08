import { createContext } from 'react';

export const ArtisanContext = createContext({}); 

export const useArtisanIndex = () => useContext(ArtisanContext);