import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Offcanvas, Nav, Button } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons' 
import SearchComponent from './SearchComponent';
import { useRecupDb } from '../Components/FetchDb';

const technicalLinks = [
    { path: '/Mentions-legales', label: 'Mentions Légales' },
    { path: '/politique-cookies', label: 'Politique de Cookies' },
    { path: '/Politique-confidentialite', label:'Politique de Confidentialité'},
    { path: '/Accessibilite', label: 'Accessibilité'}
];

const MaNavbar = () => {

    // État pour gérer l'ouverture/fermeture de l'Offcanvas
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);

    // Liens de navigation
        const { data, isLoading, error } = useRecupDb('/touteslescategories');
        const categories = data?.categories || [];

    
        if (isLoading) {
            return <div>Chargement...</div>;
        }
    
        if (error) {
            // Le composant utilisateur gère le rendu JSX pour l'erreur
            return <p style={{color: 'red'}}>Erreur : {error}</p>;
        }


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
            {/* 2. BARRE DE NAVIGATION PRINCIPALE                         */}
            {/* ========================================================= */}
            <div className="d-shadow mb-5 border-bottom border-secondary border-3 ">
                <Container fluid className="py-2 d-flex align-items-end"> 
                    
                    {/* BURGER (Visible en Mobile - Ordre 1) */}
                    <Button 
                        variant="outline-secondary" 
                        onClick={handleShow} 
                        className="d-md-none order-1 me-2" // Affiché uniquement en mobile
                        aria-label="Bouton du menu"
                    >
                        <List size={24} />
                    </Button>
                    
                    {/* LOGO/BRAND */}
                    <div 
                        className="basis text-center order-2 order-md-1 d-flex"
                        style={{ flexGrow: window.innerWidth < 768 ? 1 : 0 }} 
                    >
                        <a href="/" className="navbar-brand mx-auto mx-md-0 m-0 p-0">
                            <img className="p-0 m-0" src="/images/Logo-resize.png" width="80%" alt="Logo"/>
                        </a>
                    </div>
                    
                    {/* LIENS NON TECHNIQUES (Visibles UNIQUEMENT en MD+) */}
                    <Nav className="d-none d-md-flex mx-auto order-md-2 text-nowrap" >
                        {categories && categories.map((categorie, index) => (
                            
                            <Nav.Link as={Link} key={index} to={`/Categories/${categorie?.nom_categorie}`} className='navbar-link mx0 px-5 px-lg-3 px-md-2 px-sm-1'>
                                {categorie?.nom_categorie}
                            </Nav.Link>
                            
                        ))} 
                    </Nav>
                    
                    {/* BARRE DE RECHERCHE (Ordre 3) */}
                    <div className="order-2 me-3">
                    <SearchComponent />
                    </div>

                </Container>
            </div>
        </>
    );
};

export default MaNavbar;