import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import BmiChart from "../images/1848503788-huge.jpg";
import Navbar from '../Nav2';
import Footer from '../Footer';

export default class BMI extends React.Component {

  constructor() {
    super();

    this.state = {
      heightFeet: '',
      heightInch: '',
      weight: '',
      activityLevel: '',
      gender: '',
      age: '',
      goalWeight: '',
      save: {
        clicked: false
      }
    }

    this.handleHeightFeetChange = this.handleHeightFeetChange.bind(this);
    this.handleHeightInchChange = this.handleHeightInchChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.calculateBMI = this.calculateBMI.bind(this);
    this.handleActivityLevelChange = this.handleActivityLevelChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleGoalWeightChange = this.handleGoalWeightChange.bind(this);
  }

  handleHeightFeetChange(event) {
    this.setState({
      heightFeet: event.target.value
    });
  }

  handleHeightInchChange(event) {
    this.setState({
      heightInch: event.target.value
    });
  }

  handleWeightChange(event) {
    this.setState({
      weight: event.target.value
    });
  }

  handleActivityLevelChange(event) {
    this.setState({
      activityLevel: event.target.value
    });
  }

  handleGenderChange(event) {
    this.setState({
      gender: event.target.value
    });
  }

  handleAgeChange(event) {
    this.setState({
      age: event.target.value
    })
  }

  handleGoalWeightChange(event) {
    this.setState({
      goalWeight: event.target.value
    });
  }


  calculateBMI() {
    if (this.state.weight && this.state.heightFeet && this.state.heightInch) {
      // BMI Formula = (WEIGHT[in pounds] / (HEIGHT[in inches] * HEIGHT[in inches])) * 703;
      let INCHES_IN_FEET = 12;

      var height = Number(this.state.heightFeet);
      // convert feet to inches
      height *= INCHES_IN_FEET;
      // add the inches input field
      height += Number(this.state.heightInch);

      let weight = this.state.weight;

      var bmi = (weight / (height * height)) * 703;
      bmi = bmi.toFixed(2);

      return bmi;
    }
  }

  getBMIResults(bmi) {
    let bmiResults = {
      label: '',
      alertClass: '',
    };

    if (bmi <= 18.5) {
      bmiResults.label = 'Underweight';
      bmiResults.alertClass = 'alert-danger';
    }
    else if (bmi <= 24.9) {
      bmiResults.label = 'Normal weight';
      bmiResults.alertClass = 'alert-success';
    }
    else if (bmi <= 29.9) {
      bmiResults.label = 'Overweight';
      bmiResults.alertClass = 'alert-warning';
    }
    else if (bmi >= 30) {
      bmiResults.label = 'Obesity';
      bmiResults.alertClass = 'alert-danger';
    } else {
      bmiResults.label = 'BMI';
      bmiResults.alertClass = 'alert-primary';
    }

    return bmiResults;
  }


  getBMR() {
    if (this.state.weight && this.state.heightFeet && this.state.heightInch && this.state.age && this.state.goalWeight) {
      let INCHES_IN_FEET = 12;

      var height = Number(this.state.heightFeet);

      height *= INCHES_IN_FEET;

      height += Number(this.state.heightInch);

      if (this.state.gender === "Male") {

        let bmr = 66.47 + (this.state.weight * 6.24) + (12.7 * height) - (6.755 * this.state.age);

        return bmr.toFixed(2)
      }

      else if (this.state.gender === "Female") {
        let bmr = 655.51 + (4.35 * this.state.weight) + (4.7 * height) - (4 - 7 * this.state.age);

        return bmr.toFixed(2)

      }
      else {
        let bmr = "";
        return bmr
      }
    }
  }

  getCalPerDay(bmr) {

    if (this.state.activityLevel && this.state.weight && this.state.heightFeet && this.state.heightInch && this.state.age && this.state.goalWeight) {

      if (this.state.goalWeight === "lose") {


        if (this.state.activityLevel === "little") {
          let cpd = (bmr * 1.2);
          console.log("cpd")
          return cpd.toFixed(2)
        }
        else if (this.state.activityLevel === "light") {
          let cpd = (bmr * 1.375)
          return cpd.toFixed(2)
        }
        else if (this.state.activityLevel === "moderate") {
          let cpd = (bmr * 1.55)
          return cpd.toFixed(2)
        }

        else if (this.state.activityLevel === "very") {
          let cpd = (bmr * 1.725)
          return cpd.toFixed(2)
        }
        else if (this.state.activityLevel === "extra") {
          let cpd = (bmr * 1.9)
          return cpd.toFixed(2)
        }
      }

      else {
        if (this.state.activityLevel === "little") {

          let cpd = ((bmr * 1.2) + (bmr * 0.15));

          return cpd.toFixed(2)
        }
        else if (this.state.activityLevel === "light") {
          let cpd = ((bmr * 1.375) + (bmr * 0.15))
          return cpd.toFixed(2)
        }
        else if (this.state.activityLevel === "moderate") {
          let cpd = ((bmr * 1.55) + (bmr * 0.15))
          return cpd.toFixed(2)
        }

        else if (this.state.activityLevel === "very") {
          let cpd = ((bmr * 1.725) + (bmr * 0.15))
          return cpd.toFixed(2)
        }
        else if (this.state.activityLevel === "extra") {
          let cpd = ((bmr * 1.9) + (bmr * 0.15))
          return cpd.toFixed(2)
        }
      }

    }
  }

  handleSave = (event) => {
    const { name, checked } = event.target;

    this.setState((prevState) => {
      let save = prevState.save;
      save[name] = checked;
      return save;

    });

  };
  saveData() {
    let bmr = this.getBMR();
    if ((this.getCalPerDay(bmr)) && (this.state.save.clicked === true)) {
      const decodedToken = localStorage.getItem('decodedTokenID')
      console.log("TOKEN DECODED", decodedToken)
      const newData = {
        userId: decodedToken,
        weight: this.state.weight,
        bmi: this.calculateBMI(),
        bmr: this.getBMR(),
        cpd: this.getCalPerDay(bmr)
      };
      console.log(newData);

      axios.post('/api/data', newData)
        .then(res => console.log(res))
        .then(alert("Your information has been saved! you may continue"))
    }
    else if (this.state.clicked === true) {
      alert("all fields required")
    }
  }

  render() {

    let bmi = this.calculateBMI();
    let results = this.getBMIResults(bmi);
    let bmr = this.getBMR();
    let cpd = this.getCalPerDay(bmr);



    return (
     <>
     <Navbar />
      <div className="BMI">
        <div className="BMI-container">
          <div className="title">
            <h1>Your Journey Begins Here!</h1>
            <p>Enter your information below.</p>
          </div>
          <div className="user-input">
            <form>
              <div className="form-group">
                <legend>Current Weight</legend>
                <div className="">
                  <div className="col-xs-12">
                    <input className="form-control" id="bmiWeight" type="number" min="1" max="1000" value={this.state.weight} onChange={this.handleWeightChange} />
                    <label className="control-label" htmlFor="bmiWeight">lb</label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <legend>Height</legend>
                <div className="">
                  <div className="col-xs-6">
                    <input className="form-control" id="bmiHeightFeet" type="number" min="1" max="12" value={this.state.heightFeet} onChange={this.handleHeightFeetChange} />
                    <label className="control-label" htmlFor="bmiHeightFeet">ft</label>
                  </div>
                  <div className="col-xs-6">
                    <input className="form-control" id="bmiHeightInch" type="number" min="0" max="12" value={this.state.heightInch} onChange={this.handleHeightInchChange} />
                    <label className="control-label" htmlFor="bmiHeightInch">in</label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <legend>Activity Level</legend>
                <div className="">
                  <div className="col-xs-12">
                    <select value={this.state.activityLevel} onChange={this.handleActivityLevelChange}>
                      <option default>Select Your Activity Level</option>
                      <option name="little" value="little">Little/no exercise</option>
                      <option name="light" value="light">Light exercise</option>
                      <option name="moderate" value="moderate">Moderate exercise (3-5days/week)</option>
                      <option name="very" value="very">Very active (6-7 days/week)</option>
                      <option name="extra" value="extra">Extra active (very active and physical job)</option>
                    </select>
                  </div>
                </div>


                <div className="form-group">
                  <legend>Gender</legend>
                  <div className="">
                    <div className="col-xs-6">
                      <select value={this.state.gender} onChange={this.handleGenderChange}>
                        <option default>Select Your Gender</option>
                        <option name="male"> Male</option>
                        <option name="female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <legend> Age</legend>
                  <div className="">
                    <div className="col-xs-6">
                      <input className="form-control" id="age" type="number" min="1" max="1000" value={this.state.age} onChange={this.handleAgeChange} />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <legend>Weight Goal</legend>
                  <div className="">
                    <div className="col-xs-12">
                      <select value={this.state.goalWeight} onChange={this.handleGoalWeightChange} >
                        <option default>Select Your Weight Goal</option>
                        <option name="gain" value="gain"> Maintain/Gain Weight</option>
                        <option name="lose" value="lose">Lose Weight</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>
            </form>
          </div>

          <div className="bmi-stats">
            <BmiDisplay bmi={bmi} cpd={cpd} bmr={bmr} label={results.label} alertClass={results.alertClass} />
          </div>
          <div className="buttons">
            <br />
            <p>Please verify all information is corrrect for accuracy</p>
            <input className="form-check-input" checked={this.state.save.clicked} onChange={this.handleSave} onClick={this.saveData()} type="checkbox" name="clicked" />
            <label className="form-check-label">Save My information</label>
            <button id="filterBtnThree" className="btn btn-default filter-button">
              <Link to={"/DietPref"}>Continue to dietary preferences</Link></button>
          </div>
        </div>
      </div>
      <Footer />
       </>

    );
  }
}

function BmiDisplay(props) {
  return (

    <div className="container">
      <div className={"bmi-result alert " + props.alertClass}>
        <div> BMI Results: {props.bmi || '--.-'}</div>
        <div>{props.label}</div>
        <div>BMR Resluts: {props.bmr} </div>
        <div>Suggested Calories Per Day: {props.cpd}</div>
      </div>
      <div className >
        <p><strong>What is Basal Metabolic Rate (BMR)?</strong> <br />
The Basal Metabolic Rate (BMR) estimates not just the amount of calories you burn off when inactive,
but also the daily calorie number which accounts for your lifestyle activity level. Providing you representation for your everyday calorie consumption. </p>

        <img className="image" src={BmiChart} alt="BMI chart" />
      </div>
    </div>

  )

}




