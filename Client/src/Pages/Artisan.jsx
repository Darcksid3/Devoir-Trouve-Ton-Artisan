import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; 
import ky from 'ky'; 
import { Container, Row, Col } from 'react-bootstrap';
import Formulaire from '../Components/Formulaire';
import RatingStars from '../Components/RatingStars';



const fetchArtisans = async (idArtisan) => {

    
    try {const http = process.env.REACT_APP_URL_API_WIN;
const port = process.env.REACT_APP_PORT_API;
const url = `${http}:${port}`;
        const responce = await ky(`${url}/artisanparid/${idArtisan}`).json();
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
        <Container>
            <Row className='d-flex flex-column justify-content-center text-center border border-2 border-danger'>
                
                <h3>{artisans?.nom_entreprise}</h3>
            </Row>
            <Row className='border border-2 border-danger m-5'>
                <Col className='sm-12 md-6 d-flex flex-row align-items-center'>
                    <img className='w-50' src="/images/no-image.jpg" alt="Photo artisan" />
                    
                </Col>
                
                <Col className='sm-12 md-6 d-flex flex-column justify-content-center'>
                    <RatingStars note={artisans?.note} /> / {artisans?.note}
                    <p>{artisans?.Specialite?.nom_specialite}</p>
                    <p>{artisans?.ville}</p>
                    <p><Link to={artisans?.site_web}>{artisans?.site_web}</Link></p>
                </Col>
            </Row>

            <Row className='text-center border border-2 border-danger '>
                <p>{artisans?.a_propos}</p>
            </Row>

            <Row className='border border-2 border-danger '>
                <Formulaire />
            </Row>
        </Container>
    )
};

export default Artisan;