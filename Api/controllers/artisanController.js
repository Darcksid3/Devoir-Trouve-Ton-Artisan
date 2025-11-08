// src/controllers/artisanController.js
const artisanService = require('../services/artisanService');


// Contrôleur pour la route /artisansParCategorie
exports.getArtisansParCategorie = async (req, res, next) => {
    const cat = req.params.categorie;
    try {
        // Appel de la couche Service
        const { artisans, category } = await artisanService.findArtisansParCategorie(cat);

        // Réponse HTTP OK (200)
        return res.status(200).json({
            page: category,
            artisans: artisans
        });

    } catch (error) {
        // Gestion de l'erreur 404 signalée par le Service
        if (error.message.startsWith('CategoryNotFound')) {
            return res.status(404).json({
                page: 404,
                message: 'NOT FOUND',
                categorie: null,
                error: error.message.split(': ')[1], // Affiche le message clair
            });
        }
        // Gestion de l'erreur serveur 500
        return res.status(500).json({ 
            erreur: `Erreur interne Veuillez réésayer plus tard` 
        });
    }
};

exports.getArtisansDuMois = async (req, res, next) => {
    try {
        const artisans = await artisanService.findArtisansDuMois(); // Appel de la couche Service

        return res.status(200).json({   
            artisans: artisans 
        });
    } catch (error) {
        return res.status(500).json({ 
            erreur: `Erreur interne Veuillez réésayer plus tard` 
        });
    }
};

exports.getUnArtisan = async (req, res, next) => {
    // Implémentation similaire en utilisant la couche Service
    const id = req.params.id;
    const artisans = await artisanService.findUnArtisan(id);
    if (artisans === null) {
        return res.status(404).json({
            page: 404,
            message: 'NOT FOUND',
            artisan: null,
            error: `L'artisan avec l'ID '${id}' n'existe pas.`
        });
    }
    return res.status(200).json({
        artisans
    });
};

exports.getAllCategories = async (req, res, next) => {
    const categories = await artisanService.findAllCategories();
    return res.status(200).json({
        categories: categories
    });
        
};      

exports.getArtisanParNom = async (req, res, next) => {
    const nom = req.params.nom;
    const artisans = await artisanService.findArtisanByName(nom);
    return res.status(200).json({
        artisans: artisans
    });
};

exports.getArtisansSimpleIndex = async (req, res, next) => {
    const entreprises = await artisanService.findArtisansSimpleIndex();
    return res.status(200).json({
        entreprise: entreprises
    });
};