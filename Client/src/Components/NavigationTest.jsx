import { Link } from 'react-router-dom';

const NavigationTest = () => {

    return (

        <div>
            <Link to='/'>Home</Link><br></br>
            <Link to='/Categories'>Categories</Link><br></br>
            <Link to='/Artisan'>Artisan</Link><br></br>
        </div>
    );
};

export default NavigationTest;