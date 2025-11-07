import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ArtisanDataProvider } from './Components/ArtisanDataProvider'; 
const basenamePath = process.env.REACT_APP_ROUTER_BASE || '/'; 

createRoot(document.getElementById('root')).render(
    <StrictMode>
        
            <BrowserRouter basename={basenamePath}> 
                <ArtisanDataProvider>
                    <App />
                </ArtisanDataProvider>
            </BrowserRouter>
        
    </StrictMode>,
)