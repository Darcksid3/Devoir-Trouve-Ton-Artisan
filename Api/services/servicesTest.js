const sequelize = require('../dbConnect/dbConnect');

const C = require('../script/debug');
/*
	* Models
*/
const models = require('../dbConnect/modelRelations');
const { where } = require('sequelize');

//TODO A supprimer utile pour test
exports.toutesLesSpecialites = async (req,res,next) => {
	const id = 3;
	models.Specialites.findAll()
		.then((data) => {
			if (data) {
				let jsonData = JSON.stringify(data);
				C.log('magenta', jsonData);
				C.log('yellow', data.nom_specialite);
				res.json(data);
			} else {
				C.log('red',` message: Cannot find Specialites with id=${id}.`);
			}
		})
		.catch((err) => {
			C.log('res', `message: "Error retrieving Specialites with id=" ${id}`);
		});
};
//TODO A supprimer utile pour test
exports.spécialiteParId = async (req,res,next) => {
	const id = req.params.id;
	models.Specialites.findByPk(id)
		.then((data) => {
			if (data) {
				let jsonData = JSON.stringify(data);
				C.log('magenta', jsonData);
				C.log('yellow', data.nom_specialite);
				res.json(data);
			} else {
				C.log('red',` message: Cannot find Specialites with id=${id}.`);
			}
		})
		.catch((err) => {
			C.log('res', `message: "Error retrieving Specialites with id=" ${id}`);
		});
	
};
//TODO A supprimer utile pour test
exports.testCount = async (req,res) => {
	const count = await models.Categories.count({
		attributes :['id_categorie']
	});
	C.log('yellow', count)
};

//* Status OK
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
};
//* status OK
exports.artisansDuMois = async (req,res) => {
	try{
		const artisans = await models.Artisans.findAll({
			where: {
				top_artisan: 1 // Remplacez par le nom exact dans votre DB ('Batiment', 'Bâtiment', etc.)
			},
			// Sélectionne tous les attributs de la table Artisans
			attributes: ['nom_entreprise','note', 'ville'],
				// intègre la spécialité
				include: [{
				model: models.Specialites,
				as: 'Specialite',
				attributes: ['nom_specialite'], // Attributs de la spécialité à inclure
				required: true, // Ceci garantit que seuls les artisans qui ont une spécialité seront inclus (INNER JOIN)
			}]
		});
		C.log('magenta', `${artisans}`);
		return res.status(200).json({artisans: artisans});
	} catch (error) {
        return res.status(500).json({ 
            message: 'ERROR', 
            error: 'Erreur interne du serveur lors de la recherche des artisans du mois.',
            detail: error.message
        });
    };
};

//* status OK
exports.chercheUnArtisan = async (req,res) => {
	C.log('magenta', `Début requette artisan ID` );
	const artisanID = req.params.id;
	C.log('yellow', ` l'id artisant est le : ${req.params.id}`);
	const count = await models.Artisans.count();
	if ( artisanID > count ) {
		return res.json({page:404, message: `L'id de l'arisan n'existe pas` })
	}

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
			C.log('red', `L'artisan avec l'id ${artisanID} n'existe pas`)
			return res.status(404).json({
				message: 'NOT FOUND',
				artisan: null,
				error: `L'artisan avec l'ID : ${artisanID} n'existe pas.`
			});
		} else {
			C.log('yellow', `L'artisan avec l'id ${artisanID} ${artisans.nom_entreprise} à été trouvé!`)
			return res.status(200).json({ artisans });
		}
	} catch (error) {
		C.log('red', `Erreur Interne`)
		return res.status(500).json({ 
			message: 'ERROR', 
			error: 'Erreur interne du serveur lors de la recherche de l\'artisan.',
			detail: error.message
		});
	}
};

//* Status OK
exports.toutesLesCategories = async (req,res) => {

	try {
        const categories = await models.Categories.findAll();
        if (categories === null) {
            C.log('red', `Catégorie nulle`)
            return res.status(404).json({
                message: 'NOT FOUND',
                artisan: null,
                error: `pas de catégories`
            });
        } else {
            C.log('yellow', categories);
            return res.status(200).json({categories: categories})
        }

    } catch (error) {
        return res.status(500).json({ 
            message: 'ERROR', 
            error: 'Erreur interne du serveur lors de la recherche des catégories.',
            detail: error.message
        });
    }
};

//* Status OK
exports.artisanParNom = async (req,res) => {
	const nom = req.params.nom;
	C.log('yellow', `Nom recherché : ${nom}`)
	try {
		const nomArtisan = await models.Artisans.findAll({
			attributes: ['nom_entreprise']
		});
		for (let i=0; i< nomArtisan.length; i++) {
			console.log(i)
			if (nom === nomArtisan[i].nom_entreprise) {
				C.log('green', `Nom OK`)
				//* Si l'artisan à été trouvé on récupère ces informations
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
			} else { 
				C.log('red', `${i} => ${nom} => ${nomArtisan[i].nom_entreprise}`)
				}
		}
		C.log('cyan', JSON.stringify(nomArtisan))
		return res.json({page:404, message: `le nom ${nom} n'as pas été trouvé`})
		
	} catch (error) {
		C.log('red', 'erreur interne')
		return res.status(500).json({erreur: `erreur interne ${error}`})
	}
	
};

exports.connection = async (req,res) => {
	//* Récupération à la connection 
	//* des catégories pour le menu
	//* des nom d'artisans et pour la recherche par nom(cela évite mutiple apel à la bdd a chaque lettre tapé)
	//* des artisan du mois pour la page d'accueil
	
	try{
		//* Catégories
		const categories = await models.Categories.findAll({
			attributes: ['nom_categorie']
		});
		C.log('magenta', `${categories}`)
		//* Nom des entreprises
		const nomDesEntreprises = await models.Artisans.findAll({
			attributes: ['nom_entreprise']
		});
		C.log('magenta', `${nomDesEntreprises}`)
		//* Artisans du mois
		const artisansDuMois = await models.Artisans.findAll({
			where: {
				top_artisan: 1 // Remplacez par le nom exact dans votre DB ('Batiment', 'Bâtiment', etc.)
			},
			// Sélectionne tous les attributs de la table Artisans
			attributes: ['nom_entreprise','note', 'ville'],
				// intègre la spécialité
				include: [{
				model: models.Specialites,
				as: 'Specialite',
				attributes: ['nom_specialite'], // Attributs de la spécialité à inclure
				required: true, // Ceci garantit que seuls les artisans qui ont une spécialité seront inclus (INNER JOIN)
			}]
		});
		C.log('magenta', `${artisansDuMois}`);
		//* Info spéciale et retour
		C.log('green', 'requette /connexion')
			C.log('yellow', req.ip.slice(7))
			const lIp = req.ip.slice(7);
			const votreIp = `Votre IP est : ${lIp}`
			res.json({
				connection_ip: votreIp,
				API: "Trouve Ton Artisan",
				categories: categories,
				artisansDuMois: artisansDuMois,
				nomDesEntreprises: nomDesEntreprises
			})
	} catch (error) {
		C.log('red', `Erreur interne lors de la recherche des objet de base`)
	}
};