import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import './Nav.css';
import { Button } from './NavButton';

const Nav = () => {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };
    const extendNavBar = () => {
        if(window.innerWidth > 960) {
            setClick(false);
        }
    }

    window.addEventListener('resize',showButton);
    window.addEventListener('resize',extendNavBar);

    useEffect(() => {
        showButton();
        if (localStorage.getItem("authToken")) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("email");
        }
       
    }, []);
    

    return (
        <nav className={click ? 'navBar-active' : 'navBar'}>
            <div className='navbar-container'>
                <div className='navbar-home'>
                    <NavLink to='/' activeClassName='active' className='navbar-logo' onClick={closeMobileMenu}>
                        <i className="fab fa-cloudversify"></i>
                        Cloud
                    </NavLink>
                </div>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars' } />
                </div>
                <ul className={click ? "nav-menu-active" : 'nav-menu'}>
                    <li className='nav-item'>
                        <NavLink to='/About' activeClassName='active' className='nav-links' onClick={closeMobileMenu}>
                            About
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/Product' activeClassName='active' className='nav-links' onClick={closeMobileMenu}>
                            Product
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/SignIn' className='nav-links-mobile' onClick={closeMobileMenu}>
                            Sign In
                        </NavLink>
                    </li>
                </ul>
                {button && <Button buttonStlye='btn--secondary'>Sign In</Button>}
            </div>   
        </nav>
    );
}
    
export default Nav;