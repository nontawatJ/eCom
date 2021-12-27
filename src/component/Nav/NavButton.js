import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavButton.css';

const STYLES = ['btn--primary', 'btn--secondary'];
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
    children,
    type,
    onClick, 
    buttonStyle,
    buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <NavLink to='/SignIn' className='btn--mobile'>
            <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
                {children}
            </button>
        </NavLink>
    )
}