import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Button, Text, Card} from 'native-base';
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
    },
    confirmPassword: {
      error: 'Please confirm password',
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
  };

  toggleCreate = () => {
    this.setState({isCreateVisible: !this.state.isCreateVisible});
  };

  userSignup = () => {
    const value = this.form.getValue();
    this.props.signupUser(
      value.firstName,
      value.lastName,
      value.email,
      value.password,
      value.confirmPassword,
    );
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
            />
            <Button
              transparent
              onPress={() => {
                this.userSignup();
                this.props.navigation.navigate('CreateGroup');
                this.toggleCreate();
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
});

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.userName,
});

const mapDispatchToProps = dispatch => ({
  signupUser: (firstName, lastName, email, password, confirmPassword) =>
    dispatch(signupUser(firstName, lastName, email, password, confirmPassword)),
});

CreateAccount.propTypes = {
  navigation: PropTypes.any,
  navigate: PropTypes.func,
  signupUser: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
