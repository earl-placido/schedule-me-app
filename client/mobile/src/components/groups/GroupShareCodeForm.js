import React, {Component} from 'react';
import {Content} from 'native-base';
import PropTypes from 'prop-types';
import t from 'tcomb-form-native';
import {
  Clipboard,
  Text,
  StyleSheet,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';

const Form = t.form.Form;

const codeOptions = {
  fields: {
    code: {
      editable: false,
      label: 'Your group has been created!  \n\nGroup Code:',
    },
  },
};

const CodeForm = t.struct({
  code: t.String,
});

export default class GroupShareCodeForm extends Component {
  onPress = () => {
    Clipboard.setString(this.props.meetingCode);
    ToastAndroid.show('Code copied to your clipboard!', ToastAndroid.SHORT);
  };

  render() {
    return (
      <Content padder>
        <Form
          ref={_form => (this.form = _form)}
          options={codeOptions}
          type={CodeForm}
          value={{code: this.props.meetingCode}}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.onPress}
          underlayColor="#99d9f4">
          <Text style={styles.buttonText}>Copy Code</Text>
        </TouchableHighlight>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

GroupShareCodeForm.propTypes = {
  meetingCode: PropTypes.any,
};
