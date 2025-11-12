import Card from 'react-bootstrap/Card';
import RatingStars from './RatingStars';
import { Link } from 'react-router-dom';

const MiniCard = (props) => {

    

    return (
        <Link to={`/artisan/${props.idArtisan}`} className='text-decoration-none'>
            <Card style={{ width: '18rem'}} className='minicard mb-2'>
                <Card.Body className='text-center'>
                    <Card.Title> {props.nom} </Card.Title>
                    <Card.Subtitle className='d-flex flex-column align-items-center'> Note : {props.note}<RatingStars note={props.note} /> </Card.Subtitle>
                    <Card.Text> {props.specialite} <br /> {props.ville} </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
};

export default MiniCard;