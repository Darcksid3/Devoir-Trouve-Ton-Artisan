import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout'; // Le composant créé ci-dessus
import Home from './Pages/Home'; // Vos autres composants de page
import Categories from './Pages/Categories';
import Artisan from './Pages/Artisan';
import NotFoundPage from './Pages/NotFoundPage'; // Composant 404

function App() {
    return (
        
            <Routes>
                {/* Route Parent : utilise MainLayout pour toutes les sous-routes.
                    Le contenu des pages (HomePage, ArtisansPage...) s'affichera
                    à l'intérieur de l' <Outlet /> de MainLayout.
                */}
                <Route path="/" element={<MainLayout />}>
                    
                    {/* Routes Enfants */}
                    <Route index element={<Home />} /> {/* index = Route à la racine (/) */}
                    <Route path="Categories" element={<Categories />} />
                    <Route path="Artisan" element={<Artisan />} />

                    {/* Route 404 (doit être la dernière) */}
                    { <Route path="*" element={<NotFoundPage />} /> }
                </Route>
            </Routes>
        
    );
};

export default App;