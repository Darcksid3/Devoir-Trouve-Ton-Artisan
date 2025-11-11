import Card from 'react-bootstrap/Card';
import RatingStars from './RatingStars';
import { Link } from 'react-router-dom';

const MiniCard = (props) => {

    

    return (
        <Link to={`/artisan/${props.idArtisan}`} className='text-decoration-none'>
            <Card style={{ width: '18rem'}} className='minicard mb-2'>
                <Card.Body>
                    <Card.Title> {props.nom} </Card.Title>
                    <Card.Subtitle> Note : <RatingStars note={props.note} /> </Card.Subtitle>
                    <Card.Text> {props.specialite} <br /> {props.ville} </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
};

export default MiniCard;