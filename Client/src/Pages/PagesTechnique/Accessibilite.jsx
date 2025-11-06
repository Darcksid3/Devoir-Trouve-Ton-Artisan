
import React from 'react';
import {Container, Row} from "react-bootstrap";

const Accessibilite = () => {
    return (
        <div >   
            <Container className="text-center">
                <Row>
                    <h1>Page d'Accessibilité</h1>
                </Row>
                <Row className="justify-content-center mt-4">
                    <img src="/images/enConstruction.png" className='w-25' alt="En Construction" />
                </Row>
            </Container>
        </div>
    );
}
export default Accessibilite;