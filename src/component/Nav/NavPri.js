import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import './Nav.css';


const NavPri = ({history}) => {
    const [click, setClick] = useState(false);
    
    

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const extendNavBar = () => {
        if(window.innerWidth > 960) {
            setClick(false);
        }
    }
   

    window.addEventListener('resize',extendNavBar);

    

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            history.push("/signIn")
        }
        if (!localStorage.getItem("email")) {
            history.push("/signIn")
        }

        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }
            try {
                await axios.get("https://mak-personal-project-server.herokuapp.com/home/private", config);
            } 
            catch (error) {
                localStorage.removeItem("authToken");
            }
        }
        fetchPrivateData();

    }, [history]);

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("email");
    }

    return (
        <nav className={click ? 'navBar-active' : 'navBar'}>
            <div className='navbar-container'>
                <div className='navbar-home'>
                    <NavLink to='/private' activeClassName='active' className='navbar-logo' onClick={closeMobileMenu}>
                        <i className="fab fa-cloudversify"></i>
                        Cloud
                    </NavLink>
                </div>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars' } />
                </div>
                <ul className={click ? "nav-menu-active" : 'nav-menu'}>
                    <li className='nav-item'>
                        <NavLink to='/Cart' activeClassName='active' className='nav-links' onClick={closeMobileMenu}>
                            <i className="fas fa-shopping-cart"></i>
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/UserOrder' className='nav-links' onClick={closeMobileMenu}>
                            Order
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/SignIn' className='nav-links-mobile' onClick={logoutHandler}>
                            Logout
                        </NavLink>
                    </li>
                    
                </ul>
                <NavLink to='/SignIn' onClick={logoutHandler}>
                    <button className="nav-logout">Logout</button>      
                </NavLink>
            </div>   
        </nav>
    );
}
    
export default NavPri;