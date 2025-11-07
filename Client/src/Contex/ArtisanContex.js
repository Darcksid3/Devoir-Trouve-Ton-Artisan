// src/context/ArtisanContext.js
import { createContext } from 'react';

// artisanIndex sera un objet: { "nom de l'entreprise normalisé": idArtisan, ... }
export const ArtisanContext = createContext({}); 

// Créez un composant simple pour la lisibilité
export const useArtisanIndex = () => useContext(ArtisanContext);