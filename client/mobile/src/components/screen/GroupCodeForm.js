import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Container, Content, Button, View} from 'native-base';

import PropTypes from 'prop-types';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const codeOptions = {
  fields: {
    code: {
      error: 'Please input a code number',
    },
  },
};

const codeModel = t.struct({
  code: t.String,
});

export default class GroupCodeForm extends Component {
  handleOnChangeValue = () => {
    this.form.getValue();
  };

  handleOnSubmit = () => {
    const value = this.form.getValue();
    if (value) {
      this.props.navigation.navigate('Group Detail', {codeNum: value.code});
    }
  };

  render() {
    return (
      <Container>
        <View style={styles.titleStyle}>
          <Text style={{fontWeight: 'bold', fontSize: 25}}>
            Enter Group Code{' '}
          </Text>
        </View>
        <Content padder style={{flex: 1}}>
          <Form
            ref={_form => (this.form = _form)}
            options={codeOptions}
            type={codeModel}
            onChange={this.handleOnChangeValue}
            value={{
              code: this.props.code,
            }}
          />
        </Content>
        <View style={styles.buttonStyle}>
          <Button
            onPress={this.handleOnSubmit}
            style={styles.insideButtonStyle}>
            <Text style={{color: 'white'}}> Continue </Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 20,
    alignItems: 'center',
    flex: 3,
  },
  insideButtonStyle: {
    padding: 15,
    alignItems: 'center',
  },
  titleStyle: {
    padding: 20,
    alignItems: 'center',
  },
});

GroupCodeForm.propTypes = {
  handleCodeValue: PropTypes.func,
  code: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
