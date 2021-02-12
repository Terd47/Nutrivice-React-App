import React from 'react';
import './style.css';
import BMI from '../../components/BMI';
import Nav2 from '../../components/Nav2';
import Footer from '../../components/Footer';

const Discover  = () => {

    return(
        <>
         <Nav2 />
        <div className="container">
             <BMI />
        </div>
        <Footer />
        </>
    )
}

export default Discover;