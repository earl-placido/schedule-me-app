import React, { Component } from 'react';
import { View } from 'react-native';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import GroupInfoForm from '../groups/CreateGroup/GroupInfoForm'
import GroupMeetingForm from '../groups/CreateGroup/GroupMeetingForm'

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

export default class CreateGroup extends Component {
  render() {
    return (
      <View style={{ flex: 10}}>
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
                label = "Group"
                onNext={this.onNextStep}
                previousBtnDisabled
                scrollViewProps={defaultScrollViewProps}
                nextBtnTextStyle={buttonTextStyle}
                previousBtnTextStyle={buttonTextStyle}
              >
                <GroupInfoForm/>
          </ProgressStep>   
          
          <ProgressStep
            label = "Meeting"
            nextBtnText = "Done"
            onNext={this.onNextStep}
            onPrevious={this.onPrevStep}
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
          >
            <GroupMeetingForm/>
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