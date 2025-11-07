import React from 'react';
import {Container, Row} from "react-bootstrap";
import MetaInfo from '../../Components/Helmet';


const PolitiqueCookies = () => {
    return (
        <main className="text-center">
            <MetaInfo
                title="Trouve ton artisan"
                content="Page de politique des cookies du site Trouve ton artisan"
                robots="noindex, nofollow"
                
            />

            <Container className="text-center">
                <Row>
                    <h1>Politique de Cookies</h1>
                </Row>
                <Row className="justify-content-center mt-4">
                    <img src="/images/enConstruction.png" className='w-25' alt="En Construction" />
                </Row>
            </Container>
        </main>
    );
}   
export default PolitiqueCookies;