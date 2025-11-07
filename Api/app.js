
//* import de base
const express = require('express');
const cors = require('cors');

const sequelize = require('./dbConnect/dbConnect');

//! authorisation de connection pour la partie front end seulement
// 1. Récupérer la variable d'environnement (avec une valeur de secours)
const allowedOriginsStr = process.env.ALLOWED_ORIGINS || 'http://localhost'; 

// 2. Transformer la chaîne en tableau, en nettoyant les espaces
const allowedOrigins = allowedOriginsStr.split(',').map(url => url.trim()); 

const corsOptions = {
  origin: function (origin, callback) {
    // Permettre les requêtes sans 'origin' (ex: Postman ou requêtes du même serveur)
    if (!origin) return callback(null, true); 

    // Vérifier si l'origine fait partie de la liste autorisée
    if (allowedOrigins.includes(origin)) {
      callback(null, true); // Autorisé
    } else {
      callback(new Error('Not allowed by CORS'), false); // Refusé
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Spécifiez les méthodes HTTP autorisées
  credentials: true, // Si vous utilisez des cookies ou headers d'authentification
};


//* Débug
const C = require('./script/debug');
//* Routes
const bddRouter = require('./routes/bdd');
//const testRouter = require('./routes/test');

const app = express()
app.use(cors(corsOptions));


const models = require('./dbConnect/modelRelations');
const PORT = process.env.PORT || 8101;

const startServer = async () => {
    try {
        //* Étape 1 : Vérification de la connexion à la base de données
        await sequelize.authenticate();
        C.log('green', '✅ Connection has been established successfully.');
        
        //* Étape 2 : Configuration et écoute du serveur Express
		app.use('/', bddRouter);
		//app.use('/test', testRouter);
        
        app.listen(PORT, () => {
            C.log('cyan', `🌐 Server running on port ${PORT}`);
            // console.log(`Server is running at http://localhost:${port}`);
        });

    } catch (error) {
        // Étape 3 : Gestion des Erreurs (si la connexion ou le démarrage échoue)
        C.log('red', `❌ Unable to connect to the database or start server => ${error}`);
        
        // Arrêter le processus car l'application ne peut pas fonctionner sans DB
        process.exit(1); 
    }
};


startServer();

