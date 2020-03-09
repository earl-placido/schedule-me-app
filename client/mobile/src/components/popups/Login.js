import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Button, Text, Card} from 'native-base';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import t from 'tcomb-form-native';
import Config from 'react-native-config';

import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import {
  loginGoogle,
  loginUser,
} from '../../actions/components/screens/Auth.action';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

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
  };

  toggleLogin = () => {
    this.setState({isLoginVisible: !this.state.isLoginVisible});
  };

  googleLogin = () => {
    GoogleSignin.signIn().then(() => {
      GoogleSignin.getTokens().then(response => {
        this.props.loginGoogle(response);
      });
    });
  };

  userLogin = () => {
    const value = this.form.getValue();
    if (value) {
      this.props.loginUser(value.email, value.password);
    }
  };

  render() {
    return (
      <View>
        <Button large style={styles.buttonStyle} onPress={this.toggleLogin}>
          <Text>Log in</Text>
        </Button>

        <Modal
          isVisible={this.state.isLoginVisible}
          onBackdropPress={this.toggleLogin}>
          <Card style={styles.modalStyle}>
            <View style={styles.googleButtonStyle}>
              <GoogleSigninButton
                style={styles.googleButtonStyle}
                size={GoogleSigninButton.Size.Standard}
                onPress={() => {
                  this.googleLogin();
                  this.props.navigation.navigate('CreateGroup');
                  this.toggleLogin();
                }}
              />
              <Text>or</Text>
            </View>

            <Form
              ref={_form => (this.form = _form)}
              options={userOptions}
              type={user}
            />

            <Button
              transparent
              onPress={() => {
                this.userLogin();
                this.props.navigation.navigate('CreateGroup');
                this.toggleLogin();
              }}>
              <Text>Submit</Text>
            </Button>
          </Card>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalStyle: {
    padding: 20,
  },
  buttonStyle: {
    justifyContent: 'center',
    marginVertical: 25,
    marginHorizontal: 50,
  },
  googleButtonStyle: {
    alignItems: 'center',
    marginBottom: 10,
  },
});

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.userName,
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
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Login);
