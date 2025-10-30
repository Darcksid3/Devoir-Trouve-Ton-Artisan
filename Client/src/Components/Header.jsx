import React, {useState, useEffect } from 'react';

import ky from 'ky';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Form, Button } from 'react-bootstrap'; // Assurez-vous d'avoir installé react-bootstrap


const fetchCategories = async () => {
    try {
        const responce = await ky(`http://localhost:8100/touteslescategories`).json();
        
        return responce.categories
    } catch (error) {
        console.log(`Erreur lors de la récupération des artisans ${error}`);
        throw new Error ('Echec du chargement des donées');
    }
};


const Header = () => {
    
const [categories, setCategories] = useState([]);
        const [isLoading, setIsLoading] = useState(null);
        const [error, setError] = useState(null);
    
        const cat = ['Batiment', 'Alimentation', 'Fabrication', 'services']
    
        useEffect(() => {
            fetchCategories()
            .then(data => {
                setCategories(data)
                setIsLoading(false)
            });
        }, []);
    
        if (isLoading) {
            return <p style={{color: 'red'}}>Erreur : {error}</p>;
        }



    return (
        <div>
            {/* 1. La Navbar Bootstrap */}
            <Navbar bg="white" variant="white" expand="lg">
                <Container className='justify-content-between'>
                    <Navbar.Brand href="/">
                        <img src="/images/Logo.png" width="20%" alt="Logo"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {categories && categories.map((categorie, index) => (
                            <Nav.Link 
                                key={index} 
                                as={Link} 
                                to={`/Categorie/${categorie?.nom_categorie}`}
                            >
                                {categorie?.nom_categorie}
                            </Nav.Link>
                        ))}
                        
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            size='lg'
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            
            <hr />
            
        </div>
    )
};

export default Header;