import React, { Component } from 'react';
import { View } from 'react-native';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import GroupInfoForm from '../groups/CreateGroup/GroupInfoForm'
import GroupMeetingForm from '../groups/CreateGroup/GroupMeetingForm'

import PropTypes from 'prop-types';
import {updateGroupName, updateGroupDescription, updateGroupDuration, updateGroupFrequency, updateGroupLocation} from '../../actions/components/screens/CreateGroup.action';
import {connect} from 'react-redux';

const progressStepsStyle = {
  activeStepIconBorderColor: '#686868',
  activeLabelColor: '#686868',
  activeStepNumColor: 'white',
  activeStepIconColor: '#686868',
  completedStepIconColor: '#686868',
  completedProgressBarColor: '#686868',
  
};

const buttonTextStyle = {
  color: '#686868',
  fontWeight: 'bold'
};

const hideButton = {
  display: 'none'
};

const defaultScrollViewProps = {
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center'
  },
};

class CreateGroup extends Component {
  render() {
    return (
      <View style={{ flex: 10}}>
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
                label = "Group"
                onNext={this.onNextStep}
                previousBtnDisabled
                nextBtnDisabled={!this.props.groupName}
                scrollViewProps={defaultScrollViewProps}
                nextBtnTextStyle={buttonTextStyle}
                previousBtnTextStyle={buttonTextStyle}
              >
                <GroupInfoForm
                  handleGroupName={this.props.updateGroupName} 
                  handleGroupDescription={this.props.updateGroupDescription} 
                  groupName={this.props.groupName}
                  groupDescription={this.props.groupDescription}
                />
          </ProgressStep>   
          
          <ProgressStep
            label = "Meeting"
            nextBtnText = "Done"
            onNext={this.onNextStep}
            onPrevious={this.onPrevStep}
            nextBtnDisabled={!this.props.groupDuration}
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
          >
            <GroupMeetingForm
              handleGroupDuration={this.props.updateGroupDuration} 
              handleGroupFrequency={this.props.updateGroupFrequency} 
              handleGroupLocation={this.props.updateGroupLocation}
              groupDuration={this.props.groupDuration}
              groupFrequency={this.props.groupFrequency}
              groupLocation={this.props.groupLocation}
            />
          </ProgressStep>

          <ProgressStep
            label = "Share"
            finishBtnText = "Continue"
            onSubmit={this.onSubmitSteps}
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnStyle={hideButton}
            previousBtnStyle={hideButton}
          >
          </ProgressStep>
        </ProgressSteps>
      </View>
    );
  }
}

const mapStateToProps = ({ CreateGroupReducer }) => {
  const { groupName, groupDescription, groupDuration, groupFrequency, groupLocation } = CreateGroupReducer;
  return {groupName, groupDescription, groupDuration, groupFrequency, groupLocation};
};

CreateGroup.propTypes = {
  groupName: PropTypes.any,
  groupDescription: PropTypes.any,
  groupDuration: PropTypes.any,
  groupFrequency: PropTypes.any,
  groupLocation: PropTypes.any,
  updateGroupName: PropTypes.func,
  updateGroupDescription: PropTypes.func,
  updateGroupDuration: PropTypes.func,
  updateGroupFrequency: PropTypes.func,
  updateGroupLocation: PropTypes.func,
};

export default connect(mapStateToProps, {updateGroupName, updateGroupDescription, updateGroupDuration, updateGroupFrequency, updateGroupLocation})(CreateGroup);
