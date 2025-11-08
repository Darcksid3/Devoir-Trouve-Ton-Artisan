const express = require('express');
const models = require('../dbConnect/modelRelations');


exports.findArtisansParCategorie = async (categoryName) => {
    
    // 1. Chercher la catégorie et vérifier son existence
    const findCategorie = await models.Categories.findAll({
        attributes: ['id_categorie','nom_categorie'],
        where: {
            nom_categorie: categoryName
        }
    });

    if (findCategorie.length === 0) {
        // Lève une erreur spécifique que le Contrôleur pourra intercepter pour le 404
        throw new Error(`CategoryNotFound: La catégorie '${categoryName}' n'existe pas.`);
    }

    // 2. Chercher les artisans
    const artisans = await models.Artisans.findAll({
        attributes: ['nom_entreprise','note', 'ville', 'id_artisan'],
        include:[{
            model: models.Specialites,
            as: 'Specialite',
            attributes: ['nom_specialite'],
            required: true,
            
            include: [{
                model: models.Categories,
                as: 'Categorie',
                attributes: [], 
                required: true, 
                where: {
                    nom_categorie: categoryName
                }
            }]
        }]
    });

    // Retourne l'objet de données, le Contrôleur se chargera de la réponse HTTP
    return { artisans, category: findCategorie[0] };
};

exports.findArtisansDuMois = async () => {
    const artisans = await models.Artisans.findAll({
        where: {
            top_artisan: 1 
        },
        attributes: ['id_artisan', 'nom_entreprise','note', 'ville'],
            include: [{
            model: models.Specialites,
            as: 'Specialite',
            attributes: ['nom_specialite'],
            required: true,
        }]
    });
    return artisans;
};

exports.findUnArtisan = async (id) => {
    const artisan = await models.Artisans.findByPk(id, {
        attributes: ['id_artisan', 'nom_entreprise', 'note', 'ville', 'a_propos', 'email', 'site_web', 'top_artisan'],    
        include: [{
            model: models.Specialites,
            as: 'Specialite',
            attributes: ['nom_specialite'],
            required: true,
            include: [{
                model: models.Categories,
                as: 'Categorie',
                attributes: ['nom_categorie'],
                required: true,
            }]
        }]
    });
    return artisan;
}

exports.findAllCategories = async () => {
    const categories = await models.Categories.findAll({
        attributes: ['id_categorie', 'nom_categorie']
    });
    return categories;
};

exports.findArtisanParNom = async (nom) => {
    const artisans = await models.Artisans.findAll({
        where: {    
            nom_entreprise: nom
        },
        attributes: ['id_artisan', 'nom_entreprise', 'note', 'ville', 'description', 'top_artisan'],
        include: [{
            model: models.Specialites,
            as: 'Specialite',
            attributes: ['nom_specialite'],
            required: true,
            include: [{
                model: models.Categories,
                as: 'Categorie',
                attributes: ['nom_categorie'],
                required: true,
            }]
        }]
    });
    return artisans;
}

exports.findArtisansSimpleIndex = async () => {
    const entreprises = await models.Artisans.findAll({
        attributes: ['id_artisan', 'nom_entreprise'],
    });
    return entreprises;
};
