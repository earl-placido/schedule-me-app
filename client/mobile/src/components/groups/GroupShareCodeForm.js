import React, {Component} from 'react';
import {Content, Button, Text, Toast} from 'native-base';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import t from 'tcomb-form-native';
import {Clipboard, StyleSheet} from 'react-native';

const Form = t.form.Form;

const codeOptions = {
  fields: {
    code: {
      editable: false,
      label:
        'Your group has been created! \n\nShare this code for others to join the group:',
    },
  },
};

const CodeForm = t.struct({
  code: t.String,
});

class GroupShareCodeForm extends Component {
  copyCode = () => {
    Clipboard.setString(this.props.meetingCode);
    Toast.show({
      text: "Code copied to your clipboard!"
    });
  };

  goToGroup = () => {
    this.props.navigation.push('Group Detail', {
      codeNum: this.props.meetingCode,
    });
    this.props.navigation.navigate('Group Detail');
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

        <Button
          small
          block
          style={{alignSelf: 'center', width: 200, margin: 10}}
          onPress={() => this.copyCode()}>
          <Text style={styles.buttonText}>Copy Code</Text>
        </Button>

        <Button
          small
          block
          style={{alignSelf: 'center', width: 200, margin: 20}}
          onPress={() => this.goToGroup()}>
          <Text style={styles.buttonText}>Go to Group</Text>
        </Button>
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
});

GroupShareCodeForm.propTypes = {
  meetingCode: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, {})(GroupShareCodeForm);
