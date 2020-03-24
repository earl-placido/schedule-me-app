import React, {Component} from 'react';
import {ScrollView, SafeAreaView, Alert} from 'react-native';
import {
  Card,
  CardItem,
  Body,
  Text,
  CheckBox,
  ListItem,
  Button,
  View,
  Right,
} from 'native-base';
import PropTypes from 'prop-types';
import moment from 'moment';

// import moment, {calendarFormat} from 'moment';
import DatePicker from 'react-native-datepicker';

import {
  cancelAvailability,
  handleChangeRangeHour,
  addAvailability,
} from '../../actions/InputAvailability.action';
import {connect} from 'react-redux';

const rangeHourHeight = 45;
const maxHeight = rangeHourHeight * 5;

class AvailabilityModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeHours: [[]],
      height: rangeHourHeight,
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
    this.setState({
      rangeHours: [...this.state.rangeHours, ['']],
    });
  }

  deleteLatestHour() {
    let newRangeHours = [...this.state.rangeHours];

    newRangeHours.pop();

    this.decreaseHeight();
    this.setState({
      rangeHours: newRangeHours,
    });
  }

  deleteRangeHour(index) {
    let newRangeHours = [...this.state.rangeHours];

    newRangeHours.splice(index, 1);

    this.decreaseHeight();
    this.setState({
      rangeHours: newRangeHours,
    });
  }

  handleChange(date, index, startOrEndTimeIndex) {
    this.props.handleChangeRangeHour(
      date,
      index,
      startOrEndTimeIndex,
      this.props.rangeHours,
    );
  }

  handleOk() {
    // TO DO: Change group member id to actual group member id
  }

  availabilityRender(rangeHour, index) {
    let startTime = rangeHour[0] ? rangeHour[0][1] : '';
    let endTime = rangeHour[1] ? rangeHour[1][1] : '';

    return (
      <View
        key={index}
        style={{flexDirection: 'row', justifyContent: 'center'}}>
        <DatePicker
          style={{width: 100, paddingLeft: 10}}
          date={startTime}
          mode="time"
          format="h:mm A"
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
            onPress={() => this.deleteRangeHour(index)}>
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

    // TODO: change group member id to actual group member id
    this.props.addAvailability(
      this.props.selectedDate,
      this.props.rangeHours,
      this.props.availableDays,
    );
  }

  foundUnfilledTime(rangeHours) {
    for (let i = 0; i < rangeHours.length; i++) {
      if (rangeHours[i].length != 2) return true;
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

        <ListItem noIndent noBorder>
          <CheckBox checked />
          <Text style={{padding: 10}}>Repeat Weekly</Text>
        </ListItem>

        <View
          style={{
            paddingBottom: 30,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={{paddingRight: 10}}>
            <Button small light rounded onPress={() => this.deleteLatestHour()}>
              <Text>Delete</Text>
            </Button>
          </View>
          <View>
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
                onPress={() => this.props.cancelAvailability()}>
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
  const {selectedDate, rangeHours, availableDays} = InputAvailabilityReducer;

  return {
    selectedDate,
    rangeHours,
    availableDays,
  };
};

AvailabilityModal.propTypes = {
  selectedDate: PropTypes.any,
  rangeHours: PropTypes.any,
  availableDays: PropTypes.any,

  cancelAvailability: PropTypes.func,
  handleChangeRangeHour: PropTypes.func,
  addAvailability: PropTypes.func,
};

export default connect(mapStateToProps, {
  cancelAvailability,
  handleChangeRangeHour,
  addAvailability,
})(AvailabilityModal);
