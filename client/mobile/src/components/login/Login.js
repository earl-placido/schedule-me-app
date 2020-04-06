import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Button, Text, Spinner, Toast} from 'native-base';
import PropTypes from 'prop-types';
import t from 'tcomb-form-native';
import Config from 'react-native-config';

import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import {loginGoogle, loginUser} from '../../actions/Auth.action';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Divider from '../styles/Divider';
import {Alert} from 'react-native';

GoogleSignin.configure({
  webClientId: Config.REACT_APP_GOOGLE_CLIENT_ID,
  offlineAccess: true,
});

const Form = t.form.Form;

const userOptions = {
  fields: {
    email: {
      error: 'Please input email',
    },
    password: {
      error: 'Please input password',
      password: true,
      secureTextEntry: true,
    },
  },
};

const user = t.struct({
  email: t.String,
  password: t.String,
});

class Login extends Component {
  state = {
    isLoginVisible: false,
    isSpinnerVisible: false,
    isSigninInProgress: false,
  };

  toggleLogin = () => {
    this.setState({isLoginVisible: !this.state.isLoginVisible});
  };

  toggleSpinner = () => {
    this.setState({isSpinnerVisible: !this.state.isSpinnerVisible});
  };

  toggleSignInProgress = () => {
    this.setState({isSigninInProgress: !this.state.isSigninInProgress});
  };

  showToast = message => {
    Toast.show({
      text: message,
      buttonText: 'OK',
      duration: 3000,
    });
  };

  googleLogin = () => {
    GoogleSignin.signIn()
      .then(() => {
        this.toggleSignInProgress();
        GoogleSignin.getTokens().then(response => {
          this.props.loginGoogle(response);
          setTimeout(() => {
            this.attemptLogin();
          }, 3000);
        });
      })
      .catch(() => {
        Alert.alert('Cannot connect to google login');
      });
  };

  userLogin = () => {
    const value = this.form.getValue();
    if (value) {
      this.props.loginUser(value.email, value.password);
      this.toggleSignInProgress();

      setTimeout(() => {
        this.attemptLogin();
        this.toggleSpinner();
      }, 1000);
      this.toggleSpinner();
    }
  };

  attemptLogin = () => {
    if (this.props.isAuthenticated) {
      this.showToast(this.props.message);
      this.props.navigation.navigate('Drawer');
      this.toggleLogin();
    } else {
      if (this.props.message.errors) {
        this.showToast(this.props.message.errors[0].msg);
      } else if (this.props.message.err) {
        this.showToast(this.props.message.err);
      } else {
        this.showToast(this.props.message);
      }
    }
    this.toggleSignInProgress();
  };

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={_form => (this.form = _form)}
          options={userOptions}
          type={user}
          value={{
            email: this.props.loginFields.email,
            password: this.props.loginFields.password,
          }}
        />

        <Button
          disabled={this.state.isSigninInProgress}
          small
          block
          primary
          onPress={() => this.userLogin()}
          accessibilityLabel={'LoginButton'}>
          <Text>Log In</Text>
          {this.state.isSpinnerVisible && <Spinner color="white" />}
        </Button>

        <View>
          <Divider message="or"></Divider>
          <View style={styles.googleContainer}>
            <GoogleSigninButton
              disabled={this.state.isSigninInProgress}
              style={styles.googleButton}
              size={GoogleSigninButton.Size.Wide}
              onPress={() => {
                this.googleLogin();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  googleContainer: {
    alignItems: 'center',
  },
  googleButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.userName,
  message: state.auth.message,
  loginFields: state.auth.loginFields,
});

const mapDispatchToProps = dispatch => ({
  loginGoogle: response => dispatch(loginGoogle(response)),
  loginUser: (email, password) => dispatch(loginUser(email, password)),
});

Login.propTypes = {
  navigation: PropTypes.any,
  navigate: PropTypes.func,
  loginGoogle: PropTypes.func,
  loginUser: PropTypes.func,
  isAuthenticated: PropTypes.any,
  message: PropTypes.any,
  loginFields: PropTypes.any,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Login);
