const express = require('express');
const router = express.Router();

const C = require('../script/debug');

router.get('/categorie', (req,res) => {
    const cat = req.query.cat;
    C.log('green', `catégorie select => ${cat} `);

    switch(cat) {
        case 'batiment':
            C.log('magenta', cat);
            res.json({ cat: cat });
            break;
        case 'service':
            C.log('magenta', cat);
            res.json({ cat: cat });
            break;
        case 'fabrication':
            C.log('magenta', cat);
            res.json({ cat: cat });
            break;
        case 'alimentation':
            C.log('magenta', cat);
            res.json({ cat: cat });
            break;
        default:
            C.log('magenta', cat);
            res.json({ cat: `Default => ${cat}` });
    }
});

router.get('/artisan', (req,res) => {
    C.log('magenta', 'Fiche artisan')
    const artisan = {
        nom : "michel",
        rating: "3,8",
        localisation: "lyons",
        image: "No image",
        description: 'Lore ipsum bla bla bla toc toc',
        site:'www.yenaspas.com/michel'
    }
    res.json({ message : 'fiche artisan', artisan: artisan})
})

router.get('/search', (req,res) => {
    C.log('magenta', `Recherche d'artisan par son nom`)
    res.json({message: 'Artisan par son Nom'})

});

router.get('/', (req,res) => {
    C.log('magenta', `Artisan du mois`)
    res.json({ message: 'Artisan du mois', artisan : ["michel", "jean", "éric"]})
});

module.exports = router;