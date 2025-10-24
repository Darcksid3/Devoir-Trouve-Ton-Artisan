const sequelize = require('../dbConnect/dbConnect');

const C = require('../script/debug');
/*
    * Models
*/
const models = require('../dbConnect/modelRelations');
const { where } = require('sequelize');


exports.artisansParCategorie = async (req,res,next) => {
    const cat = req.params.categorie;
    C.log('green', `catégorie select => ${cat} `);

    try {
        C.log('magenta', 'Début try');

        //* Vérification que la catégorie existe
        // On utilise directement AWAIT et on stocke le résultat
        const findCategorie = await models.Categories.findAll({
            attributes :['id_categorie','nom_categorie'],
            where: {
                nom_categorie: `${cat}`
            }
        });

        //* Vérification si la catégorie est trouvée (logique métier)
        if (findCategorie.length === 0) {
            C.log('yellow', `Catégorie non trouvée: ${cat}`);
            // On stoppe l'exécution
            return res.status(404).json({
                page : 404,
                message: 'NOT FOUND', 
                categorie: null, 
                error: `La catégorie '${cat}' n'existe pas.`
            });
        }
        
        // --- CAS SUCCÈS : La catégorie existe, on continue ---
        
        C.log('green', `Catégorie trouvée : ${cat}`);
        
        //*  Recherche des artisans par catégorie
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
        

        //*Renvoy des résultats
        console.log(artisans);
        return res.json({ 
            page: cat, 
            artisans: artisans 
        });

    } catch (error) {
        // Gère les erreurs techniques imprévues
        C.log('red', `Catch error: ${error.message}`);
        // Utilisation de 500 pour les erreurs de serveur/base de données
        return res.status(500).json({ 
            page: 404,
            message: 'ERROR', 
            categorie: null, 
            error: 'Erreur interne du serveur lors de la recherche des artisans.',
            detail: error.message
        });
    }
}

exports.artisansDuMois = async (req,res) => {
    const artisans = await models.Artisans.findAll({
        where: {
            top_artisan: 1 // Remplacez par le nom exact dans votre DB ('Batiment', 'Bâtiment', etc.)
        },
        // Sélectionne tous les attributs de la table Artisans
        attributes: ['nom_entreprise','note', 'ville', 'id_specialite'],
            // intègre la spécialité
            include: [{
            model: models.Specialites,
            as: 'Specialite',
            attributes: ['nom_specialite'], // Attributs de la spécialité à inclure
            required: true, // Ceci garantit que seuls les artisans qui ont une spécialité seront inclus (INNER JOIN)
            
                // Condition de filtrage sur le nom de la catégorie
                
        }]

            })
    C.log('magenta', artisans)
    res.json({artisans: artisans})
}

exports.chercheUnArtisan = async (req,res) => {
    C.log('magenta', `Début requette artisan ID` );
    const artisanID = req.params.id
    C.log('yellow', ` l'id artisant est le : ${req.params.id}`)

    const artisans = await models.Artisans.findByPk(artisanID, {
        // Sélectionne les attributs de la table Artisans
        attributes: ['nom_entreprise', 'note', 'ville', 'id_artisan'],

        // Jointure imbriquée : Artisans -> Specialites -> Categories
        include: [{
            model: models.Specialites,
            as: 'Specialite',
            attributes: ['nom_specialite'], // Attributs de la spécialité à inclure
            required: true, // INNER JOIN

            include: [{
                model: models.Categories,
                as: 'Categorie',
                attributes: ['nom_categorie'], // Attributs de la catégorie à inclure
                required: true, // INNER JOIN
            }]
        }]
    });
    
    C.log('yellow', artisans)
    res.json({artisans})
}

exports.toutesLesCategories = async (req,res) => {

    models.Categories.findAll()
    .then((data) => {
        if (data) {
            let jsonData = JSON.stringify(data);
            C.log('magenta', jsonData);
            C.log('yellow', data.nom_categorie);
            res.json(data);
        
        } else {
        C.log('red',` message: Cannot find Categories.`);
        }
    })
    .catch((err) => {
        C.log('res', `message: "Error retrieving Categories`);
    });
}

exports.artisanParNom = async (req,res) => {
    const name = req.params.name;
    res.json({name: name})
};