import React, { Component } from 'react';
import { Button } from 'antd';
import Icon from '@ant-design/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { GoogleLogin } from 'react-google-login';
import { withRouter, Redirect } from 'react-router';


import PropTypes from 'prop-types';

import { loginGoogle } from '../../actions/components/screens/Auth.action';


class Login extends Component {
    constructor(props) {
        super(props);
        this.loginUser = this.loginUser.bind(this);
        this.state = { signUpSelected: false }
    }
    
    loginUser(response) {
        this.props.loginGoogle(response); 
	}

    renderGoogleButton(text){
        return(
            <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={renderProps => (
                <Button onClick={renderProps.onClick} style={{width:"100%", marginBottom:20, marginTop:10}} size="large">
                    <Icon type="google" style={{ color: 'rgb(52,168,83)' }} />
                    {text}
                </Button>
            )}
            buttonText={text}
            onSuccess={this.loginUser}
            onFailure={this.onFailure}
        />
        );
    }

    render() {

        return (
            <div>
                {this.props.isAuthenticated && this.props.location.pathname ? (<Redirect to ='/creategroup'/>) : null}

                {!this.state.signUpSelected ? (
                    <div>
                        <LoginForm />
                        {this.renderGoogleButton("Login with Google")}
                        
                        <p>
                            Don&lsquo;t have an account? 
                            <Button type="link" onClick={() => {
                                this.setState({ signUpSelected: true })
                            }}> Sign Up</Button>
                        </p>

                    </div>
                ) : (
                        <div>
                            <SignupForm />

                            {this.renderGoogleButton("Sign Up with Google")}

                            <p>
                                Have an account? <Button type="link" onClick={() => {
                                    this.setState({ signUpSelected: false })
                                }}> Log In</Button>
                            </p>

                            
                        </div>
                    )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    loginGoogle: response => dispatch(loginGoogle(response))
});

Login.propTypes = {
    loginGoogle: PropTypes.func,
    history: PropTypes.any,
    location: PropTypes.any,
    isAuthenticated: PropTypes.any,
};

export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(Login);