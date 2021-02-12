import React from 'react';
import { Link } from "react-router-dom";

import "./style.css";

const STYLES = ["btn--primary", "btn--outline"];

const SIZES = ["btn--medium", "btn--large"];

export const Button = ({
    children,
    to,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return(
        <Link className = {`${to === "signin" ? "nav-links" : ""}`} to = {`/${to}`}>
            <button className = {`btn ${checkButtonStyle} ${checkButtonSize}`} onClick = {onClick}>
                {children}
            </button>
        </Link>
    )
};