import React, { Component } from "react";
import moment from "moment";
import {
  Calendar,
  Modal,
  TimePicker,
  Button,
  Checkbox,
  Badge,
  Typography,
  Row
} from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import {
  selectDate,
  showModal,
  cancelAvailability,
  deleteAvailability,
  addAvailability,
  getInformation,
  handleAdd,
  onChangeRange,
  closeErrorModal
} from "../../../actions/components/screens/InputAvailability.action";

const { RangePicker } = TimePicker;

class Group extends Component {
  onSelect = value => {
    this.props.selectDate(value, this.props.availableDays);
    if (
      value.year() === this.props.selectedDate.year() &&
      value.month() === this.props.selectedDate.month()
    )
      this.showModal();
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
    this.props.deleteAvailability(
      this.props.rangeHours,
      this.props.availableDays
    );
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

  closeErrorModal = () => {
    this.props.closeErrorModal();
  };

  render() {
    const { Title } = Typography;
    const { availabilityStyle, calendarStyle } = styles;

    return (
      <div style={availabilityStyle}>
        <Row justify="center">
          <Title level={2}>
            {this.props.groupInformation &&
              this.props.groupInformation.GroupName}
          </Title>
        </Row>
        <Row justify="center">
          <Title level={4}>
            {this.props.groupInformation &&
              this.props.groupInformation.GroupDescription}
          </Title>
        </Row>
        <Row justify="center">
          <p>Click on a date to edit your availability for that day.</p>
        </Row>
        <div style={calendarStyle}>
          <Calendar
            id="availability-calendar"
            onSelect={this.onSelect}
            mode="month"
            dateCellRender={this.dateCellRender}
            onPanelChange={this.onPanelChange}
          />
        </div>

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
                  format={"h:mm"}
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
        <Modal
          visible={this.props.showErrorModal}
          onCancel={this.closeErrorModal}
          footer={[
            <Button type="primary" key="ok" onClick={this.closeErrorModal}>
              OK
            </Button>
          ]}
        >
          <ExclamationCircleOutlined /> Oops! Something went wrong!
        </Modal>
      </div>
    );
  }
}

const styles = {
  availabilityStyle: {
    paddingTop: 30,
    marginLeft: 30,
    marginRight: 30
  },

  calendarStyle: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#E8E8E8"
  }
};

const mapStateToProps = ({ AddAvailabilityReducer }) => {
  const {
    modalVisible,
    rangeHours,
    selectedDate,
    availableDays,
    groupInformation,
    memberId,
    showErrorModal
  } = AddAvailabilityReducer;
  return {
    modalVisible,
    rangeHours,
    selectedDate,
    availableDays,
    groupInformation,
    memberId,
    showErrorModal
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
  showErrorModal: PropTypes.any,

  handleAdd: PropTypes.func,
  selectDate: PropTypes.func,
  onChangeRange: PropTypes.func,
  addAvailability: PropTypes.func,
  getInformation: PropTypes.func,
  closeErrorModal: PropTypes.func
};

export default connect(mapStateToProps, {
  selectDate,
  showModal,
  cancelAvailability,
  deleteAvailability,
  addAvailability,
  getInformation,
  handleAdd,
  onChangeRange,
  closeErrorModal
})(Group);
