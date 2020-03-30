import { Form, Input, InputNumber, Row, Col } from "antd";
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
    const { errorText } = styles;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item align="middle">
          <Row gutter={[15, 0]} align="middle">
            <Col> Meeting duration </Col>
            <Col>
              <InputNumber
                defaultValue={0}
                value={this.props.duration}
                min={1}
                max={1440}
                step={5}
                formatter={value =>
                  `${Math.trunc(value / 60)}:${(value % 60)
                    .toFixed()
                    .toString()
                    .padStart(2, "0")}`
                }
                parser={value => {
                  value = value.replace(":", "");
                  return Math.trunc(value / 100) * 60 + (value % 100);
                }}
                onChange={this.changeDuration.bind(this)}
                id="duration"
              />
            </Col>
          </Row>
          {!this.props.success && !this.props.hasMeetingDuration && (
            <h1 style={errorText}>Please enter the length of your meeting</h1>
          )}
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
  }
};

GroupMeetingForm.propTypes = {
  frequency: PropTypes.any,
  duration: PropTypes.any,
  location: PropTypes.any,
  success: PropTypes.bool,
  hasMeetingDuration: PropTypes.bool,

  updateMeetingDuration: PropTypes.func,
  updateMeetingFrequency: PropTypes.func,
  updateMeetingLocation: PropTypes.func
};

export default GroupMeetingForm;
