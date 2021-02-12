import React from 'react';


export default class Logout extends React.Component {
   constructor() {
        super();
        this.state = {
            token: "",
            jwtToken: "",
            id: "",
            isAuthenticated: true,
            errors: {}
        };
    }

    componentDidMount() {


     
        this.isAuthenticated = false;
        this.user = null;
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('decodedTokenId');
        window.localStorage.removeItem('jwtToken');
    }
}
