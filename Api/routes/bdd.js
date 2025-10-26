const express = require('express');
const router = express.Router();

const sequelize = require('../dbConnect/dbConnect');

const C = require('../script/debug');


//*Services
const servicesBdd = require('../services/servicesBdd');

router.get('/artisansdumois', servicesBdd.artisansDuMois);

router.get('/touteslescategories', servicesBdd.toutesLesCategories);

router.get('/artisanparid/:id', servicesBdd.chercheUnArtisan);

router.get('/artisansparcategories/:categorie', servicesBdd.artisansParCategorie);

router.get("/", (req,res) => {
    C.log('green', 'requette /api')
    C.log('yellow', req.ip.slice(7))
    const lIp = req.ip.slice(7);
    const votreIp = `Votre IP est : ${lIp}`
    res.json({ "api": [votreIp, "Trouve", "Ton", "Artisan"]})
})




module.exports = router;