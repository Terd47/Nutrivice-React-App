import React from 'react'
// import { Link } from 'react-router-dom'


export default function CardItem(props) {
    return (
        <>
            <li className = "cards__item">
                <figure className = "cards__item__figure-wrap">
                    {props.picsrc && <pic className = {`${props.pic}-pic`} src = {`${props.imgsrc}`}></pic>}
                    {props.icon && <i className = {`cards__item__icon fa ${props.icon}`}></i>}
                </figure>
                <div className = "cards__item__info">
                    <p className = "cards__item__text">{props.text}</p>
                </div>
            </li>
        </>
    )
}