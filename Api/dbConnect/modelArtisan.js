const sequelize = require('../dbConnect/dbConnect');
const DataTypes = require("sequelize");

const Artisans = sequelize.define("Artisans", {
    // Clé Primaire : id_artisan
    id_artisan: {
        field: 'id_artisan',
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true // Ajouté car c'est généralement le cas pour un PK auto
    },
    
    // Nom de l'entreprise
    nom_entreprise: {
        field: 'nom_entreprise',
        type: DataTypes.STRING,
        allowNull: false
    },
    
    // Clé Étrangère : id_specialite
    id_specialite: {
        field: 'id_specialite',
        type: DataTypes.INTEGER,
        allowNull: false
        // NOTE: Les associations (ex: belongsTo) seront définies séparément
    },
    
    // Note (Notation décimale)
    note: {
        field: 'note',
        type: DataTypes.FLOAT, // FLOAT ou DECIMAL pour les notes décimales
        allowNull: true // D'après vos données, les notes peuvent être nulles ou non définies
    },
    
    // Ville
    ville: {
        field: 'ville',
        type: DataTypes.STRING,
        allowNull: false
    },
    
    // Description "À propos" (texte long)
    a_propos: {
        field: 'a_propos',
        type: DataTypes.TEXT, // Utiliser TEXT pour les blocs de texte longs
        allowNull: true
    },
    
    // Email
    email: {
        field: 'email',
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // L'email est généralement unique
        validate: {
            isEmail: true // Validation de base
        }
    },
    
    // Site Web
    site_web: {
        field: 'site_web',
        type: DataTypes.STRING,
        allowNull: true // Peut être NULL d'après vos données
    },
    
    // Indicateur Top Artisan (Booléen/Petit entier)
    top_artisan: {
        field: 'top_artisan',
        type: DataTypes.BOOLEAN, // BOOLEAN est le type Sequelize le plus approprié (correspondant à 0 ou 1)
        allowNull: false,
        defaultValue: 0 // Définit 0 par défaut si non spécifié
    }

}, {
    // OPTIONS DU MODÈLE POUR LA CONSISTANCE
    tableName: 'Artisans',         // Assure que le nom de la table est 'Artisans'
    freezeTableName: true,         // Empêche la pluralisation par défaut de Sequelize
    timestamps: false              // 👈 Désactive les colonnes createdAt/updatedAt pour éviter l'erreur
});

module.exports = Artisans;