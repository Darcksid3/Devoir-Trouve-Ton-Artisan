// src/components/ArtisanDataProvider.jsx
import React, { useEffect, useState, useContext } from 'react';
// import { ky } from 'ky'; // Si vous utilisez ky, sinon fetch
import { ArtisanContext } from '../Contex/ArtisanContex';
import ky from 'ky'; 


export function ArtisanDataProvider({ children }) {
const [artisanIndex, setArtisanIndex] = useState({});
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchAndBuildIndex = async () => {
    try {
        const url = process.env.REACT_APP_URL_API;
        // 🛑 Assurez-vous d'avoir un endpoint API qui renvoie une liste simple: [{id, nom}]
        const response = await ky(`${url}/artisansimpleindex`); 
        const data = await response.json();
        //console.log(`fetchAndBuildIndex data: ${JSON.stringify(data)}`);

        const artisanList = data.entreprise; 

        // S'assurer que 'artisanList' est bien un tableau (et non undefined ou autre)
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
}, []); // [] : se lance une seule fois au montage

if (loading) {
    // Optionnel: Afficher un loader si la barre de navigation dépend de ces données
    // Pour une Navbar, on pourrait retourner null ou un loader très rapide.
    return <div>Chargement de l'index...</div>; 
}

return (
    <ArtisanContext.Provider value={artisanIndex}>
    {children}
    </ArtisanContext.Provider>
);
}