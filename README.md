# Trouve ton artisant

## Description
Création d'un site web pour la région rhone-alpe permétant de trouver facilement un artisant en fonction de ces besoins.

## Feuille de route

- Création des maquettes Mobiles, tablettes et ordinateur.
- Création de la base de donnée(AnnuaireArtisans).
- Mise en place de la partie backend.
- Mise en place de la partie frontend.
- rédaction du projet complet sous format PDF.

## Avancement

1. Création des maquettes Mobiles, tablettes et ordinateur.
    - ✅ Mobile (portrait, paysage) Tablette (Portrait) (Wireframe et Maquette)
    - ✅ Desktop et Tablette (Paysage)
2. Création de la base de donnée mariadb.
    - ✅ Céation et alimentation de la base de donée par fichier Sql\
    - ✅ AnnuaireArtisans
3. Mise en place de la partie backend.
    - ✅ Lise en place de la connection a la base de donnée et des schémas.
    - ✅ Mise en place des routes
    - ✅ Mise en place des services
4. Mise en place de la partie frontend.
    :x: Mise en place d'une partie client avec navigation\
     Basique et importation des librairies nésséssaire.
5. rédaction du projet complet sous format PDF.
    :x: Non débuté.

## Utilisation 
1) **Explication des outils API.**
     - **MariaDB**
    MariaDB vas nous permètre de géré une base de donnée relationelle en toute sécurité, d'y travailler en local et ensuite de pouvoir l'exporter en ligne en fonction de notre serveur.
     - **Express**
     Express vas crée un serveur pour nous permetre d'intérroger la base de donnée.
     - **Librairies Mariadb Sequelize cors**
     Ces modules pour express vont nous permettre de nous conecté à la base de donnée de traité avec elle et d'identifier les apel authorisé a l'api.

2) **Mise en place et téléchargement des divers outils de l'API pour (Windows).**
    - **MariaDB**(en local)
        => Fichier d'installation [Téléchargement][downloadMariaDB]
    - **Express**
        => `npm i express`
    - **Sequelize**
        => `npm i mariadb sequelize cors`

1) **Explication des outils Client.**
     - **React, React-Router, React-Script, Bootstrap, Bootstrap icon**
        Cela vas nous permetre de géré la partie visuelle du client.
     - **Helmet**
        Cette librairie vas nous etre utile pour géré le référencement du site.
     - **Ky**
        Cette librairie est une version plus récente et moin lourde que *Axios*, elle vas permetre de faire les requette a l'API et de récupéré les information de la base de donnée.

4) **Mise en place et téléchargement des divers outils du Client pour** (Windows).
    - **React, React-Router, React-Script, Bootstrap, Bootstrap icon**
        => `npm i react react-router-dom react-scripts react-bootstrap react-router-bootstrap bootstrap-icons`
    - **Helmet**
        => `nom i helmet`
    - **Ky**
        => `npm i ky`
***

[downloadMariaDB]:https://mariadb.com/downloads/?%20utm_source=google&utm_medium=ppc&utm_campaign=enterprise&qgad=771163141187&qgterm=mariadb&utm_source=google&utm_medium=ppc&utm_campaign=22939587589_182246370697&utm_term=g_kwd-295966390790_e_mariadb&utm_content=771163141187&locationid=9055737&device=c_c&gad_source=1&gad_campaignid=22939587589&gclid=CjwKCAjwgeLHBhBuEiwAL5gNEUBC5j5GZ7QVcyCp2UKyy8D8V9N_ZOGeSTF9AXvGQOBm0kWVs1POSxoCkVQQAvD_BwE

[tutorielMariaDB]:http://www/speedtuto/tutoMariaDB