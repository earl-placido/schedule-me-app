import { Button } from "antd";
import Icon from "@ant-design/icons";
import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { withRouter, Redirect } from "react-router";
import PropTypes from "prop-types";

import { authenticate } from "../../actions/Auth.action";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.renderGoogleButton = this.renderGoogleButton.bind(this);
    this.state = { signUpSelected: false };
  }

  loginWithGoogle(response) {
    this.props.authenticate("google", response);
  }

  renderGoogleButton(text) {
    return (
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={renderProps => (
          <Button
            className="google-button"
            onClick={renderProps.onClick}
            style={{ width: "100%", marginBottom: 20, marginTop: 10 }}
            size="large"
          >
            <Icon type="google" style={{ color: "rgb(52,168,83)" }} />
            {text}
          </Button>
        )}
        buttonText={text}
        onSuccess={this.loginWithGoogle}
        onFailure={this.onFailure}
      />
    );
  }

  render() {
    return (
      <div className="form-wrapper">
        {this.props.isAuthenticated && this.props.location.pathname === "/" ? (
          <Redirect to="/main" />
        ) : null}

        {!this.state.signUpSelected ? (
          <div>
            <LoginForm />
            {this.renderGoogleButton("Login with Google")}

            <p>
              Don&lsquo;t have an account?
              <Button
                className="signup-toggle"
                type="link"
                onClick={() => {
                  this.setState({ signUpSelected: true });
                }}
              >
                Sign Up
              </Button>
            </p>
          </div>
        ) : (
          <div>
            <SignupForm />

            {this.renderGoogleButton("Sign Up with Google")}

            <p>
              Have an account?
              <Button
                className="login-toggle"
                type="link"
                onClick={() => {
                  this.setState({ signUpSelected: false });
                }}
              >
                Log In
              </Button>
            </p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  authenticate: (type, data) => dispatch(authenticate(type, data))
});

LoginComponent.propTypes = {
  authenticate: PropTypes.func,
  location: PropTypes.any,
  isAuthenticated: PropTypes.any
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(LoginComponent);
