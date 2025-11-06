import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Formulaire() {
    const [validated, setValidated] = useState(false);
    const [comment, setComment] = useState();
    const handleChange = (event) => {
    setComment(event.target.value);
    };

    const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }

    setValidated(true);
    };

    return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
            
                <Form.Group as={Col} className="mb-4 mt-3" md="12" controlId="validationCustom01">
                <Form.Control
                    required
                    type="text"
                    placeholder="Votre nom"
                    defaultValue=""
                />
                <Form.Control.Feedback>Bien remplis!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} className="mb-4" md="12" controlId="validationCustom02">
                <Form.Control
                    required
                    type="Email"
                    placeholder="Votre adresse email"
                    defaultValue=""
                />
                <Form.Control.Feedback>Bien remplis!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} className="mb-4" md="12" controlId="validationCustom03">
                <Form.Control
                    required
                    type="tel"
                    placeholder="Votre numéro de téléphone"
                    defaultValue=""
                />
                <Form.Control.Feedback>Bien remplis!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} className="mb-4" md="12" controlId="validationCustom04">
                <Form.Control
                    required
                    type="text"
                    placeholder="Sujet"
                    defaultValue=""
                />
                <Form.Control.Feedback>Bien remplis!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="validationCustom05">
                <Form.Control 
                    requierd 
                    as="textarea" 
                    rows={12} 
                    placeholder="Votre message"
                    value={comment} 
                    onChange={handleChange} 
                    
                />
                <Form.Control.Feedback>Bien remplis!</Form.Control.Feedback>
            </Form.Group>
            <div className='text-center' fluid>
            <Button type="submit">Envoyer</Button>
            </div>
        
        </Row>
        
    </Form>
    );
}

export default Formulaire;