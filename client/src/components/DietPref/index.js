
import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import GetMeal from '../GetMealData';
import "./style.css";
import Navbar from '../Nav2';

export default class DietPref extends Component {
  constructor() {
    super();
    this.state = {
      preferences: {
        Vegan: false,
        GlutenFree: false,
        Ketogenic: false,
        Paleo: false,
        Primal: false,
        Whole30: false,
        Vegetarian: false,
        LactoVegetarian: false,
        OvoVegetarian: false,
        Pescetarian: false,
      },
      save: {
        clicked: false
      }
    };
  }

  handleClick = (event) => {
    const { name, checked } = event.target;

    this.setState((prevState) => {
      const preferences = prevState.preferences;
      preferences[name] = checked;
      return preferences;

    });

  };

  handleSave = (event) => {
    const {name, checked } = event.target;

    this.setState((prevState) => {
      let save = prevState.save;
      save[name] = checked;
      return save;

    });
    
  };
  savePreferences (preferences) {
    if(this.state.save.clicked === true) {
      const decodedToken = localStorage.getItem('decodedTokenID');
      const userId = decodedToken;
      console.log("TOKEN DECODED", decodedToken)
    const newPref = {
      userId: decodedToken,
      preferences: preferences };
    console.log(newPref);
    axios.post('/api/dataPref', newPref)
    .then(res => console.log(res))
    .then(alert("Your preferences have been saved! you may continue"))
  } 
}



  render() {
    const preferences = Object.keys(this.state.preferences)
      .filter((key) => this.state.preferences[key])
      .join(", ");

    return (
      <div className="form-check">
        <Navbar />
        <header className="header">
          <h1>Choose Diet Preferences</h1>
          <small>
         *descriptions provided by Spoonacular.</small>
        </header>

        <main>
          <div>
            <label>Check all that apply</label>

            <div>
              <input className="form-check-input" checked={this.state.preferences.vegan} onChange={this.handleClick} type="checkbox" name="Vegan" />
              <label className="form-check-label">Vegan</label>
                  No ingredients may contain meat or meat by-products, such as bones or gelatin, nor may they contain eggs, dairy, or honey.
                </div>

            <div>
              <input className="form-check-input" checked={this.state.preferences.glutenfree} onChange={this.handleClick} type="checkbox" name="GlutenFree" />
              <label className="form-check-label">Gluten Free</label>
                  Eliminating gluten means avoiding wheat, barley, rye, and other gluten-containing grains and foods made from them (or that may have been cross contaminated).
                </div>

            <div>
              <input className="form-check-input" checked={this.state.preferences.ketogenic} onChange={this.handleClick} type="checkbox" name="Ketogenic" />
              <label className="form-check-label">Ketogenic</label>
                  The keto diet is based more on the ratio of fat, protein, and carbs in the diet rather than specific ingredients. Generally speaking, high fat, protein-rich foods are acceptable and high carbohydrate foods are not
                </div>

            <div>
              <input className="form-check-input" checked={this.state.preferences.primal} onChange={this.handleClick} type="checkbox" name="Primal" />
              <label className="form-check-label">Primal</label>
              <p> Very similar to Paleo, except dairy is allowed - think raw and full fat milk, butter, ghee, etc.</p>
            </div>

            <div>
              <input className="form-check-input" checked={this.state.preferences.paleo} onChange={this.handleClick} type="checkbox" name="Paleo" />
              <label className="form-check-label">Paleo</label>
              <p>Allowed ingredients include meat (especially grass fed), fish, eggs, vegetables, some oils (e.g. coconut and olive oil), and in smaller quantities, fruit, nuts, and sweet potatoes. We also allow honey and maple syrup
                  (popular in Paleo desserts, but strict Paleo followers may disagree). Ingredients not allowed include legumes (e.g. beans and lentils), grains, dairy, refined sugar, and processed foods.</p>
            </div>
            <div>
              <input className="form-check-input" checked={this.state.preferences.whole30} onChange={this.handleClick} type="checkbox" name="Whole30" />
              <label className="form-check-label">Whole30</label>
              <p> Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil, small amounts of dried fruit and nuts/seeds. Ingredients not allowed include added sweeteners
                  (natural and artificial, except small amounts of fruit juice), dairy (except clarified butter or ghee), alcohol, grains, legumes (except green beans, sugar snap peas, and snow peas), and food additives, such as carrageenan, MSG, and sulfites.</p>
            </div>

            <div>
              <input className="form-check-input" checked={this.state.preferences.vegetarian} onChange={this.handleClick} type="checkbox" name="Vegetarian" />
              <label className="form-check-label">Vegetarian</label>
              <p> No ingredients may contain meat or meat by-products, such as bones or gelatin.</p>
            </div>
            <div>
              <input className="form-check-input" checked={this.state.preferences.lactoVegetarian} onChange={this.handleClick} type="checkbox" name="LactoVegetarian" />
              <label className="form-check-label">Lacto-Vegetarian</label>
              <p> All ingredients must be vegetarian and none of the ingredients can be or contain egg.</p>
            </div>

            <div>
              <input className="form-check-input" checked={this.state.preferences.ovoVegetarian} onChange={this.handleClick} type="checkbox" name="OvoVegetarian" />
              <label className="form-check-label">Ovo-Vegetarian</label>
              <p> All ingredients must be vegetarian and none of the ingredients can be or contain dairy. </p>
            </div>

            <div>
              <input className="form-check-input" checked={this.state.preferences.pescetarian} onChange={this.handleClick} type="checkbox" name="Pescetarian" />
              <label className="form-check-label">Pescetarian</label>
              <p> Everything is allowed except meat and meat by-products - some pescetarians eat eggs and dairy, some do not. </p>
            </div>
          </div>
          <br />
          <p> Your selected preferences are: {preferences}</p>
          <p>Please verify your preferences are correct, then scroll down to get your daily meal plan!
               </p>
               <input className="form-check-input" checked={this.state.save.clicked} onChange={this.handleSave} onClick={this.savePreferences(preferences)} type="checkbox" name="clicked" />
               <label className="form-check-label">Save</label>
          <br />

          <Link to={"/Meal"}>Only if you have NO diet preferences you may click <strong>here</strong> to continue </Link>


          {preferences && <GetMeal preferences={preferences} />}
        </main>

      </div>

    )

  }
}
