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
      error: 'Please input name',
    },
    email: {
      error: 'Please input email',
    },
    password: {
      error: 'Please input password',
    },
  },
};

const user = t.struct({
  username: t.String,
  email: t.String,
  password: t.String,
});

export default class CreateAccount extends Component {
  state = {
    isCreateVisible: false,
  };

  toggleCreate = () => {
    this.setState({isCreateVisible: !this.state.isCreateVisible});
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

CreateAccount.propTypes = {
  navigation: PropTypes.any,
  navigate: PropTypes.func,
};
