const express = require('express');
const router = express.Router();

const sequelize = require('../dbConnect/dbConnect');

const C = require('../script/debug');


//*Services
const servicesBdd = require('../services/servicesBdd');

router.get('/artisansdumois', servicesBdd.artisansDuMois);

router.get('/touteslescategories', servicesBdd.toutesLesCategories);

router.get('/artisanparid/:id', servicesBdd.chercheUnArtisan);

router.get('/artisanparnom/:nom', servicesBdd.artisanParNom);

router.get('/artisansparcategories/:categorie', servicesBdd.artisansParCategorie);

router.get("/", servicesBdd.connexion)




module.exports = router;