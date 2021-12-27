import React from 'react';
import { NavLink } from 'react-router-dom';
import BGV from '../video/backGVideo'

import './NotFound.css';


const NotFound = () => {
    return (
        <div className='notFound-body'>
            <BGV />
            <div className='notFound-container'>
                <div className='notFound-title'>
                    <p>404</p>
                </div>
                <div className='notFound-p1'>
                    <p>Page not found</p>
                </div>
                <div className='notFound-btn'>
                    <NavLink to='/Home'>
                        <button type="button">
                            Back Home
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
export default NotFound;