import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import "./style.css";

export default function Footer() {
    return (
        <footer className = "footer">
            <div className = "footer-logo-container">
                <Link to = "/" className = "footer-logo">
                    <i className="fas fa-heartbeat"></i> Nutri<span className = "highlight">Vice</span>
                </Link>
            </div>
            <div className = "copywrite-containter">
                <p className = "copywrite"> &copy;  2021 DT SF ND LS </p>
            </div>
        </footer>
    )
}
