import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

export default class LoginGoogle extends Component {

    //NOTE: need to move once redux is set up
    constructor() {
        super();
        this.state = { isAuthenticated: false, user: null, token: ''};
    }

    logout() {
        this.setState( { isAuthenticated: false, token: '', user: null} )
    }

    onFailure(error){
        alert(error);
    }

    googleResponse(response) {
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/auth/google`, options).then(res => {
            const token = res.headers.get('x-auth-token');
            res.json().then(user => {
                if (token) {
                    this.setState({isAuthenticated: true, user, token})
                }
            });
        })
    }

    render() {
        let content = this.state.isAuthenticated ?
                (
                    // Should move in a separate file once redux is setup
                    <GoogleLogout
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Logout"
                        onLogoutSuccess={this.logout.bind(this)}
                    />
                ) :
                (
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        onSuccess={this.googleResponse.bind(this)}
                        onFailure={this.onFailure}
                    />
                );

            return (content);
    }
}