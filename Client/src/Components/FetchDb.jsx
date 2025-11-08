import ky from "ky";
import { useState, useEffect } from "react";

const url = process.env.REACT_APP_URL_API;

const fetchDb = async (route) => {
    try {
        const responce = await ky(`${url}${route}`).json();
        return responce
    } catch (error) {
        console.error(`Erreur lors de la récupération de la route ${route}:`)
        throw error;
    }
};

const useRecupDb = (route) => { // Plus besoin du paramètre 'type'
    const [data, setData] = useState(null); // Un seul état pour les données
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        
        fetchDb(route)
            .then(apiData => {
                setData(apiData); // Stocke tout l'objet API ici
            })
            .catch(err => {
                setError(err.message || "Une erreur inconnue est survenue.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [route]);

    return { data, isLoading, error };
};

export { useRecupDb }; 