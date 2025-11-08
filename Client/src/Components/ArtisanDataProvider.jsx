import React, { useEffect, useState, useContext } from 'react';
import { ArtisanContext } from '../Contex/ArtisanContex';
import { useRecupDb } from './FetchDb';

export function ArtisanDataProvider({ children }) {
const { 
        data: rawData, 
        isLoading: isFetchingData, 
        error 
    } = useRecupDb('/artisansimpleindex');
    const [artisanIndex, setArtisanIndex] = useState({});

useEffect(() => {
        
        if (!rawData) {
            return;
        }
        const artisanList = rawData.entreprise; 

        if (!Array.isArray(artisanList)) {
            console.error("La réponse API ne contenait pas le tableau 'entreprise'.");
            return;
        }

        // Créer l'Index pour la recherche rapide O(1)
        const index = artisanList.reduce((acc, artisan) => {
            // Normalisation: minuscules, suppression des espaces inutiles
            const normalizedName = artisan.nom_entreprise.toLowerCase().trim(); 
            acc[normalizedName] = artisan.id_artisan; // Assigner l'ID
            return acc;
        }, {});
        
        setArtisanIndex(index);
        
    }, [rawData]); 

    // état de chargement du Hook
    if (isFetchingData) {
        return <div>Chargement de l'index...</div>; 
    }

    if (error) {
        // Gestion des erreurs de réseau
        return <p style={{ color: 'red' }}>Erreur de chargement de l'index: {error.message || 'inconnu'}</p>;
    }

return (
    <ArtisanContext.Provider value={artisanIndex}>
        {children}
    </ArtisanContext.Provider>
);
}