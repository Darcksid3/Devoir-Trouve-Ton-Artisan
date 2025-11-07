import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Formulaire() {
    const [validated, setValidated] = useState(false);
    // 1. Initialiser l'état pour tous les champs
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        sujet: '',
        message: '',
    });

    // 2. Gestionnaire de changement unique
    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            // id sera utilisé pour déterminer quelle propriété mettre à jour
            // Assurez-vous que l'ID du contrôle de formulaire correspond à la clé de l'objet d'état
            [id.replace('validationCustom', '').toLowerCase()]: value, 
        }));
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault(); // On appelle preventDefault ici pour ne pas avoir à le répéter

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // 3. Récupérer et logger les données
            console.log('Données du formulaire :', formData);
            alert('Formulaire envoyé avec succès !');
            // Réinitialiser le formulaire
            setFormData({
                nom: '',
                email: '',
                sujet: '',
                message: '',
            });
            setValidated(false); // Réinitialiser l'état de validation pour les champs non contrôlés
            return;
        }
        setValidated(true);
    };

    return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
            <Col>
                <Form.Group as={Col} className="mb-4 mt-3" md="12" controlId="nom"> 
                    <Form.Label>Votre Nom :</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Votre nom"
                        value={formData.nom} // Liaison de la valeur
                        pattern="^[\p{L}\s']{2,50}$"
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback>Bien rempli!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Veuillez entrer votre nom.</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Votre nom doit contenir entre 2 et 50 lettres.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} className="mb-4" md="12" controlId="email">
                    <Form.Label>Votre Email :</Form.Label>
                    <Form.Control
                        required
                        type="Email"
                        placeholder="Votre adresse email"
                        value={formData.email} // Liaison de la valeur
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback>Bien rempli!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Veuillez entrer une adresse email valide.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} className="mb-4" md="12" controlId="sujet">
                    <Form.Label>Votre Sujet :</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Sujet"
                        value={formData.sujet} // Liaison de la valeur
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback>Bien rempli!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Veuillez entrer un sujet.</Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="message">
                    <Form.Label>Votre Message : </Form.Label>
                    <Form.Control 
                        required 
                        as="textarea" 
                        rows={12} 
                        placeholder="Votre message"
                        value={formData.message} // Liaison de la valeur
                        onChange={handleChange} 
                    />
                    <Form.Control.Feedback>Bien rempli!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Veuillez entrer votre message.</Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <div className='text-center'>
                <Button type="submit">Envoyer</Button>
            </div>
        
        </Row>
        
    </Form>
    );
}

export default Formulaire;
