import React from 'react';
import { useParams } from 'react-router-dom'; 
import { Container, Row, Col } from 'react-bootstrap';
import MiniCard from '../Components/MiniCard';
import MetaInfo from '../Components/Helmet';
import { useRecupDb } from '../Components/FetchDb';

const Categories = () => {
    const { categorie } = useParams(); 
            const { data, isLoading, error } = useRecupDb(`/artisansparcategories/${categorie}`);
            const artisans = data?.artisans || [];
            if (isLoading) {
                return <div>Chargement...</div>;
            }
        
            if (error) {
                // Le composant utilisateur gère le rendu JSX pour l'erreur
                return <p style={{color: 'red'}}>Erreur : {error}</p>;
            }
    return (
        <main>
            <MetaInfo
                title="Trouve ton artisan"
                content="Liste des artisans par catégorie de metier"
                robots="index, follow"
                
            />
            <Container>
                <Row className='text-center'>
                <h2>Artisans de la catégorie : {categorie}</h2>
                </Row>
                <Row className="d-flex flex-row justify-content-around">
                    {artisans.length === 0 ? (
                        <p>Aucun artisan trouvé dans cette catégorie.</p>
                    ) : (
                        artisans.map((artisan, index) => (
                            <div key={index} className='div-minicard-size'>
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
                </Row>
            </Container>
        </main>
    );
};

export default Categories;