import React, { useState, useContext } from 'react';
import { Form, Button, Row, Col} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons'; 
import { useNavigate } from 'react-router-dom';
import { ArtisanContext } from '../Contex/ArtisanContex';



const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const artisanIndex = useContext(ArtisanContext); 
    const navigate = useNavigate();

    console.log(artisanIndex); 

    const searchIndex = (term) => {
        if (term.length < 1) { // Déclencheur de la recherche à partir de x caractères 
            setSuggestions([]);
            return;
        }
        const normalizedTerm = term.toLowerCase().trim();
        const foundSuggestions = [];
        for (const name of Object.keys(artisanIndex)) {
            if (name.includes(normalizedTerm)) { 
                foundSuggestions.push({
                    id: artisanIndex[name],
                    name: name
                });
                // Limiter le nombre a x suggestions
                if (foundSuggestions.length >= 5) {
                    break; 
                }
            }
        }
        setSuggestions(foundSuggestions);
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        searchIndex(value); // recherche en temps réel
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        const normalizedSearch = searchTerm.toLowerCase().trim();
        const artisanId = artisanIndex[normalizedSearch];

        if (artisanId) {
            navigate(`/Artisan/${artisanId}`);
        } else {
            navigate(`/`);
        }
        setSearchTerm(''); 
    };
    
    
    return (
        <div style={{ position: 'relative'}}> 
                <Form className="d-flex order-3 ms-auto ms-md-0" onSubmit={handleSubmit}> 
                    
                        <Form.Control
                            type="search"
                            placeholder="Nom de l'entreprise..."
                            aria-label="Rechercher"
                            className="search me-2" 
                            value={searchTerm}
                            onChange={handleChange}
                        />
                        <Button aria-label="Bouton de recherche" variant="outline-secondary" className="search">
                            <Search />
                        </Button>
                    </Form>

                    {suggestions.length > 0 && (
                    <div className="search-suggestions-dropdown">
                        <ul className="list-group">
                            {suggestions.map((item) => (
                                <li 
                                    key={item.id} 
                                    className="list-group-item list-group-item-action"
                                    onClick={() => {
                                        navigate(`/Artisan/${item.id}`);
                                        setSuggestions([]); 
                                        setSearchTerm(item.name); 
                                    }}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
            </div>
    );
};

export default SearchComponent;