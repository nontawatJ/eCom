import React , {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import BGV from '../video/backGVideo'

import './Initial.css';


const Initial = () => {

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("email");
        }
    },[]) 

    return (
        <div className='Initial-body'>
            <BGV />
            <div className='Initial-container'>
                <div className='Initial-btn'>
                    <NavLink to='/Home'>
                        <button type="button">
                            Client
                        </button>
                    </NavLink>
                </div>
                <div className='Initial-btn'>
                    <NavLink to='/UploadProduct'>
                        <button type="button">
                            Admin
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Initial;