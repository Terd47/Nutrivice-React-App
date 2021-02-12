import react, { Component } from 'react';
import './style.css';
import Modal from '../Modal';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
          show: false,
          name: this.userID
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

  showModal = () => {
    this.setState({ show: true });
    
    const userID = JSON.parse(localStorage.getItem('decodedToken'));
    console.log(userID.name);
    axios.get('/api/getInfo', userID)
        .then( res => {
            console.log(res);
        })

  }

  hideModal = () => {
    this.setState({ show: false });
  };

   render() {
    return(
        <div className="profile">
           <main>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                <div className="account">
                    <h3 className="display-4 heading">Account Info</h3>
                    <div className="form">
                        <div className="card">
                            <h3>Name: {this.state.name} </h3>
                        </div>
                        <div className="card">
                            <h3>Email: </h3>
                        </div>
                        <div className="card">
                            <h3>Height: </h3>
                        </div>
                        <div className="card">
                            <h3>Weight: </h3>
                        </div>
                        <div className="card">
                            <h3>BMI: </h3>
                        </div>
                        <div className="card">
                            <h3>Allegies: </h3>
                        </div>
                        <div className="card">
                            <h3>Nutrition Type:  </h3>
                        </div>
                    </div>
                </div>
                </Modal>
                <div onClick={this.getInfo}>
                <Link to="#" onClick={this.showModal}> Profile</Link>
                </div>
                {/* <h5  onClick={this.showModal} >Profile</h5> */}
                {/* <button type="text" onClick={this.showModal}>
                    Profile
                </button> */}
            </main>
        </div>
        )
   }
}

export default Profile;