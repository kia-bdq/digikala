import { Link } from 'react-router-dom';
import './navbar.css';
import {FaBars, FaShoppingCart} from 'react-icons/fa';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ShoppingCart from '../shoppingCart/ShoppingCart';


const Navbar = () => {
    const cartCount = useSelector(state => state.cart.count);
    const [navOpen, setNavOpen] = useState(false);
    const [cartIsOpen, setCartIsOpen] = useState(false);

    // const openNav = () =>{
    //     setNavOpen(!navOpen);
    // }

    return ( 
        <div className='head'>
            <div className='container'>
                <FaShoppingCart className="fs" onClick={() => setCartIsOpen(true)}/>
                <Link className="logo" to="/"><h1>DigiKala</h1></Link>
                {/*<FaBars onClick={openNav} className='fb'/>*/}
                {cartCount>0 && <p id="cartCounter">{cartCount}</p>}
            </div>
            <ShoppingCart show={cartIsOpen} handleVisibility={() => setCartIsOpen(false)}/>
        </div>
     );
}
 
export default Navbar;