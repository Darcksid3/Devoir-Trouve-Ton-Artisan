import { Container, Row, Col }  from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
const AddressGoogle = () => {
        window.open('https://www.google.com/maps/place/101+Cours+Charlemagne,+69002+Lyon/@45.7484592,4.8276483,17z/data=!3m1!4b1!4m6!3m5!1s0x47f4eb8d8f5f4d7b:0xeadf1f3f3f3f3f3f!8m2!3d45.7484592!4d4.829837!16s%2Fg%2F11c52_5y9y', '_blank');
    }

    const technicalLinks = [
    { path: '/Mentions-legales', label: 'Mentions Légales' },
    { path: '/politique-cookies', label: 'Politique de Cookies' },
    { path: '/Politique-confidentialite', label:'Politique de Confidentialité'},
    { path: '/Accessibilite', label: 'Accessibilité'}
];

const Footer = () => {


    return (
        <footer className="container-fluid">
            
                <Row>
                    <Col md={6} >
                    <Nav className='d-flex flex-column mx-auto align-items-center'>
                        {/* Liens Techniques */}
                        {technicalLinks.map(link => (
                            
                            <Nav.Link className="f-link" as={Link} to={link.path} key={link.path}>{link.label}</Nav.Link>
                            
                        ))}
                        
                        <Nav.Link className="f-link" as={Link} to="/test">test</Nav.Link>
                    </Nav>
                    </Col>
                    <Col md={6} className='mx-auto text-center'>
                        <address  >
                            <div onClick={AddressGoogle} style={{cursor: 'pointer'}}>
                                <p>101 cours Charlemagne</p>
                                <p>CS 20033</p>
                                <p>69269 LYON CEDEX 02</p>
                                <p>France</p>
                            </div>
                            <p style={{cursor: 'pointer'}}><a href="tel:+33 (0)4 26 73 40 00" className="f-link" >+33 (0)4 26 73 40 00</a></p>
                        </address>
                    </Col>
                </Row>
                <Row className='text-center'><span className="text-muted">Tout drois réservé © Darckdid3 2025</span></Row>
                
            
        </footer>
    )
}

export default Footer;