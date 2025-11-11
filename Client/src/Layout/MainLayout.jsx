
import {Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import Header from '../Components/Header';
import Footer from '../Components/Footer';


function MainLayout() {

    return (
        <>
        <div className='layout'>
            {/* 1. Le Header Commun à Toutes les Pages */}
            <Header />

            {/* 2. La Zone de Contenu Spécifique à la Route */}
            <Container className="mt-4">
                {/* L'Outlet rendra le contenu */}
                <Outlet />
            </Container>

            {/* 3. Un Footer comun à toutes les pages */}
            <Footer />
        </div>
        </>
    );
}

export default MainLayout;