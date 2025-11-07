import React from "react";
import { useState, useEffect } from "react";
import ky from 'ky'

import MiniCard from "../Components/MiniCard";

const fetchArtisan = async () => {
    try{
        const http = process.env.REACT_APP_URL_API_ONLINE;
        const port = process.env.REACT_APP_PORT_API;
        const url = `${http}:${port}`;
        const responce = await ky(`${http}/apidb/artisansdumois`).json();
        return responce.artisans;

    } catch(error) {
        console.log(`Erreur ky lors de la récupération des artisans ${error}`);
        throw new Error ('Echec du chargement des donées');
    }
};



const PageTest = () => {
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
        <main>
            <h2>Pages test</h2>
            <section>
                <h3>Test de deployement du site</h3>
                <div>
                    <h4>Récupération de l'api en ligne</h4>
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

            </section>
        </main>
    )
};

export default PageTest;