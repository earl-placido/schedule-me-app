import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Container, Content, Button, View, CardItem, Body} from 'native-base';

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
    //To do: Once the server is connected, will do a check to see if the group code exists
  };

  render() {
    return (
      <Container>
        <View>
          <CardItem header boardered>
            <Body style={{alignItems: 'center'}}>
              <Text style={({fontWeight: 'bold'}, {fontSize: 20})}>
                Enter Group Code
              </Text>
            </Body>
          </CardItem>
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
  titleTextStyle: {
    fontWeight: 'bold',
    fontSize: 25,
  },
});

GroupCodeForm.propTypes = {
  handleCodeValue: PropTypes.func,
  code: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};