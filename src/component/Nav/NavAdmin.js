import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import './Nav.css';


const NavAdmin = () => {
    const [click, setClick] = useState(false);
    

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const extendNavBar = () => {
        if(window.innerWidth > 960) {
            setClick(false);
        }
    }
    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("email");
        }
    }, []);

    window.addEventListener('resize',extendNavBar);

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
                        <NavLink to='/UploadProduct' activeClassName='active' className='nav-links' onClick={closeMobileMenu}>
                            Upload
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/ServerOrder' activeClassName='active' className='nav-links' onClick={closeMobileMenu}>
                            Orders
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/ProductList' className='nav-links' onClick={closeMobileMenu}>
                            Product List
                        </NavLink>
                    </li>
                </ul>
            </div>   
        </nav>
    );
}
    
export default NavAdmin;