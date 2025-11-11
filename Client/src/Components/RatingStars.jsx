import React from 'react';

// Le style de base des étoiles pour le dégradé de couleur
const STAR_COLOR = "#ffc107"; 
const EMPTY_COLOR = "rgba(56, 64, 80, 0.5)"; 

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
                    style={{ 
                        color: STAR_COLOR, 
                        fontSize: '1em',
                        marginRight: '0.5em',
                    }}
                ></i>
            );
        } else if (i === fullStars + 1 && partialStarPercentage > 0) {
            // Étoile partielle (la dernière étoile)
            stars.push(
                <div id="testdebug"
                    key={i} 
                    style={{ 
                        // display: 'inline-block',
                        position: 'relative',
                        width: '1em', // Taille de l'icône
                        height: '1em',
                        fontSize: '1em',
                        verticalAlign:'top',
                    }}
                >
                    {/* Étoile vide en arrière-plan */}
                    <i 
                        className="bi bi-star-fill" 
                        style={{ color: EMPTY_COLOR, position: 'absolute', fontSize: '1em', marginRight: '0.5em',top: 0, left: 0 }}
                    ></i>
                    {/* Étoile pleine en avant-plan (remplissage partiel) */}
                    <i 
                        className="bi bi-star-fill" 
                        style={{ 
                            color: STAR_COLOR, 
                            position: 'absolute',
                            fontSize: '1em',
                            marginRight: '0.5em',
                            top:0,
                            left:0,
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
                    style={{ color: EMPTY_COLOR, marginLeft: '0.5em'}}
                ></i>
            );
        }
    }

    return (
        <div title={`Note: ${note}/5`} 
            style={{ 
                maxWidth: '60%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'start',
                marginBottom: '1em',
                }}>
            {stars}
        </div>
    );
};

export default RatingStars;