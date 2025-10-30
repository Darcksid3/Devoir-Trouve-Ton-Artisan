import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import ky from 'ky'; 

import MiniCard from '../Components/MiniCard';

const fetchArtisansByCategorie = async (categorieNom) => {

    const url = `http://localhost:8100/artisansparcategories/${categorieNom}`; 
    try {
        const response = await ky(url).json();

        return response.artisans || response; 
    } catch (error) {
        console.error(`Erreur lors du chargement des artisans pour ${categorieNom}:`, error);
        throw new Error("Impossible de charger les données de cette catégorie.");
    }
};

const Categories = () => {
    const { categorie } = useParams(); 
    
    const [artisans, setArtisans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        
        fetchArtisansByCategorie(categorie)
            .then(data => {
                setArtisans(data);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [categorie]); 

    
    if (isLoading) {
        return <p>Chargement des artisans {categorie}...</p>;
    }
    
    if (error) {
        return <p style={{ color: 'red' }}>Erreur : {error}</p>;
    }

    return (
        <div>
            <h2>Artisans de la catégorie : {categorie}</h2>
            
            {artisans.length === 0 ? (
                <p>Aucun artisan trouvé dans cette catégorie.</p>
            ) : (
                artisans.map((artisan, index) => (
                    <div key={index} className="artisan-item">
                        <MiniCard 
                        idArtisan = {artisan?.id_artisan}
                        nom = {artisan?.nom_entreprise}
                        note = {artisan?.note}
                        ville = {artisan?.ville}
                        specialite = {artisan?.Specialite?.nom_specialite}
                    />
                    </div>
                ))
            )}
        </div>
    );
};

export default Categories;