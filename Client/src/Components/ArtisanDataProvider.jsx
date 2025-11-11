import React, { useEffect, useState, useContext } from 'react';
import { ArtisanContext } from '../Contex/ArtisanContex';
import { useRecupDb } from './FetchDb';

export function ArtisanDataProvider({ children }) {
    const [fetchEnabled, setFetchEnabled] = useState(false);

    // 1. Hook pour activer le fetch après un délai
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
    
    // état de chargement du Hook
    if (!fetchEnabled || isFetchingData) { // Afficher le chargement si fetch n'est pas encore activé OU si les données sont en cours de fetch
        console.log("Chargement de l'index")
        //return <p>"Chargement de l'index..." </p>
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