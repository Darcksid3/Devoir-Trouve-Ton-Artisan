import React, { useState, useEffect } from 'react';
import ky from 'ky';
import { Link } from 'react-router-dom';
import { Container, Offcanvas, Nav, Button } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons' 
import SearchComponent from './SearchComponent';


const fetchCategories = async () => {
    try {
        const url = process.env.REACT_APP_URL_API;
        const responce = await ky(`${url}/touteslescategories`).json();
        
        return responce.categories
    } catch (error) {
        console.log(`Erreur lors de la récupération des artisans ${error}`);
        throw new Error ('Echec du chargement des donées');
    }
};

const technicalLinks = [
    { path: '/Mentions-legales', label: 'Mentions Légales' },
    { path: '/politique-cookies', label: 'Politique de Cookies' },
    { path: '/Politique-confidentialite', label:'Politique de Confidentialité'},
    { path: '/Accessibilite', label: 'Accessibilité'}
];

const MaNavbar = () => {
    // Liens de navigation
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
    // État pour gérer l'ouverture/fermeture de l'Offcanvas
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);

    return (
        <>
            {/* ========================================================= */}
            {/* 1. OFFCANVAS PUR (Menu Mobile - Visible UNIQUEMENT en XS/SM) */}
            {/* ========================================================= */}
            <Offcanvas show={showOffcanvas} onHide={handleClose} placement="start" className="d-md-none">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu Principal</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">

                        {/* Liens Principaux */}
                        {categories && categories.map((categorie, index) => (
                            
                                <Nav.Link as={Link} key={index} to={`/Categories/${categorie?.nom_categorie}`} onClick={handleClose}>
                                    {categorie?.nom_categorie}
                                </Nav.Link>
                        ))}
                        <hr />
                        {/* Liens Techniques */}
                        {technicalLinks.map(link => (
                            
                                <Nav.Link as={Link} to={link.path} key={link.path} onClick={handleClose}>{link.label}</Nav.Link>
                            
                        ))}
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            {/* ========================================================= */}
            {/* 2. BARRE DE NAVIGATION PRINCIPALE (Basée sur Flexbox)     */}
            {/* ========================================================= */}
            <div className="d-shadow mb-5 border-bottom border-secondary border-3 ">
                <Container fluid className="py-2 d-flex align-items-end"> 
                    
                    {/* A. BURGER (Visible en Mobile - Ordre 1) */}
                    <Button 
                        variant="outline-secondary" 
                        onClick={handleShow} 
                        className="d-md-none order-1 me-2" // Affiché uniquement en mobile
                    >
                        <List size={24} />
                    </Button>
                    
                    {/* B. LOGO/BRAND */}
                    <div 
                        className="basis text-center order-2 order-md-1 d-flex"
                        style={{ flexGrow: window.innerWidth < 768 ? 1 : 0 }} 
                    >
                        <a href="/" className="navbar-brand mx-auto mx-md-0 m-0 p-0">
                            <img className="p-0 m-0" src="/images/Logo-resize.png" width="80%" alt="Logo"/>
                        </a>
                    </div>
                    
                    {/* C. LIENS NON TECHNIQUES (Visibles UNIQUEMENT en MD+) */}
                    <Nav className="d-none d-md-flex mx-auto order-md-2 " >
                        {categories && categories.map((categorie, index) => (
                            
                                <Nav.Link as={Link} key={index} to={`/Categories/${categorie?.nom_categorie}`} className='mx0 px-5 px-lg-3 px-md-2 px-sm-1 text-nowrap'>
                                    {categorie?.nom_categorie}
                                </Nav.Link>
                            
                        ))} 
                    </Nav>
                    
                    {/* D. BARRE DE RECHERCHE (Ordre 3) */}
                    <div className="order-2 me-3">
                    <SearchComponent />
                    </div>

                </Container>
            </div>
        </>
    );
};

export default MaNavbar;