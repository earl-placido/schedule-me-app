import React, {Component} from 'react';
import {Calendar} from 'react-native-calendars';
import {View, Button, Text} from 'native-base';
import moment from 'moment';
import AvailabilityModal from './AvailabilityModal';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

import {selectDate, showModal} from '../../actions/InputAvailability.action';
import {toggleInputAvailability} from '../../actions/screens/GetGroup.action';

import {connect} from 'react-redux';

class InputAvailabilityModal extends Component {
  render() {
    return (
      <View>
        <Calendar
          minDate={moment(new Date()).format('YYYY-MM-DD')}
          onDayPress={day => {
            this.props.selectDate(day, this.props.availableDays);
            this.props.showModal();
          }}
          markedDates={this.props.markedDates}
        />

        <Modal isVisible={this.props.modalVisible}>
          <AvailabilityModal />
        </Modal>

        <View>
          <Button
            block
            onPress={() =>
              this.props.toggleInputAvailability(
                this.props.isInputAvailabilityVisible,
              )
            }>
            <Text>Done</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({InputAvailabilityReducer, GetGroupReducer}) => {
  const {
    selectedDate,
    modalVisible,
    availableDays,
    markedDates,
  } = InputAvailabilityReducer;
  const {isInputAvailabilityVisible} = GetGroupReducer;

  return {
    selectedDate,
    modalVisible,
    availableDays,
    markedDates,
    isInputAvailabilityVisible,
  };
};

InputAvailabilityModal.propTypes = {
  selectedDate: PropTypes.any,
  modalVisible: PropTypes.any,
  availableDays: PropTypes.any,
  markedDates: PropTypes.any,
  isInputAvailabilityVisible: PropTypes.any,
  selectDate: PropTypes.func,
  showModal: PropTypes.func,
  toggleInputAvailability: PropTypes.func,
};

export default connect(mapStateToProps, {
  selectDate,
  showModal,
  toggleInputAvailability,
})(InputAvailabilityModal);
