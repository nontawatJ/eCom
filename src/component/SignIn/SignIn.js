import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Nav from '../Nav/Nav';
import './SignIn.css';
import BGV from '../video/backGVideo'

const SignIn = ({history}) => {

    const [showPass, setShowPass] = useState(false);

    const [email, setEmail] = useState("test@test.com");
    const [password, setPassword] = useState("Test12345?");
    const [error, setError] = useState("");

    const logoActive = showPass ? "far fa-eye" : "far fa-eye-slash";

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            localStorage.removeItem("authToken");
        }
    }) 

    const showPassword = () => {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
            setShowPass(!showPass);
        }
        else {
            x.type = "password";
            setShowPass(!showPass);
        }
    }

    const signInHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            }
        };
        try {
            const {data} = await axios.post("https://mak-personal-project-server.herokuapp.com/home/auth/signIn", {email, password}, config);
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("email",email);
            history.push("/private");
            
        } 
        catch (error) {
            setError(error.response.data.error);
        }
    }
    const emailChangeHandler = (e) => {
        setError("");
        setEmail(e.target.value.toLowerCase());
    }
    const passChangeHandler = (e) => {
        setError("");
        setPassword(e.target.value);
    }
    
    return (
        <div>
            <Nav />
            <BGV />
            <div className='signIn-body'>
                <div className='signInForm-container'>
                    <div className='signIn-form-title'>
                        Sign In
                    </div>
                    <form onSubmit={signInHandler}>
                        <div className='field'>
                            <input type="text"
                                autoCapitalize = 'none'
                                placeholder="Email Address"
                                pattern="^[^\s].+[^\s]+[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                title="Must be in a valid email address format"
                                id="email"
                                value={email}
                                onChange={emailChangeHandler}
                                required />
                            <label>Email Address*</label>
                        </div>
                        <div className='field'>
                            <input type="password"
                                placeholder="Password"
                                id="password"
                                value={password}
                                onChange={passChangeHandler}
                                required />
                            <label>Password*</label>
                            <i id="showPassLogo" className={logoActive} onClick={showPassword} />
                        </div>
                        <div className="signIn-errorMessage">
                            {error && <span className="errorMessage">
                                <i class="fas fa-exclamation-triangle"></i>
                                {error}
                            </span>}
                        </div>
                        <div className='forgotPass-link'>
                            <NavLink to='/ForgotPass'>Forgot Password?</NavLink>
                        </div>
                        <div className='field'>
                            <input type='submit' value='SIGN IN' />
                        </div>
                        <div className='signIn-link'>
                            DOES NOT HAVE AN ACCOUNT? <NavLink to='/SignUp'>SIGN UP</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default SignIn;