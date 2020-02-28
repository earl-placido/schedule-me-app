import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types'; 

import { loginGoogle } from '../../../actions/components/screens/Login.action';

export class Login extends Component {
	constructor(props) {
		super(props);

		this.googleLogin = this.googleLogin.bind(this);
	}

	googleLogin(response) {
		this.props.loginGoogle(response);
	}

	render() {
		if (this.props.isAuthenticated) {
			const { from } = this.props.location.state || { from: { pathname: '/' } };
			return <Redirect to={from} />;
		}

		return (
			<div>
				<GoogleLogin
					clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
					buttonText="Login"
					onSuccess={this.googleLogin}
					onFailure={this.onFailure}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
	loginGoogle: response => dispatch(loginGoogle(response))
});

Login.propTypes = {
	loginGoogle: PropTypes.func,
	isAuthenticated: PropTypes.any
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);