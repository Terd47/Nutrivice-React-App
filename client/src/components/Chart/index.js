import React, { Component, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';



export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: ["M", "T", "W", "T", "F", "S", "S"],
                datasets: [
                    {   label: "Week One",
                        data: [],
                        borderColor: ['#2d6a4f'],
                        backgroundColor: ['#52B788'],
                        pointBackgroundColor: '#D8F3dC',
                        pointBorderColor: '#081c15'
                    },
                    {
                        label: 'Week Two',
                        data: [155, 158, 163, 168, 165, 168, 170],
                        borderColor: ['#2d6a4f'],
                        backgroundColor: ['#52B788'],
                        pointBackgroundColor: '#D8F3dC',
                        pointBorderColor: '#081c15'
                     },
                ]
            }
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        axios.get('/api/data')
        .then(res => {
            
            this.setState(prevState => {
                let data = Object.assign({}, prevState.data);
                data.labels = res.data.date;
                data.dataSets.data = res.data.dataSets.data;
                return { data };
            })

        }).catch(err =>{
            console.log(err)
        })
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
    }



    getChartData = canvas => {
        const data = this.state.data;
        return data
    }

     addData(chart) {
        chart.data.labels.push(this.state.label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(this.state.data);
        });
        chart.update();
    }

    render() {
        return (
            
            <div style={{ position: "relative" }}>
                <h3>Progress</h3>
            
                <form>
                <input  className="form-control" value={this.state.data.datasets.data} placeholder="Weight" />
                <input  className="form-control" value={this.state.labels} placeholder="Day" />
               
                </form>
                <Line
                    options={{
                        title:{
                            display: true,
                            text: 'Progress'
                        },
                        scales: {
                            yAxes:[
                                {
                                    ticks: {
                                        min: 0,
                                        stepsize: 10,
                                        callback: function(value, index, values) {
                                            return value + ' lbs'
                                        }
                                    }
                                }
                            ]
                        },

                        responsive: true,


                    }}
                    data={this.getChartData}
                />
            </div>
        )
    }
}

// export default function Chart() {
//     const [chartData, getChartData] = useState({});
//     const [userWeight, getUserWeight] = useState([]);
//     const [currentDay, getCurrentDay] = useState([]);
//     let data = [];
//     let options = [];

//     useEffect(() =>{
//         document.title = {Progress}
//     })

//     const Progress = async () => {
//         axios.get('/api/data')
//             .then(res => {
//                 console.log(res)
//                 const userData = res.slice();
//                 userData.sort(function (a, b) {
//                     var c = new Date(a.date);
//                     var d = new Date(b.date);
//                     return d - c;
//                 })
//                 const userLatest =
//                 {
//                     weight: userData[0].weight,
//                     date: userData[0].date
//        }
//                 console.log(userLatest, "GET DATA")
//                 console.log(userData)

//                 data = {
//                     labels: userData.date,
//                     datasets: [
//                         {
//                             label: 'Week One',
//                             data: userData.weight,
//                             borderColor: '#2d6a4f',
//                             backgroundColor: '#52B788',
//                             pointBackgroundColor: '#D8F3dC',
//                             pointBorderColor: '#081c15'
//                         }
//                         //  {
//                         //     label: 'Week Two',
//                         //     data: [155, 158, 163, 168, 165, 168, 170],
//                         //     borderColor: ['#2d6a4f'],
//                         //     backgroundColor: ['#52B788'],
//                         //     pointBackgroundColor: '#D8F3dC',
//                         //     pointBorderColor: '#081c15'
//                         //  },

//                     ]
//                 }

//                 options = {
//                     title: {
//                         display: true,
//                         text: 'Progress'
//                     },
//                     scales: {
//                         yAxes: [
//                             {
//                                 ticks: {
//                                     min: 0,
//                                     stepsize: 10,
//                                     callback: function (value, index, values) {
//                                         return value + ' lbs'
//                                     }
//                                 }
//                             }
//                         ]
//                     }
//                 }

//             }
//             )
//     }
//     return (
//         <Line data={data} options={options} />
//     )

// }





