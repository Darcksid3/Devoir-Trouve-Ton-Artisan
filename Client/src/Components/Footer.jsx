import { Container, Row, Col }  from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import LienTechnique from './LienTechnique';

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
        <footer className='mb-0'>
            <Container className='lg-text-left md-text-center mb-0 py-0'>
                <Row className='mb-0 py-0'>
                    <Col md={6} sm={12} className='d-flex flex-column justify-content-center mx-auto text-start text-sm-center'>
                    <Nav className='d-flex flex-column mx-auto align-items-center'>
                        <LienTechnique class='footer' />
                    </Nav>
                    </Col>
                    <hr className='d-lg-none'/>
                    <Col md={6} sm={12} className='mx-auto mb-0 pb-0 text-center'>
                        <address>
                            <div onClick={AddressGoogle} style={{cursor: 'pointer'}} className='footer-address'>
                            <p>101 cours Charlemagne</p>
                            <p>CS 20033</p>
                            <p>69269 LYON CEDEX 02</p>
                            <p>France</p>
                            </div>
                            <p><a href="tel:+33426734000" className='navlink navlink--white'>+33 (0)4 26 73 40 00</a></p>
                        </address>
                    </Col>
                </Row>             
            </Container>
        </footer>
    )
}

export default Footer;