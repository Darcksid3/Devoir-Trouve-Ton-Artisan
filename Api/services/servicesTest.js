const sequelize = require('../dbConnect/dbConnect');

const C = require('../script/debug');
/*
	* Models
*/
const models = require('../dbConnect/modelRelations');
const { where } = require('sequelize');


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

exports.artisansParCategorie = async (req,res,next) => {
    const cat = req.params.categorie;
    C.log('green', `catégorie select => ${cat} `);
	
	// Assurez-vous d'importer vos modèles au préalable

	const artisans = await models.Artisans.findAll({
		// Sélectionne tous les attributs de la table Artisans
		attributes: ['nom_entreprise','note', 'ville', 'id_artisan'], 
		
		// Jointure imbriquée : Artisans -> Specialites -> Categories
		include: [{
			model: models.Specialites,
			as: 'Specialite',
			attributes: ['nom_specialite'], // Attributs de la spécialité à inclure
			required: true, // Ceci garantit que seuls les artisans qui ont une spécialité seront inclus (INNER JOIN)
			
			include: [{
				model: models.Categories,
				as: 'Categorie',
				attributes: [], // N'a pas besoin de sélectionner les colonnes de Catégorie
				required: true, // INNER JOIN
				
				// Condition de filtrage sur le nom de la catégorie
				where: {
					nom_categorie: `${cat}` // Remplacez par le nom exact dans votre DB ('Batiment', 'Bâtiment', etc.)
				}
			}]
		}]
	});

	// Affiche le résultat
	console.log(artisans);
	res.json({ cat: cat, artisans: artisans  });
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