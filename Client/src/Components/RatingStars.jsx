import React from 'react';

// Le style de base des étoiles pour le dégradé de couleur
const STAR_COLOR = "#ffc107"; 
const EMPTY_COLOR = "#e4e5e9"; 

const RatingStars = ({ note }) => {
    // Le nombre total d'étoiles
    const MAX_STARS = 5; 
    
    // Le nombre d'étoiles pleines (partie entière de la note)
    const fullStars = Math.floor(note); 
    
    // Le pourcentage de remplissage de la dernière étoile (partie décimale)
    // Ex: 3.8 -> 0.8 * 100 = 80%
    const partialStarPercentage = Math.round((note - fullStars) * 100); 

    // Création d'un tableau pour itérer et générer les 5 étoiles
    const stars = [];

    for (let i = 1; i <= MAX_STARS; i++) {
        if (i <= fullStars) {
            // Étoiles pleines
            stars.push(
                <i 
                    key={i} 
                    className="bi bi-star-fill" 
                    style={{ color: STAR_COLOR }}
                ></i>
            );
        } else if (i === fullStars + 1 && partialStarPercentage > 0) {
            // Étoile partielle (la dernière étoile)
            stars.push(
                <div 
                    key={i} 
                    style={{ 
                        display: 'inline-block',
                        position: 'relative',
                        width: '1em', // Taille de l'icône
                        height: '1em',
                    }}
                >
                    {/* Étoile vide en arrière-plan */}
                    <i 
                        className="bi bi-star-fill" 
                        style={{ color: EMPTY_COLOR, position: 'absolute' }}
                    ></i>
                    {/* Étoile pleine en avant-plan (remplissage partiel) */}
                    <i 
                        className="bi bi-star-fill" 
                        style={{ 
                            color: STAR_COLOR, 
                            position: 'absolute',
                            // remplissage : clip-path
                            clipPath: `inset(0 ${100 - partialStarPercentage}% 0 0)`
                        }}
                    ></i>
                </div>
            );
        } else {
            // Étoiles vides restantes
            stars.push(
                <i 
                    key={i} 
                    className="bi bi-star" 
                    style={{ color: EMPTY_COLOR }}
                ></i>
            );
        }
    }

    return (
        <div title={`Note: ${note}/5`} style={{ display: 'inline-block' }}>
            {stars}
        </div>
    );
};

export default RatingStars;