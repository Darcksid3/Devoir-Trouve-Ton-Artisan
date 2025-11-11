
//* import de base
const express = require('express');
const cors = require('cors');

const sequelize = require('./dbConnect/dbConnect');

const isDevelopement = process.env.NODE_ENV !== 'production'

//! Pour la partie dev local avec plusieurs origines possibles a supprimer pour la production finale
const allowedOriginsStr = process.env.ALLOWED_ORIGINS || 'http://localhost'; 
const allowedOriginsDev = allowedOriginsStr.split(',').map(url => url.trim()); 
const corsOptionsDev = {
  origin: function (origin, callback) {
    // Permettre les requêtes sans 'origin' (ex: Postman ou requêtes du même serveur)
    if (!origin) return callback(null, true); 
    // Vérifier si l'origine fait partie de la liste autorisée
    if (allowedOriginsDev.includes(origin)) {
      callback(null, true); // Autorisé
    } else {
      callback(new Error('Not allowed by CORS'), false); // Refusé
    }
  },
  methods: 'GET', // Spécifiez les méthodes HTTP autorisées
  credentials: true, // Si vous utilisez des cookies ou headers d'authentification
};

//! authorisation de connection pour la partie front end seulement
//* Pour la production finale avec une seule origine
const allowedOriginsProd = process.env.ORIGIN; 
const corsOptionsprod = {
  // Le serveur n'autorisera que cette origine pour les requêtes de navigateur
  origin: allowedOriginsProd, 
  methods: 'GET', 
  optionsSuccessStatus: 200 
};

const corsOptions = isDevelopement ? corsOptionsDev : corsOptionsprod


//* Routes
const artisanRouter = require('./routes/artisans');

const app = express()
app.use(cors(corsOptions));

const models = require('./dbConnect/modelRelations');
const PORT = process.env.PORT || 8101;

const startServer = async () => {
    try {
        //* Étape 1 : Vérification de la connexion à la base de données
        await sequelize.authenticate();
        console.log('✅ Connection has been established successfully.');
        
        //* Étape 2 : Configuration et écoute du serveur Express

        app.use('/', artisanRouter);
        
        app.listen(PORT, () => {
            console.log(`🌐 Server running on port ${PORT}`);
        });

    } catch (error) {
        // Étape 3 : Gestion des Erreurs (si la connexion ou le démarrage échoue)
        console.log(`❌ Unable to connect to the database or start server => ${error}`);
        
        // Arrêter le processus car l'application ne peut pas fonctionner sans DB
        process.exit(1); 
    }
};

startServer();

