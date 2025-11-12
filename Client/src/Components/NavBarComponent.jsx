import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Offcanvas, Nav, Button } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons' 
import SearchComponent from './SearchComponent';
import { useRecupDb } from '../Components/FetchDb';
import LienTechnique from './LienTechnique';

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
            <Offcanvas show={showOffcanvas} onHide={handleClose} placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu Principal</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        {/* Liens Principaux */}
                        {categories && categories.map((categorie, index) => (
                            
                                <Nav.Link as={Link} key={index} to={`/Categories/${categorie?.nom_categorie}`} className="navlink navlink--offcanva" onClick={handleClose}>
                                    {categorie?.nom_categorie}
                                </Nav.Link>
                        ))}
                        <hr />
                        <LienTechnique classname="navbar" click={handleClose} />
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            {/* ========================================================= */}
            {/* 2. BARRE DE NAVIGATION PRINCIPALE                         */}
            {/* ========================================================= */}
            <div className="Navbar mb-5">
                <Container className="py-2 d-flex align-items-end"> 
                    
                    {/* BURGER (Visible en Mobile - Ordre 1) */}
                    <Button 
                        variant="outline-secondary" 
                        onClick={handleShow} 
                        className="d-lg-none order-1 me-2" // Affiché uniquement en mobile
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
                    
                    <Nav className="d-none d-md-none d-lg-inline d-flex flex-row mx-auto order-md-2 flex-lg-nowrap" 
                        >
                        {categories && categories.map((categorie, index) => (
                            
                                <Nav.Link as={Link} key={index}
                                    id="test"
                                    to={`/Categories/${categorie?.nom_categorie}`} 
                                    className='navlink navlink--grey mx0'
                                    >
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