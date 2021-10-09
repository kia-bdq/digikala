import './navbar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {FaShoppingCart} from 'react-icons/fa';
import ShoppingCart from '../shoppingCart/ShoppingCart';


const Navbar = () => {
    const cartCount = useSelector(state => state.cart.count);
    const [cartIsOpen, setCartIsOpen] = useState(false);
    const [inChangeLocation, setInChangeLocation] = useState(false);

    const changeNav = () =>{
        if(window.scrollY >= 100){
        setInChangeLocation(true);
        }
        else{
        setInChangeLocation(false);
        }
    };
    window.addEventListener('scroll', changeNav);

    return ( 
        <div className={inChangeLocation? "head littleHead":"head"}>
            <div className='container'>
                <FaShoppingCart className="fs" onClick={() => setCartIsOpen(true)}/>
                <Link className="logo" to="/"><h1>DigiKala</h1></Link>
                {cartCount>0 && <p id="cartCounter">{cartCount}</p>}
            </div>
            <ShoppingCart show={cartIsOpen} handleVisibility={() => setCartIsOpen(false)}/>
        </div>
     );
}
 
export default Navbar;