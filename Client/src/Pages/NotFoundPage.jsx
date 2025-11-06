import React from 'react';
import {Container, Row} from "react-bootstrap";
import MetaInfo from '../Components/Helmet';
const NotFoundPage = () => {

    return (

        <main>
            
            <MetaInfo
                title="Trouve ton artisan"
                content="Page d'erreur 404 - La page demandée est introuvable"
                robots="index, follow"
                
            />
            <Container>
                <Row className="text-center mt-5">
                    
                        <h2 className='text-danger'>Erreur 404</h2>
                        <h3>La page que vous recherchez n'existe pas.</h3>
                    
                </Row>
            </Container>
        </main>
    )
};

export default NotFoundPage;