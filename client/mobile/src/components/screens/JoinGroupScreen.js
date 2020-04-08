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

import {getGroup} from '../../actions/GetGroup.action';
import {addGroupMember} from '../../actions/AddGroupMember.action';

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
    //  Currently only checking if there is a value.
    //  Could change this in the future if codes require a certain format
    const value = this.form.getValue();
    if (value) {
      this.props.getGroup(value.code);
      this.props.addGroupMember(value.code);
      this.toggleSpinner();

      // Timeout created to ensure enough time is given for the server to retrieve information and update local variables
      setTimeout(() => {
        this.toggleSpinner();
        this.findGroup(value);
      }, 2000);
    }
  };

  toggleSpinner = () => {
    this.setState({isSpinnerVisible: !this.state.isSpinnerVisible});
  };

  findGroup = value => {
    if (this.props.getGroupErrored) {
      Alert.alert(
        'The group code does not exist.\nPlease try a different code.',
      );
    } else {
      this.addGroupMember(value);
    }
  };

  addGroupMember = value => {
    if (this.props.addGroupMemberErrored) {
      Alert.alert('There was an error.\nYou were unable to join the group.');
      console.log("The group exists but the user wasn't able to join.");
    } else {
      if (this.props.groupMemberId <= 0) {
        Alert.alert('You are already in this group!');
      } else {
        Alert.alert(
          'You have successfully joined ' + this.props.group.GroupName + '!',
          '',
          [
            {text: 'Close'},
            {
              text: 'Go To Group',
              onPress: () => {
                this.props.navigation.push('Group Detail', {
                  codeNum: value.code,
                });
                this.props.navigation.navigate('Group Detail');
              },
            },
          ],
          {cancelable: true},
        );
      }
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

const mapStateToProps = ({GetGroupReducer, AddGroupMemberReducer}) => {
  const group = GetGroupReducer.group;
  const getGroupErrored = GetGroupReducer.errored;
  const groupMemberId = AddGroupMemberReducer.groupMemberId;
  const addGroupMemberErrored = AddGroupMemberReducer.errored;
  return {group, getGroupErrored, groupMemberId, addGroupMemberErrored};
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
    push: PropTypes.func.isRequired,
  }).isRequired,
  group: PropTypes.any,
  getGroupErrored: PropTypes.bool,
  getGroup: PropTypes.func,
  groupMemberId: PropTypes.any,
  addGroupMember: PropTypes.func,
  addGroupMemberErrored: PropTypes.bool,
};

export default connect(mapStateToProps, {getGroup, addGroupMember})(
  GroupCodeForm,
);
