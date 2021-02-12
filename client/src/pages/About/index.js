import React from 'react';
import About1 from '../../components/About';
import Nav2 from '../../components/Nav2';
import Footer from '../../components/Footer';

const About = () => {

    return(
        <>
        <Nav2 />
        <div className="container">
            <About1 />
        </div>
        <Footer />
        </>
    )
}
export default About;