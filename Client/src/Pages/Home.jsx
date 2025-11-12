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
                <Row >
                    <h2 className="text-center p-2">Comment trouver mon artisan ?</h2>
                    <Col lg={8} md={12} className="cadre">
                        <ol className="ol-home">
                            
                            <li className="li-home"> 
                                <strong>Choisir la catégorie d’artisanat dans le menu</strong><br />
                                <span>Utilisez la barre de navigation pour sélectionner une catégorie générale d'artisanat.<br />
                                Cela vous dirigeras vers une page avec les artisans et leur spécialité,<br />
                                il ne vous reste qu’as sélectionner l'artisan de votre choix.</span>
                            </li>
                            <li className="li-home li-home--right">
                                <strong>Choisir un artisan </strong><br />
                                <span>Si vous connaissez son nom vous pouvez utilisez directement notre barre de recherche,<br />
                                elle se situe en haut à droite du site. 
                                Sinon pour choisir un artisan en fonction de vos besoin spécifique, une fois la catégorie sélectionner, <br />
                                choisissez l’artisan qui vous correspond en fonction de sa spécialité<br />
                                en cliquant sur sa carte. Vous accéderais à sa page.</span>
                            </li>
                            <li className="li-home">
                                <strong>Le contacter via le formulaire de contact </strong><br />
                                <span>La page de l'artisan contiens un formulaire de contact, remplissez le<br />
                                pour lui envoyait un message donner un maximum d'information permettras à l’artisan<br />
                                de connaître vos besoin spécifique et de mieux pouvoir vous répondre</span>
                            </li>
                            <li className="li-home li-home--right">
                                <strong>Une réponse sera apportée sous 48h</strong><br />
                                <span>Après avoir envoyait un message à l’artisan que vous avez sélectionner , <br />
                                l’artisan vous répondra dans les 48 heures pour répondre à votre question, <br />
                                ou prendre contact avec vous si besoin.</span>
                            </li>
                        </ol>
                    </Col>
                    <Col lg={4} md={12} className="d-flex flex-column align-items-center justify-content-around text-center">
                        <ArtisanDuMois />
                    </Col>
                </Row>
            </Container>
        </main>
    )
};

export default Home;