import React, {useEffect, useState} from "react";
import ky from 'ky';

import MiniCard from "./MiniCard";

const fetchArtisan = async () => {
    try{
        const responce = await ky(`http://localhost:8100/artisansdumois`).json();
        return responce.artisans;

    } catch(error) {
        console.log(`Erreur ky lors de la récupération des artisans ${error}`);
        throw new Error ('Echec du chargement des donées');
    }
};

function ArtisanDuMois() {
    const [artisans, setArtisans] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetchArtisan()
        .then(data => {
            setArtisans(data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <p style={{color: 'red'}}>Erreur : {error}</p>;
    }

    return (
        <div>
            <h3>entreprise du mois</h3>
                
                
                
                    {artisans.map((artisans,index) => (
                <div key={index}>
                    <MiniCard 
                        idArtisan = {artisans?.id_artisan}
                        nom = {artisans?.nom_entreprise}
                        note = {artisans?.note}
                        ville = {artisans?.ville}
                        specialite = {artisans?.Specialite?.nom_specialite}
                    />
                    
                </div>
            ))}
        </div>
    );
}


export default ArtisanDuMois;