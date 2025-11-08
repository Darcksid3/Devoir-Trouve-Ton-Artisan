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
                                Sed ut perspiciatis unde omnis iste natus error sit <br />
                                voluptatem accusantium doloremque laudantium, <br />
                                totam rem aperiam, eaque ipsa quae ab illo <br />
                                inventore veritatis
                            </li>
                            
                            <li>
                                <strong>Choisir un artisan </strong><br />
                                Sed ut perspiciatis unde omnis iste natus error sit <br />
                                voluptatem accusantium doloremque laudantium, <br />
                                totam rem aperiam, eaque ipsa quae ab illo <br />
                                inventore veritatis
                            </li>

                            <li>
                                <strong>Le contacter via le formulaire de contact </strong><br />
                                Sed ut perspiciatis unde omnis iste natus error sit<br />
                                voluptatem accusantium doloremque laudantium, <br />
                                totam rem aperiam, eaque ipsa quae ab illo<br />
                                inventore veritatis
                            </li>

                            <li>
                                <strong>Une réponse sera apportée sous 48h</strong><br />
                                Sed ut perspiciatis unde omnis iste natus error sit<br />
                                voluptatem accusantium doloremque laudantium, <br />
                                totam rem aperiam, eaque ipsa quae ab illo <br />
                                inventore veritatis
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