import React, { useState } from 'react';
import axios from 'axios';

import './PasswordReset.css';
import BGV from '../video/backGVideo';

const PasswordReset = ({ history, match }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [showPass, setShowPass] = useState(false);
    const [showPassTwo, setShowPassTwo] = useState(false);

    const logoActive = showPass ? "far fa-eye" : "far fa-eye-slash";
    const logoActiveTwo = showPassTwo ? "far fa-eye" : "far fa-eye-slash";


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

    const passwordResetHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        };

        if (password !== confirmPassword) {
            setConfirmPassword("");
            return setError("Passwords do not match");
            
        }
        try {
            await axios.post(`https://mak-personal-project-server.herokuapp.com/home/auth/resetPass/${match.params.resetToken}`, { password }, config);
            setError("");
            history.push("/SignIn")
            
        }
        catch (error) {
            setError("This link has expired, please resend the email.");
        }
    }
    const passChangeHandler = (e) => {
        setError("");
        setPassword(e.target.value);
    }
    const ConfirmPassChangeHandler = (e) => {
        setError("");
        setConfirmPassword(e.target.value);
    }


    return (
        <div>
            <BGV />
            <div className='resetPass-body'>
                <div className='resetPassForm-container'>
                    <div className='resetPassForm-title'>
                        Reset Password
                    </div>
                    <form onSubmit={passwordResetHandler}>
                        <div className='field'>
                            <input type="password"
                                placeholder="Password"
                                pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$"
                                title="Minimum of eight characters. At least one lowercase letter, one uppercase letter, one number and one special character."
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
                                pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$$"
                                title="Must match the above password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={ConfirmPassChangeHandler}
                                required />
                            <label>Confirm Password*</label>
                            <i id="showPassLogo" className={logoActiveTwo} onClick={showConfirmPassword} />
                        </div>
                        <div className="resetPass-errorMessage">
                            {error && <span className="errorMessage">
                                <i class="fas fa-exclamation-triangle"></i>
                                {error}
                            </span>}
                        </div>
                        <div className='field'>
                            <input type='submit' value='Reset Password' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}



export default PasswordReset;