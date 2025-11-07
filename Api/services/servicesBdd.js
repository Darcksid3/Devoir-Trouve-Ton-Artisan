const sequelize = require('../dbConnect/dbConnect');

const C = require('../script/debug');
/*
    * Models
*/
const models = require('../dbConnect/modelRelations');
const { where } = require('sequelize');


exports.artisansParCategorie = async (req,res,next) => {
    const cat = req.params.categorie;
    try {
        const findCategorie = await models.Categories.findAll({
            attributes :['id_categorie','nom_categorie'],
            where: {
                nom_categorie: `${cat}`
            }
        });
        if (findCategorie.length === 0) {
            return res.status(404).json({
                page : 404,
                message: 'NOT FOUND', 
                categorie: null, 
                error: `La catégorie '${cat}' n'existe pas.`
            });
        }
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
                        nom_categorie: `${cat}`
                    }
                }]}]
            })
        console.log(artisans);
        return res.json({ 
            page: cat, 
            artisans: artisans 
        });
    } catch (error) {
        return res.status(500).json({ 
            page: 404,
            message: 'ERROR', 
            categorie: null, 
            error: 'Erreur interne du serveur lors de la recherche des artisans.',
            detail: error.message
        });
    }
};

exports.artisansDuMois = async (req,res) => {
    try{
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
        return res.status(200).json({artisans: artisans});
    } catch (error) {
        return res.status(500).json({ 
            message: 'ERROR', 
            error: 'Erreur interne du serveur lors de la recherche des artisans du mois.',
            detail: error.message
        });
    };
};

exports.chercheUnArtisan = async (req,res) => {
    const artisanID = req.params.id;
    try {
        const artisans = await models.Artisans.findByPk(artisanID, {
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

        if (artisans === null) {
            return res.status(404).json({
                message: 'NOT FOUND',
                artisan: null,
                error: `L'artisan avec l'ID : ${artisanID} n'existe pas.`
            });
        } else {
        return res.status(200).json({ artisans });
        }
    } catch (error) {
        return res.status(500).json({ 
            message: 'ERROR', 
            error: 'Erreur interne du serveur lors de la recherche de l\'artisan.',
            detail: error.message
        });
    }
};

exports.toutesLesCategories = async (req,res) => {

    try {
        const categories = await models.Categories.findAll();
        if (categories === null) {
            return res.status(404).json({
                message: 'NOT FOUND',
                artisan: null,
                error: `pas de catégories`
            });
        } else {
            return res.status(200).json({categories: categories})
        }

    } catch (error) {
        return res.status(500).json({ 
            message: 'ERROR', 
            error: 'Erreur interne du serveur lors de la recherche des catégories.',
            detail: error.message
        });
    }
        
}

exports.artisanParNom = async (req,res) => {
    const nom = req.params.nom;
    try {
        const nomArtisan = await models.Artisans.findAll({
            attributes: ['nom_entreprise']
        });
        for (let i=0; i< nomArtisan.length; i++) {
            if (nom === nomArtisan[i].nom_entreprise) {
                const artisans = await models.Artisans.findOne({
                    where: {
                        nom_entreprise: `${nom}`
                    },
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
                return res.status(200).json({
                    nom_cherché: nom, 
                    nom_trouvé: nomArtisan[i].nom_entreprise, 
                    artisans: artisans
                })
            } 
        }
        return res.json({page:404, message: `le nom ${nom} n'as pas été trouvé`})
    } catch (error) {
        return res.status(500).json({erreur: `erreur interne ${error}`})
    }
    
};

exports.artisansSimpleIndex = async (req,res) => {
    try {
        const entreprises = await models.Artisans.findAll({
            attributes: ['id_artisan', 'nom_entreprise']
        });
        return res.status(200).json({entreprise: entreprises});
    } catch (error) {
        return res.status(500).json({ 
            message: 'ERROR',
            error: 'Erreur interne du serveur lors de la récupération de l\'index des artisans.',
            detail: error.message
        });
    }
};

exports.connexion = async (req,res) => {
    //* Récupération à la connection 
    //* des catégories pour le menu
    //* des nom d'artisans et pour la recherche par nom(cela évite mutiple apel à la bdd a chaque lettre tapé)
    //* des artisan du mois pour la page d'accueil
    const getClientIp = (req) => {
    // 1. Vérifier l'en-tête X-Forwarded-For (utilisé par les proxys comme AlwaysData)
    // L'en-tête peut contenir une liste d'IPs (ex: "client_ip, proxy1_ip, proxy2_ip")
        const forwarded = req.headers['x-forwarded-for'];

        if (forwarded) {
            // Retourner la première IP (celle du client)
            return forwarded.split(',')[0].trim();
        } 

        // 2. Revenir à l'IP de la connexion directe (mode local)
        return req.connection.remoteAddress || req.socket.remoteAddress;
    }
    const ip = getClientIp(req);
    console.log('Nouvelle connexion à l\'API'+ ip);
    try{
        //* Catégories
        const categories = await models.Categories.findAll({
            attributes: ['nom_categorie']
        });
        //* Nom des entreprises
        const entreprises = await models.Artisans.findAll({
            attributes: ['id_artisan', 'nom_entreprise']
        });
        //* Artisans du mois
        const artisansDuMois = await models.Artisans.findAll({
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
        //* Info spéciale et retour
            console.log(req.ip);
            const lIp = ip.slice(7);
            const votreIp = `Votre IP est : ${lIp}`
            res.json({
                connection_ip: votreIp,
                API: "Trouve Ton Artisan",
                categories: categories,
                artisansDuMois: artisansDuMois,
                entreprises: entreprises
            })
    } catch (error) {
        return res.status(500).json({erreur: `erreur interne lors de la récupération des des objet de base => ${error}`})
    }
}