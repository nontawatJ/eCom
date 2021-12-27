import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css'
import Nav from '../Nav/Nav';
import BGV from '../video/backGVideo'
import BirdPic from '../picture/birdHome.jpg';

const Home = () => {

    
    
    return (
        <div className='home-body'>
            <Nav />
            <BGV />
            <div className='home-container'>
                <div className='home-heading'>
                    <p className='p1'>Are you tired of having no one to talk to in your home? </p>
                    <p className='p2'>Why not get yourself a family-friendly talking bird? </p>
                    <p className='p3'>Click <NavLink to='/Product'>here</NavLink> to see what kind of talking bird pet you can get.</p>
                </div> 
                <div className='homePic-container'>
                    <img className='homePic' src={BirdPic} alt="white cockatoo" />
                </div>
                
            </div>
        </div>
    );
}


export default Home;
