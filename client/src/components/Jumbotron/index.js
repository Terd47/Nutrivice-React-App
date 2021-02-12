import React from 'react'
import { Link } from 'react-router-dom';

import { Button } from "../Button"

import "./style.css"

function Jumbotron() {
    return (
        <div className = "jumbotron-container">
            <h1>Welcome!</h1>
            <p>NutriVice is a meal planner that's all about you!</p>
            <div className = "jumbotron-btns">
                <Button className = "btns" buttonStyle = "button--outline" buttonSize = "btn--large" ><Link to={'/Signup'}>Get Started! </Link></Button>
            </div>
        </div>
    )
}

export default Jumbotron;