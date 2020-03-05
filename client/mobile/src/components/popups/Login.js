import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Button, Text, Card} from 'native-base';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const userOptions = {
  fields: {
    username: {
      error: 'Please input username',
    },
    password: {
      error: 'Please input password',
    },
  },
};

const user = t.struct({
  username: t.String,
  password: t.String,
});

export default class Login extends Component {
  state = {
    isLoginVisible: false,
  };

  toggleLogin = () => {
    this.setState({isLoginVisible: !this.state.isLoginVisible});
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
            <Button style={styles.buttonStyle}>
              <Text>Google Sign In</Text>
            </Button>

            <Form
              ref={_form => (this.form = _form)}
              options={userOptions}
              type={user}
            />
            
            <Button
              transparent
              onPress={() => {
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
});

Login.propTypes = {
  navigation: PropTypes.any,
  navigate: PropTypes.func,
};
