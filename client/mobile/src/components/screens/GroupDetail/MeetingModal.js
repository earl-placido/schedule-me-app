import React, {Component} from 'react';
import {View, Card, CardItem, Text, Right, Body, Button} from 'native-base';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import moment from 'moment';
import {ScrollView, Dimensions, Alert} from 'react-native';
import {
  toggleMeetingModal,
  setOptimalTime,
} from '../../../actions/GetOptimalMeetingTime.action';

const NUMBER_TO_DAY = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

class MeetingModal extends Component {
  async handleClick(index) {
    await this.props.setOptimalTime(
      this.props.meetings,
      this.props.selectedMeeting,
      this.props.optimalTimes[index],
    );
    if (this.props.selectedSameOptimalTime) {
      Alert.alert('Meeting time not changed');
    }
    this.props.toggleMeetingModal(this.props.isMeetingModalVisible);
  }

  getOptimalTimeStrings() {
    return this.props.optimalTimes
      ? this.props.optimalTimes.map(optimalTime => {
          const timeInformation = optimalTime[0].split(':');
          const currentDate = timeInformation[0];

          const timeRange = timeInformation[1].split('_');
          const startTime = parseFloat(timeRange[0]).toFixed(2);
          const endTime = parseFloat(timeRange[1]).toFixed(2);

          const startTimeString = ('0' + startTime.toString())
            .substr(startTime.length + 1 - 5)
            .replace('.', ':'); // format number to print
          const endTimeString = ('0' + endTime.toString())
            .substr(endTime.length + 1 - 5)
            .replace('.', ':'); // format number to print
          const count = optimalTime[1];

          const currentDay = moment(currentDate).day();
          const currentDayString = NUMBER_TO_DAY[currentDay];

          const meetingDateString = `Date: ${currentDate} \nDay: ${currentDayString}`;
          const meetingRangeString = `Time: ${startTimeString} - ${endTimeString}`;
          const availableString = `${count} available`;

          return [meetingDateString, meetingRangeString, availableString];
        })
      : null;
  }

  optimalTimeRender(optimalTime, index) {
    return (
      <CardItem
        bordered
        button
        key={index}
        onPress={() => this.handleClick(index)}>
        <Body>
          <View style={{flexDirection: 'column'}}>
            <Text>{optimalTime[0]}</Text>
            <Text>{optimalTime[1]}</Text>
          </View>
        </Body>
        <Right>
          <Text style={{color: 'green'}}>{optimalTime[2]}</Text>
        </Right>
      </CardItem>
    );
  }

  render() {
    const optimalTimeStrings = this.getOptimalTimeStrings();

    return (
      <View>
        <ScrollView
          style={{
            height: Dimensions.get('window').height / 2,
          }}>
          <Card style={{padding: 20}}>
            <CardItem header bordered>
              {optimalTimeStrings && optimalTimeStrings.length > 0 ? (<Text>
                Choose a different meeting time
              </Text>): (<Text>
                Choose a meeting time
              </Text>)}
            </CardItem>
            {optimalTimeStrings && optimalTimeStrings.length > 0 ? 
              (optimalTimeStrings.map((optimalTimeString, index) => {
                return this.optimalTimeRender(optimalTimeString, index);
              })) : <Body style ={{padding: 10}}>
                <Text>
                  No meeting times are available
                </Text>
                </Body>}
          </Card>
          <Button
            block
            onPress={() =>
              this.props.toggleMeetingModal(this.props.isMeetingModalVisible)
            }>
            <Text>Cancel</Text>
          </Button>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({GetOptimalMeetingTimeReducer}) => {
  const {
    optimalTimes,
    isMeetingModalVisible,
    selectedMeeting,
    selectedOptimalTime,
    meetings,
    selectedSameOptimalTime
  } = GetOptimalMeetingTimeReducer;

  return {
    optimalTimes,
    isMeetingModalVisible,
    selectedMeeting,
    selectedOptimalTime,
    meetings,
    selectedSameOptimalTime
  };
};

MeetingModal.propTypes = {
  optimalTimes: PropTypes.any,
  isMeetingModalVisible: PropTypes.any,
  selectedMeeting: PropTypes.any,
  selectedOptimalTime: PropTypes.any,
  meetings: PropTypes.any,
  selectedSameOptimalTime: PropTypes.any,

  toggleMeetingModal: PropTypes.func,
  setOptimalTime: PropTypes.func,
};

export default connect(mapStateToProps, {toggleMeetingModal, setOptimalTime})(
  MeetingModal,
);
