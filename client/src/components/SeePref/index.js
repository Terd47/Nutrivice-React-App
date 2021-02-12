import axios from 'axios';
import React from 'react';
import Navbar from '../Nav2';
import './style.css'

class SeePref extends React.Component 
{
    constructor(props){
        super(props);
        this.state = {
            data: [] 
        }
    }
    

    componentDidMount(){
        const decodedToken = localStorage.getItem('decodedTokenID')
        let userId = decodedToken;
        axios.get(`/api/dataPref/${userId}`)
        .then( res  => {
            this.setState({
                data: res.data,
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
                      <th scope="col">Preferences Saved</th>
                      </tr>
                  </thead>
                  <tbody>
              <tr key={index}>
                  <td>{el.date}</td>
                  <td>{el.preferences}</td>
              </tr>
              </tbody>
              </table>
          
      })
        return (
            <>
            <Navbar />
            <div className="container">
            <div>{child}</div>
            </div>
            </>
        )
        
  
        }

    }
       
  



export default SeePref;