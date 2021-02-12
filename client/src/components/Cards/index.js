import React from 'react';
// import CardItem from './CardItem';

import "./style.css"

function Cards(props) {
    return (
        <div className = "cards">
            <ul className = "cards__items">
                {props.children}
            </ul>
        </div>
    )
}

export default Cards
