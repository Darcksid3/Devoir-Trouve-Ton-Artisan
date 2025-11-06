import React from 'react';
import {Container, Row} from "react-bootstrap";

const NotFoundPage = () => {

    return (

        <div>
            
            <Container>
                <Row className="text-center mt-5">
                    
                        <h2 className='text-danger'>Erreur 404</h2>
                        <h3>La page que vous recherchez n'existe pas.</h3>
                    
                </Row>
            </Container>
        </div>
    )
};

export default NotFoundPage;