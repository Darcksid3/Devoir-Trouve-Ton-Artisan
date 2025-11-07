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
                <Row className="d-flex -flex-columne justify-content-center text-center mt-5">
                        <h2>La page que vous recherchez n'existe pas.</h2>
                        <img src="/images/err404.png" alt="Logo erreur 404" style={{width: '50%'}}/>
                </Row>
            </Container>
        </main>
    )
};

export default NotFoundPage;