const express = require('express');
const router = express.Router();

const sequelize = require('../dbConnect/dbConnect');

const C = require('../script/debug');


//*Services
const servicesTest = require('../services/servicesTest');




//TODO A supprimer utile pour test
//*router.get('/toutespecialites', servicesTest.toutesLesSpecialites);

router.get('/toutescategories', servicesTest.toutesLesCategories);

router.get('/artisanparid/:id', servicesTest.chercheUnArtisan);

router.get('/artisanparnom/:nom', servicesTest.artisanParNom);

router.get('/artisansdumois', servicesTest.artisansDuMois);

//TODO A supprimer utile pour test
//*router.get('/specialiteparid/:id', servicesTest.spécialiteParId);

router.get('/artisansparcategories/:categorie', servicesTest.artisansParCategorie);

//TODO A Supprimer utile pour test
//*router.get('/count', servicesTest.testCount);

router.get("/", servicesTest.connection)




module.exports = router;