/* Script d'alimentation des tables de l'annuaire des artisans*/

USE `AnnuaireArtisans`;

/* Définition du texte de description commun (pour simplifier la lecture)*/
SET @description_text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ';

/* 1. Insertion des Catégories (uniques)*/
INSERT INTO Categories (nom_categorie) VALUES 
('Alimentation'),
('Batiment'),
('Fabrication'),
('Services');


/* 2. Insertion des Spécialités et liaison avec les Catégories*/
/* Utilisation de sous-requêtes pour lier par nom, assurant la robustesse*/
INSERT INTO Specialites (nom_specialite, id_categorie) VALUES
/* Alimentation*/
('Boucher', (SELECT id_categorie FROM Categories WHERE nom_categorie = 'Alimentation')),
('Boulanger', (SELECT id_categorie FROM Categories WHERE nom_categorie = 'Alimentation')),
('Chocolatier', (SELECT id_categorie FROM Categories WHERE nom_categorie = 'Alimentation')),
('Traiteur', (SELECT id_categorie FROM Categories WHERE nom_categorie = 'Alimentation')),
/* Batiment*/
('Chauffagiste', (SELECT id_categorie FROM Categories WHERE nom_categorie = 'Batiment')),
('Electricien', (SELECT id_categorie FROM Categories WHERE nom_categorie = 'Batiment')),
('Menuisier', (SELECT id_categorie FROM Categories WHERE nom_categorie = 'Batiment')),
('Plombier', (SELECT id_categorie FROM Categories WHERE nom_categorie = 'Batiment')),
/* Fabrication*/
('Bijoutier', (SELECT id_categorie FROM Categories WHERE nom_categorie = 'Fabrication')),
('Couturier', (SELECT id_categorie FROM Categories WHERE nom_categorie = 'Fabrication')),
('Ferronier', (SELECT id_categorie FROM Categories WHERE nom_categorie = 'Fabrication')),
/* Services*/
('Coiffeur', (SELECT id_categorie FROM Categories WHERE nom_categorie = 'Services')),
('Fleuriste', (SELECT id_categorie FROM Categories WHERE nom_categorie = 'Services')),
('Toiletteur', (SELECT id_categorie FROM Categories WHERE nom_categorie = 'Services')),
('Webdesign', (SELECT id_categorie FROM Categories WHERE nom_categorie = 'Services'));


/* 3. Insertion des Artisans*/
/* Utilisation de sous-requêtes pour lier à la Spécialité par nom*/
INSERT INTO Artisans (
    nom_entreprise, 
    id_specialite, 
    note, 
    ville, 
    a_propos, 
    email, 
    site_web, 
    top_artisan
) VALUES
/* Alimentation*/
('Boucherie Dumont', (SELECT id_specialite FROM Specialites WHERE nom_specialite = 'Boucher'), 4.5, 'Lyon', @description_text, 'boucherie.dumond@gmail.com', NULL, 0),
('Au pain chaud', (SELECT id_specialite FROM Specialites WHERE nom_specialite = 'Boulanger'), 4.8, 'Montélimar', @description_text, 'aupainchaud@hotmail.com', NULL, 1),
('Chocolaterie Labbé', (SELECT id_specialite FROM Specialites WHERE nom_specialite = 'Chocolatier'), 4.9, 'Lyon', @description_text, 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', 1),
('Traiteur Truchon', (SELECT id_specialite FROM Specialites WHERE nom_specialite = 'Traiteur'), 4.1, 'Lyon', @description_text, 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', 0),
/* Bâtiment*/
('Orville Salmons',(SELECT id_specialite FROM Specialites WHERE nom_specialite = 'Chauffagiste'),5.0,'Evian',@description_text, 'o-salmons@live.com',NULL, 1),
('Mont Blanc Eléctricité',(SELECT id_specialite FROM Specialites WHERE nom_specialite = 'Electricien'),4.5,'Chamonix',@description_text, 'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com', 0),
('Boutot & fils',(SELECT id_specialite FROM Specialites WHERE nom_specialite = 'Menuisier'),4.7,'Bourg-en-bresse',@description_text, 'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', 0),
('Vallis Bellemare',(SELECT id_specialite FROM Specialites WHERE nom_specialite = 'Plombier'),4.0,'Vienne',@description_text, 'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', 0),
/* Fabrication*/
('Claude Quinn',(SELECT id_specialite FROM Specialites WHERE nom_specialite = 'Bijoutier'),4.2,'Aix-les-bains',@description_text, 'claude.quinn@gmail.com',NULL, 0),
('Amitee Lécuyer',(SELECT id_specialite FROM Specialites WHERE nom_specialite = 'Couturier'),4.5,'Annecy',@description_text, 'a.amitee@hotmail.com', 'https://lecuyer-couture.com', 0),
('Ernest Carignan',(SELECT id_specialite FROM Specialites WHERE nom_specialite = 'Ferronier'),5.0,'Le Puy-en-Velay',@description_text, 'e-carigan@hotmail.com',NULL, 0),
/* Services*/
('Coiffure Léala Denos', (SELECT id_specialite FROM Specialites WHERE nom_specialite = 'Coiffeur'), 3.8, 'Chambéry', @description_text, 'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr', 0),
('C\'est sup\'hair', (SELECT id_specialite FROM Specialites WHERE nom_specialite = 'Coiffeur'), 4.1, 'Romans-sur-Isère', @description_text, 'sup-hair@gmail.com', 'https://sup-hair.fr', 0),
('Le monde des fleurs', (SELECT id_specialite FROM Specialites WHERE nom_specialite = 'Fleuriste'), 4.6, 'Annonay', @description_text, 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', 0),
('Valérie Laderoute', (SELECT id_specialite FROM Specialites WHERE nom_specialite = 'Toiletteur'), 4.5, 'Valence', @description_text, 'v-laredoute@gmail.com', NULL, 0),
('CM Graphisme', (SELECT id_specialite FROM Specialites WHERE nom_specialite = 'Webdesign'), 4.4, 'Valence', @description_text, 'cm-graphisme@gmail.com', 'https://cm-graphisme.com', 0);
