import React, {Component} from 'react';
import {Alert, StyleSheet, Text} from 'react-native';
import {Container, Content, Button, View, CardItem, Body} from 'native-base';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import t from 'tcomb-form-native';

import {getGroup} from '../../../actions/screens/GetGroup.action';

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

class GroupCodeForm extends Component {
  handleOnChangeValue = () => {
    this.form.getValue();
  };

  handleOnSubmit = () => {
    const value = this.form.getValue();
    this.props.getGroup(value.code);
    if (value) {
      setTimeout(() => {
        this.showModal();
      }, 2000);
    }
  };

  showModal = () => {
    if (this.props.errored) {
      Alert.alert(
        'The group code does not exist. \nPlease try a different code.',
      );
    } else {
      Alert.alert('valid');
    }
    //this.props.navigation.navigate('Group Detail', {codeNum: value.code});
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

const mapStateToProps = ({GetGroupReducer}) => {
  const {group, errored} = GetGroupReducer;
  return {group, errored};
};

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
  group: PropTypes.any,
  errored: PropTypes.bool,
  getGroup: PropTypes.func,
};

export default connect(mapStateToProps, {getGroup})(GroupCodeForm);
