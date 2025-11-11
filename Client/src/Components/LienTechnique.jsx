import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom";

const technicalLinks = [
    { path: '/Mentions-legales', label: 'Mentions Légales' },
    { path: '/politique-cookies', label: 'Politique de Cookies' },
    { path: '/Politique-confidentialite', label:'Politique de Confidentialité'},
    { path: '/Accessibilite', label: 'Accessibilité'}
];


const LienTechnique = (props) => {

    const className = () => {
        if (props.class === 'footer') {
            const className = 'navlink navlink--white';
            return className

        } else if (props.className === 'navbar') {
            const className = 'navlink navlink--grey'
            return className
        } else {
            const className = 'navlink navlink--grey';
            return className
        }
    }

    return (
        <div>
            {technicalLinks.map(link => (
                <Nav.Link as={Link} to={link.path} key={link.path} className={className()} style={{display:'block'}} onClick={props.click}>{link.label}</Nav.Link>
            ))}
        </div>
    )
}

export default LienTechnique