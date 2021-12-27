import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Nav from '../Nav/Nav';
import './SignUp.css';
import BGV from '../video/backGVideo'

const SignUp = ({history}) => {
    const [showPass, setShowPass] = useState(false);
    const [showPassTwo, setShowPassTwo] = useState(false);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const logoActive = showPass ? "far fa-eye" : "far fa-eye-slash";
    const logoActiveTwo = showPassTwo ? "far fa-eye" : "far fa-eye-slash";

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
    const showConfirmPassword = () => {
        var x = document.getElementById("confirmPassword");
        if (x.type === "password") {
            x.type = "text";
            setShowPassTwo(!showPassTwo);
        }
        else {
            x.type = "password";
            setShowPassTwo(!showPassTwo);
        }
    }

    const signUpHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }

        if(password !== confirmPassword) {
            setConfirmPassword("");
            return setError("Passwords do not match");
        }

        try {
            const {data} = await axios.post("https://mak-personal-project-server.herokuapp.com/home/auth/signUp", {fullName, email, password}, config);
            localStorage.setItem("authToken",data.token);
            localStorage.setItem("email", email);
            history.push("/private");
        }
        catch (error) {
            setError(error.response.data.error);
        }
    }
    const nameChangeHandler = (e) => {
        setError("");
        setFullName(e.target.value);
    }
    const emailChangeHandler = (e) => {
        setError("");
        setEmail(e.target.value.toLowerCase());
    }
    const passChangeHandler = (e) => {
        setError("");
        setPassword(e.target.value);
    }
    const confirmPassChangeHandler = (e) => {
        setError("");
        setConfirmPassword(e.target.value);
    }


    return (
        <div>
            <Nav />
            <BGV />
            <div className='SignUp-body'>
                <div className='signUpForm-container'>
                    <div className='signUp-form-title'>
                        Sign Up
                    </div>
                    <form onSubmit={signUpHandler}>
                        <div className='field'>
                            <input type="text"
                                placeholder="User Name"
                                pattern="[^' ']+"
                                minLength="3"
                                title="No Space and must be 3 character or longer"
                                id='fullName'
                                value={fullName} 
                                onChange={nameChangeHandler}
                                required />
                            <label>User name*</label>
                        </div>
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
                        <div className='field'>
                            <input type="password"
                                placeholder="Password"
                                pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$"
                                title="Minimum of eight characters. 
                                At least one lowercase letter, 
                                one uppercase letter, 
                                one number,
                                one special character, 
                                and no white space."
                                id="password"
                                value={password}
                                onChange={passChangeHandler}
                                required />
                            <label>Password*</label>
                            <i id="showPassLogo" className={logoActive} onClick={showPassword} />
                        </div>
                        <div className='field'>
                            <input type="password"
                                placeholder="Confirm Password"
                                pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$"
                                title="Must match the above password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={confirmPassChangeHandler}
                                required />
                            <label>Confirm Password*</label>
                            <i id="showPassLogo" className={logoActiveTwo} onClick={showConfirmPassword} />
                        </div>
                        <div className="signUp-errorMessage">
                            {error && <span className="errorMessage">
                                <i class="fas fa-exclamation-triangle"></i>
                                {error}
                            </span>}
                        </div>
                        <div className='field'>
                            <input type='submit' value='SIGN UP' />
                        </div>
                        <div className='signIn-link'>
                            ALREADY HAVE AN ACCOUNT? <NavLink to='/SignIn'>SIGN IN</NavLink>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}


export default SignUp;