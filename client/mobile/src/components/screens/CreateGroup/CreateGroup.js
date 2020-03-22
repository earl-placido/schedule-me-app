import React, {Component} from 'react';
import {View} from 'react-native';

import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import GroupInfoForm from '../../groups/GroupInfoForm';
import GroupMeetingForm from '../../groups/GroupMeetingForm';
import GroupShareCodeForm from '../../groups/GroupShareCodeForm';

import PropTypes from 'prop-types';
import {
  updateGroupName,
  updateGroupDescription,
  updateMeetingDuration,
  updateMeetingFrequency,
  updateMeetingLocation,
  submitMeetingCreation,
} from '../../../actions/screens/CreateGroup.action';
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
  fontWeight: 'bold',
};

const hideButton = {
  display: 'none',
};

const defaultScrollViewProps = {
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
  },
};

class CreateGroup extends Component {
  createNewMeeting = () => {
    //TODO: Change share screen when error is received
    this.props.submitMeetingCreation(
      this.props.groupName,
      this.props.groupDescription,
      this.props.meetingDuration,
      this.props.meetingFrequency,
      this.props.meetingLocation,
    );
  };

  render() {
    return (
      <View style={{flex: 10}}>
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
            label="Group"
            onNext={this.onNextStep}
            previousBtnDisabled
            nextBtnDisabled={!this.props.groupName}
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}>
            <GroupInfoForm
              handleGroupName={this.props.updateGroupName}
              handleGroupDescription={this.props.updateGroupDescription}
              groupName={this.props.groupName}
              groupDescription={this.props.groupDescription}
            />
          </ProgressStep>

          <ProgressStep
            label="Meeting"
            nextBtnText="Done"
            onNext={this.createNewMeeting}
            onPrevious={this.onPrevStep}
            nextBtnDisabled={!this.props.meetingDuration}
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}>
            <GroupMeetingForm
              handleMeetingDuration={this.props.updateMeetingDuration}
              handleMeetingFrequency={this.props.updateMeetingFrequency}
              handleMeetingLocation={this.props.updateMeetingLocation}
              meetingDuration={this.props.meetingDuration}
              meetingFrequency={this.props.meetingFrequency}
              meetingLocation={this.props.meetingLocation}
            />
          </ProgressStep>

          <ProgressStep
            label="Share"
            finishBtnText="Continue"
            onSubmit={this.onSubmitSteps}
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnStyle={hideButton}
            previousBtnStyle={hideButton}>
            <GroupShareCodeForm meetingCode={this.props.meetingCode} />
          </ProgressStep>
        </ProgressSteps>
      </View>
    );
  }
}

const mapStateToProps = ({CreateGroupReducer}) => {
  const {
    groupName,
    groupDescription,
    meetingDuration,
    meetingFrequency,
    meetingLocation,
    meetingCode,
  } = CreateGroupReducer;
  return {
    groupName,
    groupDescription,
    meetingDuration,
    meetingFrequency,
    meetingLocation,
    meetingCode,
  };
};

CreateGroup.propTypes = {
  groupName: PropTypes.any,
  groupDescription: PropTypes.any,
  meetingDuration: PropTypes.any,
  meetingFrequency: PropTypes.any,
  meetingLocation: PropTypes.any,
  meetingCode: PropTypes.any,
  updateGroupName: PropTypes.func,
  updateGroupDescription: PropTypes.func,
  updateMeetingDuration: PropTypes.func,
  updateMeetingFrequency: PropTypes.func,
  updateMeetingLocation: PropTypes.func,
  submitMeetingCreation: PropTypes.func,
};

export default connect(mapStateToProps, {
  updateGroupName,
  updateGroupDescription,
  updateMeetingDuration,
  updateMeetingFrequency,
  updateMeetingLocation,
  submitMeetingCreation,
})(CreateGroup);
