import React, {Component} from 'react';

import {StyleSheet, Text} from 'react-native';
import {Container, Content, Button, View} from 'native-base';

import PropTypes from 'prop-types';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const codeOptions = {
  fields: {
    code: {
      error: 'Please input code number',
    },
  },
};

const codeModel = t.struct({
  code: t.String,
});

export default class InputGroupCode extends Component {
  handleOnChangeValue = () => {
    this.form.getValue();
  };
  render() {
    return (
      <Container>
        <View style={styles.titleStyle}>
          <Text style={{fontWeight: 'bold', fontSize: 25}}>
            Enter Group Code
          </Text>
        </View>
        <Content padder>
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

        <View style={{alignItems: 'center'}}>
          <Button onPress={this.handleOnChangeValue} style={styles.buttonStyle}>
            <Text style={{color: 'white'}}> Continue </Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 15,
    alignItems: 'center',
  },
  titleStyle: {
    padding: 20,
    alignItems: 'center',
  },
});

InputGroupCode.propTypes = {
  handleCodeValue: PropTypes.func,
  code: PropTypes.any,
};
