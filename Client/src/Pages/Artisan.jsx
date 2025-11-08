import React from 'react';
import { Link, useParams } from 'react-router-dom'; 

import { Container, Row, Col } from 'react-bootstrap';
import Formulaire from '../Components/Formulaire';
import RatingStars from '../Components/RatingStars';
import MetaInfo from '../Components/Helmet';
import { useRecupDb } from '../Components/FetchDb';

const Artisan = () => {

    const { idArtisan } = useParams();
    const { data, isLoading, error } = useRecupDb(`/artisanparid/${idArtisan}`);
    const artisansData = data?.artisans || [];
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
                content="Fiche de l'artisan avec ces informations complètes"
                robots="index, follow"
                
            />
            <Container>
                <Row className='d-flex flex-column justify-content-center text-center border border-2 border-danger'>
                    
                    <h3>{artisansData?.nom_entreprise}</h3>
                </Row>
                <Row className='border border-2 border-danger m-5'>
                    <Col className='sm-12 md-6 d-flex flex-row align-items-center'>
                        <img className='w-50' src="/images/no-image.jpg" alt="Photo artisan" />
                        
                    </Col>
                    
                    <Col className='sm-12 md-6 d-flex flex-column justify-content-center'>
                        <RatingStars note={artisansData?.note} />
                        <p>{artisansData?.Specialite?.nom_specialite}</p>
                        <p>{artisansData?.ville}</p>
                        <p><Link to={artisansData?.site_web}>{artisansData?.site_web}</Link></p>
                    </Col>
                </Row>

                <Row className='text-center border border-2 border-danger '>
                    <p>{artisansData?.a_propos}</p>
                </Row>

                <Row className='border border-2 border-danger '>
                    <Formulaire />
                </Row>
            </Container>
        </main>
    )
};

export default Artisan;