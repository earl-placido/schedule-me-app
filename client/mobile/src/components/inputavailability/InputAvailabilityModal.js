import React, {Component} from 'react';
import {Calendar} from 'react-native-calendars';
import {View, Button, Text} from 'native-base';
import moment from 'moment';
import AvailabilityModal from './AvailabilityModal';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

import {selectDate, showModal, cancelAvailability} from '../../actions/InputAvailability.action';
import {connect} from 'react-redux';

class InputAvailabilityModal extends Component {
  render() {
    return (
      <View>
        <Calendar
          minDate={moment(new Date()).format('YYYY-MM-DD')}
          onDayPress={day => {
            this.props.selectDate(moment(day.dateString).format('YYYY-MM-DD (dddd)'));
            this.props.showModal();
          }}
        />

        <Modal
          isVisible={this.props.modalVisible}
          onBackdropPress={() => {this.props.cancelAvailability()}}>
          <AvailabilityModal />
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

const mapStateToProps = ({InputAvailabilityReducer}) => {
  const {selectedDate, modalVisible} = InputAvailabilityReducer;

  return {
    selectedDate,
    modalVisible,
  };
};

InputAvailabilityModal.propTypes = {
  selectedDate: PropTypes.any,
  modalVisible: PropTypes.any,

  selectDate: PropTypes.func,
  showModal: PropTypes.func,
  cancelAvailability: PropTypes.func
};

export default connect(mapStateToProps, {
  selectDate,
  showModal,
  cancelAvailability
})(InputAvailabilityModal);
