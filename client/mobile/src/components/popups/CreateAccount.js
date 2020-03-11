import React, {Component} from 'react';
import {StyleSheet, ToastAndroid} from 'react-native';
import {View, Button, Text, Card, Spinner} from 'native-base';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import t from 'tcomb-form-native';

import {signupUser} from '../../actions/components/screens/Auth.action';
import {connect} from 'react-redux';

const Form = t.form.Form;

const userOptions = {
  fields: {
    firstName: {
      error: 'Please input first name',
    },
    lastName: {
      error: 'Please input last name',
    },
    email: {
      error: 'Please input email',
    },
    password: {
      error: 'Please input password',
      password: true,
      secureTextEntry: true,
    },
    confirmPassword: {
      error: 'Please confirm password',
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
      ToastAndroid.show(this.props.message, ToastAndroid.SHORT);
      this.props.navigation.navigate('CreateGroup');
      this.toggleCreate();
    } else {
      if (this.props.message.errors) {
        ToastAndroid.show(this.props.message.errors[0].msg, ToastAndroid.SHORT);
      } else if (this.props.message.err) {
        ToastAndroid.show(this.props.message.err, ToastAndroid.SHORT);
      } else if (this.props.message) {
        ToastAndroid.show(this.props.message, ToastAndroid.SHORT);
      }
    }
  };

  render() {
    return (
      <View>
        <Button large style={styles.buttonStyle} onPress={this.toggleCreate}>
          <Text>Create Account</Text>
        </Button>

        <Modal
          isVisible={this.state.isCreateVisible}
          onBackdropPress={this.toggleCreate}>
          <Card style={styles.modalStyle}>
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
            <Button
              transparent
              onPress={() => {
                this.userSignup();
              }}>
              <Text>Submit</Text>
              {this.state.isSpinnerVisible && <Spinner color="blue" />}
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
