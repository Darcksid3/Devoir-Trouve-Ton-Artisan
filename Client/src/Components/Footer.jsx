import { Container, Row, Col }  from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
const AddressGoogle = () => {
        window.open('https://www.google.com/maps/place/101+Cours+Charlemagne,+69002+Lyon/@45.7484592,4.8276483,17z/data=!3m1!4b1!4m6!3m5!1s0x47f4eb8d8f5f4d7b:0xeadf1f3f3f3f3f3f!8m2!3d45.7484592!4d4.829837!16s%2Fg%2F11c52_5y9y', '_blank');
    }

const Footer = () => {
    
    
    return (
        <footer className="mt-0 py-2 bg-light container-fluid">
            <Container className='border border-2 border-secondary shadow-top'>
                <Row>
                    <Col md={6} >
                    <Nav className='d-flex flex-column mx-auto align-items-center'>
                        <Nav.Link as={Link} to="/Mentions-legales">Mentions Légales</Nav.Link>
                        <Nav.Link as={Link} to="/Politique-confidentialite">Politique de Confidentialité</Nav.Link>
                        <Nav.Link as={Link} to="/Accessibilité">Accessibilité</Nav.Link>
                        <Nav.Link as={Link} to="/Politique-cookies">Politique de Cookies</Nav.Link> 
                        <Nav.Link as={Link} to="/test">test</Nav.Link>
                    </Nav>
                    </Col>
                    <Col md={6} className='mx-auto text-center'>
                        <address onClick={AddressGoogle} style={{cursor: 'pointer'}}>
                            <p>101 cours Charlemagne</p>
                            <p>CS 20033</p>
                            <p>69269 LYON CEDEX 02</p>
                            <p>France</p>
                            <p><a tel="">+33 (0)4 26 73 40 00</a></p>
                        </address>
                    </Col>
                </Row>
                <Row className='text-center'><span className="text-muted">Tout drois réservé © Darckdid3 2025 </span></Row>
                
            </Container>
        </footer>
    )
}

export default Footer;