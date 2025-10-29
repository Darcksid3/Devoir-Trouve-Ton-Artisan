
import ArtisanDuMois from "../Components/Artisandumois";

const Home = () => {

    return (
        <div>
            <h2>Home Page</h2>
            <h3>Comment utilisez notre site</h3>
            <ol>
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

            <h3>Les artisans du mois</h3>
            
                <ArtisanDuMois />
        </div>
    )
};

export default Home;