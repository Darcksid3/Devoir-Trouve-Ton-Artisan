const express = require('express');
const router = express.Router();

const sequelize = require('../dbConnect/dbConnect');

const C = require('../script/debug');


//*Services
const servicesTest = require('../services/servicesTest');


router.get('/artisansdumois', servicesTest.artisansDuMois);
//TODO A supprimer utile pour test
//*router.get('/toutespecialites', servicesTest.toutesLesSpecialites);

router.get('/toutescategories', servicesTest.toutesLesCategories);

router.get('/artisanparid/:id', servicesTest.chercheUnArtisan);

router.get('/artisanparnom/:nom', servicesTest.artisanParNom);
//TODO A supprimer utile pour test
//*router.get('/specialiteparid/:id', servicesTest.spécialiteParId);

router.get('/artisansparcategories/:categorie', servicesTest.artisansParCategorie);

router.get("/", (req,res) => {
    C.log('green', 'requette /api')
    C.log('yellow', req.ip.slice(7))
    const lIp = req.ip.slice(7);
    const votreIp = `Votre IP est : ${lIp}`
    res.json({ "api": [votreIp, "Trouve", "Ton", "Artisan"]})
})




module.exports = router;