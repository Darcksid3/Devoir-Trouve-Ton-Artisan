import { Container, Row, Col } from "react-bootstrap";
import ArtisanDuMois from "../Components/Artisandumois";
import MetaInfo from '../Components/Helmet';
const Home = () => {
    
    return (
        <main>
            <MetaInfo
                title="Trouve ton artisan"
                content="Page d'accueil pour trouver un artisan facilement ainsi que la liste des artisans du mois"
                robots="index, follow"
            />
            
            <Container className="d-flex flex-row flex-wrap mx-auto" fluid>
                <Row className="text-center p-2">
                    <h2>Comment trouver mon artisan ?</h2>
                    <Col lg={6} md={12} className="text-left d-flex flex-column align-items-center">
                        <ol className="ol-home">
                            <li> 
                                <strong>Choisir la catégorie d’artisanat dans le menu</strong><br />
                                Utilisez la barre de navigation pour sélectionner une catégorie générale d'artisan.<br />
                                Cela vous dirigeras vers une page avec les artisans et leur spécialité,<br />
                                il ne vous resteras plus qu’as sélectionner l'artisan de votre choix.<br />
                            </li>
                            <li>
                                <strong>Choisir un artisan </strong><br />
                                Si vous connaissez son nom vous pouvez utilisez directement la barre de recherche,<br />
                                sinon choisir un artisan en fonction de vos besoin spécifique, <br />
                                une fois la catégorie sélectionner et être arrivé sur la page,<br />
                                choisissez l’artisan qui vous correspond en fonction de sa spécialité<br />
                                en cliquant sur sa carte. Vous accéderais a sa page.<br />
                            </li>
                            <li>
                                <strong>Le contacter via le formulaire de contact </strong><br />
                                La page de l'artisan contiens un formulaire de contact, remplissez le<br />
                                pour lui envoyait un message donner un maximum d'information permettras a l’artisan<br />
                                de connaître vos besoin spécifique et de mieux pouvoir vous répondre<br />
                            </li>
                            <li>
                                <strong>Une réponse sera apportée sous 48h</strong><br />
                                Après avoir envoyait un message à l’artisan que vous avez sélectionner , <br />
                                l’artisan vous répondra dans les 48 heures pour répondre à votre question, <br />
                                ou prendre contact avec vous si besoin.<br />
                            </li>
                        </ol>
                    </Col>
                    <Col lg={6} md={12} className="d-flex flex-column align-items-center justify-content-around text-center ">
                        <ArtisanDuMois />
                    </Col>
                </Row>
            </Container>
        </main>
    )
};

export default Home;