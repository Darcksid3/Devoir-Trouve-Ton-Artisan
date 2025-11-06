const sequelize = require('../dbConnect/dbConnect');

const Artisans = require('./modelArtisan');
const Categories = require('./modelCategorie');
const Specialites = require('./modelSpecialites');
// Après avoir importé vos modèles : Categories, Specialites, Artisans

// Relation 1:1 (ou 1:N) entre Artisans et Specialites
Artisans.belongsTo(Specialites, {
    foreignKey: 'id_specialite',
    targetKey: 'id_specialite', // Clé dans la table Specialites
    as: 'Specialite' // Alias pour la jointure
});

Specialites.hasMany(Artisans, {
    foreignKey: 'id_specialite',
    as: 'Artisans'
});

// Relation 1:1 (ou 1:N) entre Specialites et Categories
Specialites.belongsTo(Categories, {
    foreignKey: 'id_categorie',
    targetKey: 'id_categorie', // Clé dans la table Categories
    as: 'Categorie' // Alias pour la jointure
});

Categories.hasMany(Specialites, {
    foreignKey: 'id_categorie',
    as: 'Specialites'
});
// --- 3. Exportation des modèles associés ---
module.exports = {
    Categories,
    Specialites,
    Artisans
};