
import React from 'react';
import {Container, Row} from "react-bootstrap";
import MetaInfo from '../../Components/Helmet';
const Accessibilite = () => {
    return (
        <main>   
            <MetaInfo
                title="Trouve ton artisan"
                content="Page d'accéssibilité du site Trouve ton artisan"
                robots="noindex, nofollow"
                
            />
            <Container className="text-center">
                <Row>
                    <h1>Page d'Accessibilité</h1>
                </Row>
                <Row className="justify-content-center mt-4">
                    <img src="/images/enConstruction.png" className='w-25' alt="En Construction" />
                </Row>
            </Container>
        </main>
    );
}
export default Accessibilite;