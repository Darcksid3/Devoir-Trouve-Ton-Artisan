/* Script de création de la base de données et des tables pour l'annuaire des artisans*/

/* 1. Création de la base de données*/
CREATE DATABASE IF NOT EXISTS AnnuaireArtisans
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

/* Sélectionner la base de données*/
USE `AnnuaireArtisans`;

/* 2. Table pour les Catégories (ex: Alimentation, Services)*/
/* Cette table permet la recherche par catégorie.*/
CREATE TABLE IF NOT EXISTS Categories (
    id_categorie INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom_categorie VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* 3. Table pour les Spécialités (ex: Boucher, Coiffeur)*/
/* Cette table gère la relation N:1 entre Spécialité et Catégorie.*/
CREATE TABLE IF NOT EXISTS Specialites (
    id_specialite INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom_specialite VARCHAR(100) NOT NULL UNIQUE,
    id_categorie INT UNSIGNED NOT NULL,
    
    /* Définition de la clé étrangère vers la table Categories*/
    FOREIGN KEY (id_categorie)
        REFERENCES Categories(id_categorie)
        ON UPDATE CASCADE
        ON DELETE RESTRICT /* Empêche la suppression d'une catégorie si des spécialités y sont rattachées*/
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* 4. Table pour les Artisans*/
/* C'est la table principale, contenant tous les détails de l'artisan.*/
CREATE TABLE IF NOT EXISTS Artisans (
    id_artisan INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom_entreprise VARCHAR(255) NOT NULL, /* Pour la recherche par nom*/
    id_specialite INT UNSIGNED NOT NULL,
    note DECIMAL(2, 1) DEFAULT NULL, /* Note sur 5.0*/
    ville VARCHAR(100) NOT NULL,
    a_propos TEXT,
    email VARCHAR(255) UNIQUE,
    site_web VARCHAR(255) DEFAULT NULL,
    top_artisan BOOLEAN NOT NULL DEFAULT FALSE, /* VRAI/FAUX, 1/0*/
    
    /* Index pour optimiser les deux types de recherche*/
    INDEX idx_nom_entreprise (nom_entreprise),
    INDEX idx_specialite (id_specialite),
    
    /* Définition de la clé étrangère vers la table Specialites*/
    FOREIGN KEY (id_specialite)
        REFERENCES Specialites(id_specialite)
        ON UPDATE CASCADE
        ON DELETE RESTRICT /* Empêche la suppression d'une spécialité si des artisans y sont rattachés*/
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
