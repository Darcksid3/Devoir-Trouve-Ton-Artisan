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

                <Row className='d-flex flex-column justify-content-center align-items-center text-center'>
                    <h3 className='artisan-titre'>{artisansData?.nom_entreprise}</h3>
                    <hr style={{ width: '50%', border: '2px solid #00497c'}} className='opacity-75' />
                </Row>

                <Row className='m-5'>
                    <Col sm={12} md={6} className='mb-4 d-flex justify-content-center align-items-center '>
                        <img className='w-50' src="/images/no-image.jpg" alt="Photo artisan" />
                    </Col>
                    
                    <Col sm={12} md={6} className='mb-4 d-flex flex-column justify-content-center align-items-center artisan-info'>
                        <RatingStars note={artisansData?.note} />
                        <p>{artisansData?.Specialite?.nom_specialite}</p>
                        <p>{artisansData?.ville}</p>
                        <p>
                            {artisansData && artisansData.site_web ? (
                                <Link to={artisansData.site_web}>{artisansData.site_web}</Link>
                            ) : (
                                "Cet artisan ne possède pas de site web"
                            )
                        }</p>
                    </Col>
                </Row>

                <Row className='artisan-description text-center mb-4'>
                    <p>{artisansData?.a_propos}</p>
                </Row>

                <Row className='mb-4 pt-4'>
                    <Formulaire />
                </Row>
            </Container>
        </main>
    )
};

export default Artisan;