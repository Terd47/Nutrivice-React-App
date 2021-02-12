import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { Button } from "../Button"

import "./style.css";

export default function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 680 || click) {
            setButton(false);
        } else {
            setButton(true);
        }
    }

    useEffect(() => {
        showButton()
    }, [])

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className = "navbar">
                <div className = "navbar-container">
                    <Link to = "/" className = "navbar-logo" onClick = {closeMobileMenu}>
                        <i className="fas fa-heartbeat"></i> Nutri<span className = "highlight">Vice</span>
                    </Link>
                    <div className = "menu-icon" onClick = {handleClick}>
                        <i className = {click ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                    <ul className = {click ? "nav-menu active" : "nav-menu"}>
                        <li className = "nav-item">
                            <Link to = "/discover" className = "nav-links tile" onClick = {closeMobileMenu}>
                                Discover
                            </Link>
                        </li>
                        <li className = "nav-item">
                            <Link to = "/dashboard" className = "nav-links tile" onClick = {closeMobileMenu}>
                                Dashboard
                            </Link>
                        </li>
                        <li className = "nav-item">
                            <Link to = "/about" className = "nav-links tile" onClick = {closeMobileMenu}>
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}