
//* import de base
const express = require('express');
const cors = require('cors');

const sequelize = require('./dbConnect/dbConnect');

//! authorisation de connection pour la partie front end seulement
const corsOption = {
    origin : process.env.ACCESS_ONLY
}


//* Débug
const C = require('./script/debug');
//* Routes
const bddRouter = require('./routes/bdd');
const testRouter = require('./routes/test');

const app = express()
app.use(cors(corsOption));


const models = require('./dbConnect/modelRelations');
const PORT = process.env.PORT || 8100;

const startServer = async () => {
    try {
        //* Étape 1 : Vérification de la connexion à la base de données
        await sequelize.authenticate();
        C.log('green', '✅ Connection has been established successfully.');
        
        //* Étape 2 : Configuration et écoute du serveur Express
		app.use('/', bddRouter);
		app.use('/test', testRouter);
        
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

