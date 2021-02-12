import axios from 'axios';
import React from 'react';
import Navbar from '../Nav2';
import './style.css';


class SeeData extends React.Component 
{
    constructor(props){
        super(props);
        this.state = {
            weight: "",
            data: [] 
        }
    }
    

    componentDidMount(){
        const decodedToken = localStorage.getItem('decodedTokenID')
        let userId = decodedToken;
        axios.get(`/api/data/${userId}`)
        .then( res  => {
            this.setState({
                data: res.data
            });
            console.log(res)
        })
        .catch((err) => {})
        }
    
      render () {
      const child = this.state.data.map((
          el, index) => {
            return <table>
            <thead>
                <tr className="col">
                <th scope="col">Date Updated</th>
                <th scope="col">Weight</th>
                <th scope="col">BMI</th>
                <th scope="col">BMR</th>
                <th scope="col">Suggested Calories Per Day</th>
                </tr>
            </thead>
            <tbody>
            <tr key={index}>
                <td>{el.date}</td>
                <td> {el.weight}</td>
                <td>
                     {el.bmi}
                </td>
                <td> {el.bmr}</td>
                <td> {el.cpd}</td>
               </tr>
               </tbody>
            </table>
          
      })
        return(
            <>
            <Navbar />
             <div className="container">
                <div>{child}</div>
            </div>
            </>
        )
  
        }
    }
       



export default SeeData;