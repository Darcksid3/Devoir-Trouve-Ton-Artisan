import React, { useEffect, useState, useContext } from 'react';
import { ArtisanContext } from '../Contex/ArtisanContex';
import ky from 'ky'; 


export function ArtisanDataProvider({ children }) {
const [artisanIndex, setArtisanIndex] = useState({});
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchAndBuildIndex = async () => {
    try {
        const url = process.env.REACT_APP_URL_API;
        const response = await ky(`${url}/artisansimpleindex`); 
        const data = await response.json();

        const artisanList = data.entreprise; 

        // S'assurer que 'artisanList' est bien un tableau
        if (!Array.isArray(artisanList)) {
            console.error("La réponse API ne contenait pas le tableau 'entreprise'.");
            setLoading(false);
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
    } catch (error) {
        console.error("Erreur de chargement de l'index des artisans:", error);
    } finally {
        setLoading(false);
    }
    };

    fetchAndBuildIndex();
}, []); 

if (loading) {
    return <div>Chargement de l'index...</div>; 
}

return (
    <ArtisanContext.Provider value={artisanIndex}>
        {children}
    </ArtisanContext.Provider>
);
}