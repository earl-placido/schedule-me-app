import React, {Component} from 'react';
import {Alert, StyleSheet, Text} from 'react-native';
import {
  Spinner,
  Container,
  Content,
  Button,
  View,
  CardItem,
  Body,
} from 'native-base';
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
  state = {
    isSpinnerVisible: false,
  };

  handleOnChangeValue = () => {
    this.form.getValue();
  };

  handleOnSubmit = () => {
    const value = this.form.getValue();
    //  Currently only checking if there is a value.
    //  Could change this in the future if codes require a certain format
    if (value) {
      this.props.getGroup(value.code);
      this.toggleSpinner();
      // Timeout created to ensure enough time is given for the server to retrieve information and update local variables
      setTimeout(() => {
        this.toggleSpinner();
        this.showModal(value);
      }, 2000);
    }
  };

  toggleSpinner = () => {
    this.setState({isSpinnerVisible: !this.state.isSpinnerVisible});
  };

  showModal = value => {
    if (this.props.errored) {
      Alert.alert(
        'The group code does not exist.\nPlease try a different code.',
      );
    } else {
      this.props.navigation.navigate('Group Detail', {codeNum: value.code});
    }
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
            onPress={() => {
              this.handleOnSubmit();
            }}
            style={styles.insideButtonStyle}>
            <Text style={{color: 'white'}}> Continue </Text>
          </Button>
        </View>
        {this.state.isSpinnerVisible && (
          <View style={styles.loading}>
            <Spinner color="white" />
          </View>
        )}
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
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
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