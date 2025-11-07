import React, { useState, useContext } from 'react';
import { Form, Button, Row, Col} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons'; 
import { useNavigate } from 'react-router-dom';
import { ArtisanContext } from '../Contex/ArtisanContex'; // 🛑 IMPORTER LE CONTEXTE



const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const artisanIndex = useContext(ArtisanContext); // 🛑 CONSOMMER L'INDEX
    const navigate = useNavigate();

    console.log(artisanIndex); // 🛑 VÉRIFIER L'INDEX

    const searchIndex = (term) => {
        if (term.length < 1) { // Déclencher la recherche à partir de 3 caractères
            setSuggestions([]);
            return;
        }

        const normalizedTerm = term.toLowerCase().trim();
        const foundSuggestions = [];

        // 🛑 CLÉ : Itérer sur les clés de l'objet (les noms d'entreprises)
        for (const name of Object.keys(artisanIndex)) {
            
            // 🛑 UTILISER .includes() au lieu de .startsWith()
            if (name.includes(normalizedTerm)) { 
                
                // Ajouter à la liste des suggestions : { name: "nom", id: 123 }
                foundSuggestions.push({
                    id: artisanIndex[name],
                    name: name
                });

                // Optionnel: Limiter le nombre de suggestions
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
        searchIndex(value); // Déclencher la recherche en temps réel
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        
        const normalizedSearch = searchTerm.toLowerCase().trim();
        
        // 1. Recherche de correspondance exacte dans le cache
        const artisanId = artisanIndex[normalizedSearch];

        if (artisanId) {
            // Correspondance trouvée : Redirection directe
            navigate(`/Artisan/${artisanId}`);
        } else {
            // Aucune correspondance exacte : Lancer la recherche API complète
            // Vous pouvez rediriger vers une page de résultats avec le terme de recherche
            navigate(`/`);
        }
        // Vider le champ après la recherche
        setSearchTerm(''); 
    };
    //TODO 
    
    return (
        <div style={{ position: 'relative'}}> {/* 🛑 1. NOUVEAU CONTENEUR RELATIF */}
                <Form className="d-flex order-3 ms-auto ms-md-0" onSubmit={handleSubmit}> 
                    
                        <Form.Control
                            type="search"
                            placeholder="Nom de l'entreprise..."
                            aria-label="Rechercher"
                            className="rounded-0 border-top-0 border-start-0 border-end-0 border-secondary border-3 me-2" 
                            value={searchTerm}
                            onChange={handleChange}
                        />
                        <Button variant="outline-secondary" className="rounded-0 border-top-0 border-start-0 border-end-0 border-3">
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
                                        setSuggestions([]); // Cacher les suggestions après la sélection
                                        setSearchTerm(item.name); // Mettre le nom complet dans le champ
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