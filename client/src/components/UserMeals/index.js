import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiCreativeCommonsZeroLine } from 'react-icons/ri';
const apiKey = process.env.REACT_APP_API_KEY;

const UserMeals = (meal) => {
    const [imageurl, setImageUrl] = useState("");
    const [mealDetails, setMealDetails] = useState("");


    const getRandomMeals = () => {
       axios.get(`https://api.spoonacular.com/recipes/random?number=100&tags=vegeterian,dessert&apiKey=${apiKey}`)
       .then(res => {
           console.log(res);
       })
    }

    return(
        <div className="container">
            <section>
                <div className="card">
                    
                    <button type="button" className="btn btn-primary" onClick={getRandomMeals}>Get meals</button>
                    <p>{mealDetails}</p>
                </div>
            </section>
        </div>
    )
}

export default UserMeals;