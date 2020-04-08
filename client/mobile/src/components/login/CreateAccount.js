import React, {Component} from 'react';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {
  View,
  Button,
  Text,
  Card,
  Spinner,
  Toast,
  Left,
  Right,
} from 'native-base';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import t from 'tcomb-form-native';

import {signupUser} from '../../actions/components/Auth.action';
import {connect} from 'react-redux';

const Form = t.form.Form;

const userOptions = {
  fields: {
    firstName: {
      autoFocus: true,
      error: 'Please enter your first name',
    },
    lastName: {
      error: 'Please enter your last name',
    },
    email: {
      error: 'Please enter a valid email address',
      keyboardType: 'email-address',
      textContentType: 'emailAddress',
    },
    password: {
      error: 'Please enter a password',
      password: true,
      secureTextEntry: true,
    },
    confirmPassword: {
      error: 'Please confirm your password',
      password: true,
      secureTextEntry: true,
    },
  },
};

const user = t.struct({
  firstName: t.String,
  lastName: t.String,
  email: t.String,
  password: t.String,
  confirmPassword: t.String,
});

class CreateAccount extends Component {
  state = {
    isCreateVisible: false,
    isSpinnerVisible: false,
  };

  toggleCreate = () => {
    this.setState({isCreateVisible: !this.state.isCreateVisible});
  };

  toggleSpinner = () => {
    this.setState({isSpinnerVisible: !this.state.isSpinnerVisible});
  };

  showToast = message => {
    Toast.show({
      text: message,
      buttonText: 'OK',
      duration: 3000,
    });
  };

  userSignup = () => {
    const value = this.form.getValue();
    if (value) {
      this.props.signupUser(
        value.firstName,
        value.lastName,
        value.email,
        value.password,
        value.confirmPassword,
      );
      setTimeout(() => {
        this.attemptSignup();
        this.toggleSpinner();
      }, 1000);
      this.toggleSpinner();
    }
  };

  attemptSignup = () => {
    if (this.props.isAuthenticated) {
      this.showToast(this.props.message);
      this.props.navigation.navigate('Drawer');
      this.toggleCreate();
    } else {
      let message;
      if (this.props.message.errors) {
        message = this.props.message.errors[0].msg;
      } else if (this.props.message.err) {
        message = this.props.message.err;
      } else if (this.props.message) {
        message = this.props.message;
      }

      Alert.alert("Couldn't sign you up\n", message);
    }
  };

  render() {
    return (
      <View style={{margin: 5}}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <View>
            <Text> {"Don't"} have an account? </Text>
          </View>
          <View>
            <Text
              style={{color: '#3F51B5'}}
              onPress={() => this.toggleCreate()}
              accessibilityLabel={'SignupButton'}>
              Sign Up
            </Text>
          </View>
        </View>

        <Modal
          isVisible={this.state.isCreateVisible}
          onRequestClose={() => this.toggleCreate()}
          accessibilityLabel={'CreateAccountModal'}>
          <ScrollView>
            <Card
              style={styles.modalStyle}
              accessibilityLabel={'CreateAccountForm'}>
              <Form
                ref={_form => (this.form = _form)}
                options={userOptions}
                type={user}
                value={{
                  firstName: this.props.signupFields.firstName,
                  lastName: this.props.signupFields.lastName,
                  email: this.props.signupFields.email,
                  password: this.props.signupFields.password,
                  confirmPassword: this.props.signupFields.confirmPassword,
                }}
              />
              <View style={{flexDirection: 'row'}}>
                <Left>
                  <Button
                    small
                    block
                    primary
                    onPress={() => this.toggleCreate()}
                    style={{margin: 10}}>
                    <Text>Cancel</Text>
                  </Button>
                </Left>
                <Right>
                  <Button
                    small
                    block
                    primary
                    onPress={() => this.userSignup()}
                    accessibilityLabel={'SignupSubmitButton'}>
                    <Text>Submit</Text>
                    {this.state.isSpinnerVisible && <Spinner color="white" />}
                  </Button>
                </Right>
              </View>
            </Card>
          </ScrollView>
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
});

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.userName,
  message: state.auth.message,
  signupFields: state.auth.signupFields,
});

const mapDispatchToProps = dispatch => ({
  signupUser: (firstName, lastName, email, password, confirmPassword) =>
    dispatch(signupUser(firstName, lastName, email, password, confirmPassword)),
});

CreateAccount.propTypes = {
  navigation: PropTypes.any,
  navigate: PropTypes.func,
  signupUser: PropTypes.func,
  message: PropTypes.any,
  isAuthenticated: PropTypes.any,
  signupFields: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
