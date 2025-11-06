import React from 'react';
import {Container, Row} from "react-bootstrap";


const MentionsLegales = () => {
    return (
        <div className="text-center">   
            

            <Container className="text-center">
                <Row>
                    <h1>Mentions Légales</h1>
                </Row>
                <Row className="justify-content-center mt-4">
                    <img src="/images/enConstruction.png" className='w-25' alt="En Construction" />
                </Row>
            </Container>
        </div>
    );
}
export default MentionsLegales;