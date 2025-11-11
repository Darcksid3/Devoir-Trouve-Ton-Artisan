import React, { useEffect, useState, useContext } from 'react';
import { ContextValue } from '../Contex/ArtisanContex';
import { useRecupDb } from './FetchDb';

export function ArtisanDataProvider({ children }) {
    const [fetchEnabled, setFetchEnabled] = useState(false);

    useEffect(() => {
        // Démarrer la requête API après 500ms (ajustez ce délai)
        const timer = setTimeout(() => {
            setFetchEnabled(true);
        }, 500); 

        return () => clearTimeout(timer); // Nettoyage
    }, []);
    
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

    
    const isIndexLoading = !fetchEnabled || isFetchingData;

    const contextValue = {
        artisanIndex, // index de recherche existant
        isIndexLoading: isIndexLoading,
        isIndexError: error !== null,
    };
    if (isIndexLoading) { 
        console.log("Chargement de l'index");
    }
    
    if (error) {
        // Gestion des erreurs de réseau
        return <p style={{ color: 'red' }}>Erreur de chargement de l'index: {error.message || 'inconnu'}</p>;
    }


return (
    <ContextValue.Provider value={contextValue}>
        {children}
    </ContextValue.Provider>
);
}