const express = require('express');
const router = express.Router();

const sequelize = require('../dbConnect/dbConnect');

//*Services
const artisanController = require('../controllers/artisanController');

router.get('/artisansdumois', artisanController.getArtisansDuMois);

router.get('/artisansimpleindex', artisanController.getArtisansSimpleIndex);

router.get('/touteslescategories', artisanController.getAllCategories);

router.get('/artisanparid/:id', artisanController.getUnArtisan);

router.get('/artisanparnom/:nom', artisanController.getArtisanParNom);

router.get('/artisansparcategories/:categorie', artisanController.getArtisansParCategorie);

router.get("/", (req, res) => {
    res.send("Bienvenue sur l'API des Artisans !");
});

module.exports = router;