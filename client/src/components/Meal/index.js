import React, { useState, useEffect } from "react";
const apiKey = process.env.REACT_APP_API_KEY;


export default function Meal({ meal }) {
    const [imageUrl, setImageUrl] = useState("");


    useEffect(() => {
        fetch(
            `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=799c454c6da54da4bab574ff67c13190&includeNutrition=false`
        )
            .then((respone) => respone.json())
            .then((data) => {
                setImageUrl(data.image);
                console.log(data);
            })
            .catch(() => {
                console.log("error");
            })
    }, [meal.id])


    return (
        <>
            <article>

                <div className="gallery_product col-lg-4 col-md-4 col-sm-4 col-xs-6 filter hdpe">
                    <div className="card">
                        <h1 className="card-title">{meal.title}</h1>

                        <img src={imageUrl} alt="recipe" className="card-img-top" />
                        <div className="card-body">
                            <p className="card-text">
                                Preperation time: {meal.readyInMinutes} minutes <br />
                    Number of servings: {meal.servings} <br />
                            </p>



                        </div>
                        <a id="filterBtnTwo" className="btn btn-default filter-button card-bottom" href={meal.sourceUrl}>Go to recipe</a>
                    </div>
                </div>
            </article>

        </>

    )
}