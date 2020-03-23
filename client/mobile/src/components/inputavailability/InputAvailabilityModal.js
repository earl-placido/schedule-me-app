import React, {Component} from 'react';
import {Calendar} from 'react-native-calendars';
import {View, Button, Text} from 'native-base';
import moment from 'moment';
import AvailabilityModal from './AvailabilityModal';
import Modal from 'react-native-modal';

export default class InputAvailabilityModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAvailabilityVisible: false,
      selectedDate: '',
    };
  }

  toggleInputAvailability = () => {
    this.setState({isAvailabilityVisible: !this.state.isAvailabilityVisible});
  };

  render() {
    return (
      <View>
        <Calendar
          minDate={moment(new Date()).format('YYYY-MM-DD')}
          onDayPress={day => {
            this.toggleInputAvailability();
            this.setState({
              selectedDate: moment(day.dateString).format(
                'YYYY-MMMM-DD (dddd)',
              ),
            });
          }}
        />

        <Modal
          isVisible={this.state.isAvailabilityVisible}
          onBackdropPress={() => {
            this.toggleInputAvailability();
          }}>
          <AvailabilityModal
            selectedDate={this.state.selectedDate}
            modalVisible={this.state.isAvailabilityVisible}
          />
        </Modal>

        <View>
          <Button block>
            <Text>Done</Text>
          </Button>
        </View>
      </View>
    );
  }
}
