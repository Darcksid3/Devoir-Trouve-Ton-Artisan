const sequelize = require('../dbConnect/dbConnect');
const DataTypes = require("sequelize");

const Categories = sequelize.define("Categories", {
    id_categorie: {
        field: 'id_categorie',
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey:true
    },    
    nom_categorie: {
        field: 'nom_categorie',
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // 💡 AJOUTEZ CET OBJET D'OPTIONS POUR ÉVITER LES PROBLÈMES DE NOMMAGE
    tableName: 'Categories',      // Garantit que le nom de la table est bien 'Categories'
    freezeTableName: true,        // 👈 TRÈS IMPORTANT: Empêche Sequelize de pluraliser (ex: 'Categories' -> 'Categorieses')
    underscored: true,             // Utilise le style snake_case (id_categorie, nom_categorie) pour les noms de colonnes
	timestamps: false // Désactive l'ajout automatique des colonnes de timestamps

});

module.exports = Categories;
