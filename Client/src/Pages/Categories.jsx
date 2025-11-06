import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import ky from 'ky'; 
import { Container, Row, Col } from 'react-bootstrap';
import MiniCard from '../Components/MiniCard';
import MetaInfo from '../Components/Helmet';


const fetchArtisansByCategorie = async (categorieNom) => {

    try {const http = process.env.REACT_APP_URL_API_WIN;
        const port = process.env.REACT_APP_PORT_API;
        const url = `${http}:${port}`;
        const response = await ky(`${url}/artisansparcategories/${categorieNom}`).json();

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