import React, {Component} from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
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

// import moment, {calendarFormat} from 'moment';
import DatePicker from 'react-native-datepicker';

import {
  selectDate,
  cancelAvailability,
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
    let newRangeHours = [...this.state.rangeHours];

    newRangeHours[index][startOrEndTimeIndex] = date;

    if (newRangeHours[index][0] > newRangeHours[index][1]) {
      this.swapStartAndEndTime(newRangeHours[index]);
    }

    this.setState({
      rangeHours: newRangeHours,
    });
  }

  swapStartAndEndTime(newRangeHours) {
    let temp = newRangeHours[0];
    newRangeHours[0] = newRangeHours[1];
    newRangeHours[1] = temp;
  }

  availabilityRender(rangeHour, index) {
    return (
      <View
        key={index}
        style={{flexDirection: 'row', justifyContent: 'center'}}>
        <DatePicker
          style={{width: 100, paddingLeft: 10}}
          date={rangeHour[0]}
          mode="time"
          format="hh:mm A"
          placeholder="Start Time"
          showIcon={false}
          androidMode="spinner"
          onDateChange={date => this.handleChange(date, index, 0)}
        />
        <DatePicker
          style={{width: 100, paddingLeft: 10}}
          date={rangeHour[1]}
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

  render() {
    return (
      <Card>
        <CardItem header>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            {this.props.selectedDate}
          </Text>
        </CardItem>

        <CardItem>
          <Body>
            <Text style={{fontWeight: 'bold'}}>Input availability time</Text>
          </Body>
        </CardItem>

        {/* 
        {this.state.rangeHours.map((rangeHour, index) => {
          return (
            <Text key={index}>
              Start Time: {rangeHour[0]}, End Time: {rangeHour[1]}
            </Text>
          );
        })} */}

        <SafeAreaView>
          <ScrollView
            style={{
              height:
                this.state.height < maxHeight ? this.state.height : maxHeight,
            }}>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              {this.state.rangeHours.map((rangeHour, index) => {
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
              <Button small>
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
  const {selectedDate} = InputAvailabilityReducer;

  return {
    selectedDate,
  };
};

AvailabilityModal.propTypes = {
  selectedDate: PropTypes.any,

  selectDate: PropTypes.func,
  cancelAvailability: PropTypes.func,
};

export default connect(mapStateToProps, {
  selectDate,
  cancelAvailability,
})(AvailabilityModal);
