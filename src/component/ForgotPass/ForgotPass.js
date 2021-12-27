import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import Nav from '../Nav/Nav';
import './ForgotPass.css';
import BGV from '../video/backGVideo';


const ForgotPass = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSucess] = useState("");

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("email");
        }
    },[])  

    const forgotPassHandler = async (e) => {
        e.preventDefault();
        setSucess("");
        setError("");

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        };
        
        try {
            const {data} = await axios.post("https://mak-personal-project-server.herokuapp.com/home/auth/forgotPass", {email}, config);
            setSucess(data.data);
        } 
        catch (error) {
            setError(error.response.data.error);
        }
    }
    const emailChangeHandler = (e) => {
        setError("");
        setSucess("");
        setEmail(e.target.value);
    }

    return (
        <div>
            <Nav />
            <BGV />
            <div className='forgotPass-body'>
                <div className='forgotPassForm-container'>
                    <div className='forgotPassForm-title'>
                        Forgot Password
                    </div>
                    <form onSubmit={forgotPassHandler}>
                        <div className='field'>
                            <input type="text"
                                placeholder="Email Address"
                                pattern="^[^\s].+[^\s]+[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                title="Must be in a valid email address format"
                                id="email"
                                value={email}
                                onChange={emailChangeHandler}
                                required />
                            <label>Email Address*</label>
                        </div>
                        <div className="forgotPass-errorMessage">
                            {error && <span className="errorMessage">
                                <i class="fas fa-exclamation-triangle"></i>
                                {error}
                            </span>}
                        </div>
                        <div className="forgotPass-successMessage">
                            {success && <span className="successMessage">
                                <i class="fas fa-check"></i>
                                {success}
                            </span>}
                        </div>
                        <div className='field'>
                            <input type='submit' value='Send Email' />
                        </div>
                        <div className='forgotPass-signInLink'>
                            ALREADY RESET YOUR PASSWORD? <NavLink to='/SignIn'>SIGN IN</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPass;