import React, {Component} from 'react';
import {ScrollView, SafeAreaView, Alert} from 'react-native';
import {Card, CardItem, Body, Text, Button, View, Right} from 'native-base';
import PropTypes from 'prop-types';
import moment from 'moment';

import DatePicker from 'react-native-datepicker';

import {
  cancelAvailability,
  handleChangeRangeHour,
  addAvailability,
  addRangeHour,
  markDates,
  deleteAvailability,
} from '../../actions/InputAvailability.action';
import {connect} from 'react-redux';

const rangeHourHeight = 45;
const maxHeight = rangeHourHeight * 5; // at most, show 5 time picker components in the modal

class AvailabilityModal extends Component {
  constructor(props) {
    super(props);

    // set height based on the number of time picker components in the screen
    let height =
      this.props.rangeHours.length != undefined
        ? rangeHourHeight * this.props.rangeHours.length
        : rangeHourHeight;

    this.state = {
      height: height,
    };
  }

  increaseHeight() {
    this.setState({
      height: this.state.height + rangeHourHeight,
    });
  }

  decreaseHeight() {
    this.setState({
      height: this.state.height - rangeHourHeight,
    });
  }

  addRangeHour() {
    this.increaseHeight();
    this.props.addRangeHour(this.props.rangeHours);
  }

  deleteAvailability(index) {
    this.decreaseHeight();
    this.props.deleteAvailability(
      this.props.rangeHours,
      this.props.availabilities,
      index,
      this.props.selectedDate,
    );
  }

  handleChange(time, index, startOrEndTimeIndex) {
    this.props.handleChangeRangeHour(
      time,
      this.props.selectedDate,
      index,
      startOrEndTimeIndex,
      this.props.rangeHours,
    );
  }

  availabilityRender(rangeHour, index) {
    let startTime =
      rangeHour['CAST(StartTime as char)'] !== undefined
        ? rangeHour['CAST(StartTime as char)'].split(' ')[1]
        : '';
    let endTime =
      rangeHour['CAST(EndTime as char)'] !== undefined
        ? rangeHour['CAST(EndTime as char)'].split(' ')[1]
        : '';

    return (
      <View
        key={index}
        style={{flexDirection: 'row', justifyContent: 'center'}}>
        <DatePicker
          style={{width: 100, paddingLeft: 10}}
          date={startTime}
          mode="time"
          format="hh:mm A"
          placeholder="Start Time"
          showIcon={false}
          androidMode="spinner"
          onDateChange={date => this.handleChange(date, index, 0)}
        />
        <DatePicker
          style={{width: 100, paddingLeft: 10}}
          date={endTime}
          mode="time"
          format="hh:mm A"
          placeholder="End Time"
          showIcon={false}
          androidMode="spinner"
          onDateChange={date => this.handleChange(date, index, 1)}
        />
        {
          <Button
            danger
            transparent
            onPress={() => this.deleteAvailability(index)}>
            <Text>Delete</Text>
          </Button>
        }
      </View>
    );
  }

  addAvailability() {
    if (this.foundUnfilledTime(this.props.rangeHours)) {
      Alert.alert('A start time or end time has not been filled in!');
      return;
    }

    // TODO: pass in group member id
    this.props.addAvailability(
      this.props.groupMemberId,
      this.props.selectedDate,
      this.props.rangeHours,
      this.props.availabilities,
    );

    this.props.markDates(this.props.availabilities);
  }

  foundUnfilledTime(rangeHours) {
    for (let i = 0; i < rangeHours.length; i++) {
      // ignore any range hours that are both undefined
      if (
        rangeHours[i]['CAST(StartTime as char)'] === undefined ^
        rangeHours[i]['CAST(EndTime as char)'] === undefined
      )
        return true;
    }

    return false;
  }

  render() {
    return (
      <Card>
        <CardItem header>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            {moment(this.props.selectedDate.dateString).format(
              'YYYY-MM-DD (dddd)',
            )}
          </Text>
        </CardItem>

        <CardItem>
          <Body>
            <Text style={{fontWeight: 'bold'}}>Input availability time</Text>
          </Body>
        </CardItem>

        <SafeAreaView>
          <ScrollView
            style={{
              height:
                this.state.height < maxHeight ? this.state.height : maxHeight,
            }}>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              {this.props.rangeHours.map((rangeHour, index) => {
                return this.availabilityRender(rangeHour, index);
              })}
            </View>
          </ScrollView>
        </SafeAreaView>

        <View
          style={{
            paddingBottom: 30,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={{paddingRight: 10, paddingTop: 10}}>
            <Button
              small
              light
              rounded
              onPress={() =>
                this.deleteAvailability(this.props.rangeHours.length - 1)
              }>
              <Text>Delete</Text>
            </Button>
          </View>
          <View style={{paddingTop: 10}}>
            <Button small rounded onPress={() => this.addRangeHour()}>
              <Text>Add</Text>
            </Button>
          </View>
        </View>

        <CardItem footer bordered>
          <Body />
          <Right>
            <View style={{flexDirection: 'row'}}>
              <Button
                small
                light
                onPress={() =>
                  this.props.cancelAvailability(this.props.rangeHours)
                }>
                <Text>Cancel</Text>
              </Button>
              <Button small onPress={() => this.addAvailability()}>
                <Text>OK</Text>
              </Button>
            </View>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

const mapStateToProps = ({InputAvailabilityReducer}) => {
  const {
    selectedDate,
    rangeHours,
    availabilities,
    groupMemberId,
  } = InputAvailabilityReducer;

  return {
    selectedDate,
    rangeHours,
    availabilities,
    groupMemberId,
  };
};

AvailabilityModal.propTypes = {
  selectedDate: PropTypes.any,
  rangeHours: PropTypes.any,
  availabilities: PropTypes.any,
  groupMemberId: PropTypes.any,

  cancelAvailability: PropTypes.func,
  handleChangeRangeHour: PropTypes.func,
  addAvailability: PropTypes.func,
  addRangeHour: PropTypes.func,
  markDates: PropTypes.func,
  deleteAvailability: PropTypes.func,
};

export default connect(mapStateToProps, {
  cancelAvailability,
  handleChangeRangeHour,
  addAvailability,
  addRangeHour,
  markDates,
  deleteAvailability,
})(AvailabilityModal);
