import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import ky from 'ky'; 

import RatingStars from '../Components/RatingStars';
const fetchArtisans = async (idArtisan) => {

    const url = `http://localhost:8100/artisanparid/${idArtisan}`;
    try {
        const responce = await ky(url).json();
        return responce.artisans || responce;
    }catch (error) {
        console.error(`Erreur lors du chargement de l'artisan pour ${idArtisan}:`, error);
        throw new Error("Impossible de charger les données de l'artisan.");
    }
};

const Artisan = () => {
    const { idArtisan } = useParams();

    const [artisans, setArtisans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
            setIsLoading(true);
            setError(null);
            
            fetchArtisans(idArtisan)
                .then(data => {
                    setArtisans(data);
                })
                .catch(err => {
                    setError(err.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
    
        }, [idArtisan]); 
    
        
        if (isLoading) {
            return <p>Chargement des artisans {artisans}...</p>;
        }
        
        if (error) {
            return <p style={{ color: 'red' }}>Erreur : {error}</p>;
        }
    return (
        <div>
            <h2>Page Artisan</h2>
            <p>{artisans?.nom_entreprise}</p>
            <p><RatingStars note={artisans?.note} /> / {artisans?.note}</p>
            <p>{artisans?.ville}</p>
            <p>{artisans?.a_propos}</p>
            <p>{artisans?.email}</p>
            <p>{artisans?.site_web}</p>
            <p>{artisans?.Specialite?.nom_specialite}</p>
            <p>{artisans?.Specialite?.Categorie?.nom_categorie}</p>
        </div>
    )
};

export default Artisan;