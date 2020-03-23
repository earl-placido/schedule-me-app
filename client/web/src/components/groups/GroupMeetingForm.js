import { Form, Input, TimePicker } from "antd";
import Icon from "@ant-design/icons";
import React, { Component } from "react";
import PropTypes from "prop-types";

class GroupMeetingForm extends Component {
  changeDuration(duration) {
    this.props.updateMeetingDuration(duration);
  }

  changeFrequency(frequency) {
    this.props.updateMeetingFrequency(frequency.target.value);
  }

  changeLocation(location) {
    this.props.updateMeetingLocation(location.target.value);
  }

  render() {
    const { errorText, durationStyle } = styles;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {
            <div>
              <TimePicker
                format={"HH:mm"}
                placeholder="Duration (HH:mm)"
                value={this.props.duration}
                onChange={this.changeDuration.bind(this)}
                id="duration"
                style={durationStyle}
              />
              {!this.props.success && (
                <h1 style={errorText}>Please input meeting duration.</h1>
              )}
            </div>
          }
        </Form.Item>

        <Form.Item>
          {
            <Input
              prefix={
                <Icon type="calendar" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Meeting frequency (optional)"
              value={this.props.frequency}
              onChange={this.changeFrequency.bind(this)}
              id="frequency"
            />
          }
        </Form.Item>

        <Form.Item>
          {
            <Input
              prefix={<Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Meeting location (optional)"
              value={this.props.location}
              onChange={this.changeLocation.bind(this)}
              id="location"
            />
          }
        </Form.Item>
      </Form>
    );
  }
}

const styles = {
  errorText: {
    fontSize: 12,
    color: "red",
    marginLeft: 10
  },

  durationStyle: {
    width: 200
  }
};

GroupMeetingForm.propTypes = {
  frequency: PropTypes.any,
  duration: PropTypes.any,
  location: PropTypes.any,
  success: PropTypes.any,

  updateMeetingDuration: PropTypes.func,
  updateMeetingFrequency: PropTypes.func,
  updateMeetingLocation: PropTypes.func
};

export default GroupMeetingForm;
