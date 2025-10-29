
import {Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';


function MainLayout() {

    return (
        <>
            {/* Le Header */}
            

            {/* La Zone de Contenu Spécifique à la Route */}
            <Container className="mt-4">
                {/* L'Outlet Permet de rendre le contenu du composant de route correspondant */}
                <Outlet />
            </Container>

            {/* 3.Le Footer */}
            
        
        </>
    );
}

export default MainLayout;