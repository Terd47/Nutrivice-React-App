import React, { Component} from 'react';
import './style.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Nav from './../Nav';
import Footer from '../Footer';
// import 'bootstrap/dist/css/bootstrap.min.css';


class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isAuthenticated: false,
      errors: {}
    };
  }

  componentDidMount() {
    const userInfo = localStorage.getItem("decodedTokenID");
        if(userInfo) {
            // if token exist, redirect to dashboard
            this.props.history.push("/dashboard");
        }
            console.log(userInfo);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

  const userInfo = {
      email: this.state.email,
      password: this.state.password
    };

      axios.post('/api/login', userInfo)
      .then(res => {
        console.log(res);
        const { token } = res.data;
        
        localStorage.setItem('jwtToken', token);
        const decodedToken = jwt_decode(token);
        localStorage.setItem('decodedTokenID', (decodedToken.id))
        console.log(decodedToken.id);
        this.setState({isAuthenticated: true});
        console.log(this.state.isAuthenticated);
        
        
      })
      .then(res => this.props.history.push('/dashboard'))
      .catch(err => {
       console.log(err);
      })
  };

    render() {
      const { errors } = this.state;
      return (
        <>
         <Nav />
        <div className="main">
            <div className="pillar">
              <h1 className="lead brand">
                  Nutri<span className = "highlight">Vice</span>
              </h1>
              <div className = "quote">
                <div className="display-4 quotes">
                  {/* <h3 className="quotes"> Famous quote</h3> */}
                  <h4 className="quotes"> “Healthy eating is a way of life, so it’s important to establish routines that are simple, realistically, and ultimately livable.”</h4>
                  <h6 className="quotes">– Horace</h6>
                </div>
              </div>
                 
              {/* user signin form */}
              <form className="signin" noValidate onSubmit={this.onSubmit}>
              <div className="mb-3
              ">
                 <label htmlFor="email" className="form-label">Email</label>
                 <input type="email" className="form-control" aria-describedby="emailhelp" 
                 onChange={this.onChange}
                 value={this.state.email}
                 error={errors.email}
                 id="email"
                 type="email"
                 />
              </div>
              <div className="mb-3">
                 <label htmlFor="password" className="form-label">Password</label>
                 <input type="password" className="form-control" aria-describedby="emailhelp"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                 />
              </div>
              <button type="submit"  className="btn btn-primary">Signin</button>
              <p className="register grey-text text-darken-1">
                Don't have an account? <a href="/signup">Register</a>
              </p>
            </form>
            {/* sales texts */}
            </div>
             <div>
            
             </div>
  
        </div>
        <Footer />
        </>
      )
    }
}

export default Signin;