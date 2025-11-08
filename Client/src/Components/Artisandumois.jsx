import React from "react";
import { useRecupDb } from "../Components/FetchDb";
import MiniCard from "./MiniCard";

function ArtisanDuMois() {
    
    const { data, isLoading, error } = useRecupDb('/artisansdumois');
    const artisans = data?.artisans || [];
    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        // Le composant utilisateur gère le rendu JSX pour l'erreur
        return <p style={{color: 'red'}}>Erreur : {error}</p>;
    }

    return (
        <div>
            <h3>Artisans du mois</h3>
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