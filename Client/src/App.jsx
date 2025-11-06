import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout'; 
import Home from './Pages/Home'; 
import Categories from './Pages/Categories';
import Artisan from './Pages/Artisan';
import Accessibilite from './Pages/PagesTechnique/Accessibilite';
import PolitiqueConfidentialite from './Pages/PagesTechnique/Politique-confidentialite';
import PolitiqueCookies from './Pages/PagesTechnique/politique-cookies';    
import MentionsLegales from './Pages/PagesTechnique/Mentions-legales';
import NotFoundPage from './Pages/NotFoundPage'; 

function App() {
    return (
        
            <Routes>
                
                <Route path="/" element={<MainLayout />}>
                    
                    {/* Routes Enfants */}
                    <Route index element={<Home />} /> {/* index = Route à la racine (/) */}
                    <Route path="Categories/:categorie" element={<Categories />} />
                    <Route path="Artisan/:idArtisan" element={<Artisan />} />

                    {/* Routes Technique*/}
                    <Route path="/Mentions-legales"element={<MentionsLegales />} />
                    <Route path="/Politique-confidentialite"element={<PolitiqueConfidentialite />} />
                    <Route path="/Accessibilité"element={<Accessibilite />} />
                    <Route path="/Politique-cookies"element={<PolitiqueCookies />} /> 

                    {/* Route 404 (doit être en dernier) */}
                    { <Route path="*" element={<NotFoundPage />} /> }
                </Route>
            </Routes>
        
    );
}

export default App;