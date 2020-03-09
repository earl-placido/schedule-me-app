import React, { Component } from "react";
import moment from "moment";
import { Calendar, Modal, TimePicker, Button, Checkbox, Badge } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  selectDate,
  showModal,
  cancelAvailability,
  deleteAvailability,
  addAvailability,
  getInformation,
  handleAdd,
  onChangeRange
} from "../../../actions/components/screens/InputAvailability.action";

const { RangePicker } = TimePicker;

class Group extends Component {
  onSelect = value => {
    this.props.selectDate(value, this.props.availableDays);
  };

  showModal = () => {
    this.props.showModal(this.props.selectedDate, this.props.availableDays);
  };

  handleOk = () => {
    // this.props.rangeHours contain [[availabilityId, [start, end]],...]
    this.props.addAvailability(
      this.props.memberId,
      this.props.selectedDate,
      this.props.rangeHours,
      this.props.availableDays
    );
  };

  handleCancel = () => {
    this.props.cancelAvailability();
  };

  handleDelete = () => {
    this.props.deleteAvailability(this.props.rangeHours);
  };

  handleAdd = () => {
    this.props.handleAdd(this.props.rangeHours);
  };

  onChangeRange(index, value) {
    const month = this.props.selectedDate.month();
    const date = this.props.selectedDate.date();

    // change date/month to selected date/month
    value[0].set({ month, date });
    value[1].set({ month, date });

    this.props.onChangeRange(index, value, this.props.rangeHours);
  }

  dateCellRender = value => {
    const availability = this.props.availableDays[value.day()];
    if (availability === undefined) return;
    return (
      <ul className="events">
        {availability.map((item, index) => (
          <li key={index}>
            <Badge
              status={"success"}
              text={
                item[1][0].format("HH:mm") + "-" + item[1][1].format("HH:mm")
              }
            />
          </li>
        ))}
      </ul>
    );
  };

  componentDidMount() {
    const groupId = parseInt(window.location.pathname.split("/")[2]);

    // otherwise addAvailability button would show that date is undefined
    if (!this.props.selectedDate) this.props.selectDate(moment());
    if (!this.props.groupInformation)
      this.props.getInformation(groupId, this.props.availableDays);
  }

  render() {
    return (
      <div>
        <h2>
          {this.props.groupInformation && this.props.groupInformation.GroupName}
        </h2>
        <p>
          {this.props.groupInformation &&
            this.props.groupInformation.GroupDescription}
        </p>
        <Button id="show-modal-button" onClick={this.showModal} type="primary">
          Add Availability
        </Button>
        <Calendar
          onSelect={this.onSelect}
          mode="month"
          dateCellRender={this.dateCellRender}
          onPanelChange={this.onPanelChange}
        />

        <Modal
          visible={this.props.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <h2>
            {this.props.selectedDate &&
              this.props.selectedDate.format("YYYY-MMM-DD (dddd)")}
          </h2>
          <h3 className="modal-header">Input availability time</h3>
          {this.props.rangeHours.map((item, index) => {
            const value = item[1] || "";
            return (
              <div key={index} className="range-picker">
                <RangePicker
                  value={value}
                  onChange={this.onChangeRange.bind(this, index)}
                />
              </div>
            );
          })}

          <div className="checkbox-event">
            <Checkbox checked disabled>
              Repeat weekly
            </Checkbox>
          </div>
          <div className="button-container">
            <Button
              shape="round"
              className="delete-button"
              onClick={this.handleDelete}
            >
              Delete
            </Button>
            <Button
              type="primary"
              shape="round"
              className="add-range-button"
              onClick={this.handleAdd}
            >
              Add
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ AddAvailabilityReducer }) => {
  const {
    modalVisible,
    rangeHours,
    selectedDate,
    availableDays,
    groupInformation,
    memberId
  } = AddAvailabilityReducer;
  return {
    modalVisible,
    rangeHours,
    selectedDate,
    availableDays,
    groupInformation,
    memberId
  };
};

Group.propTypes = {
  match: PropTypes.any,
  showModal: PropTypes.any,
  cancelAvailability: PropTypes.any,
  deleteAvailability: PropTypes.any,
  rangeHours: PropTypes.any,
  modalVisible: PropTypes.any,
  selectedDate: PropTypes.any,
  availableDays: PropTypes.any,
  groupInformation: PropTypes.any,
  memberId: PropTypes.any,

  handleAdd: PropTypes.func,
  selectDate: PropTypes.func,
  onChangeRange: PropTypes.func,
  addAvailability: PropTypes.func,
  getInformation: PropTypes.func
};

export default connect(mapStateToProps, {
  selectDate,
  showModal,
  cancelAvailability,
  deleteAvailability,
  addAvailability,
  getInformation,
  handleAdd,
  onChangeRange
})(Group);
