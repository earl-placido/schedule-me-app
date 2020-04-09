import { Form, Input } from "antd";
import Icon from "@ant-design/icons";
import React, { Component } from "react";
import PropTypes from "prop-types";

const { TextArea } = Input;

export default class GroupInfoForm extends Component {
  handleGroupNameChange(text) {
    this.props.handleGroupName(text.target.value);
  }

  handleGroupDescriptionChange(text) {
    this.props.handleGroupDescription(text.target.value);
  }

  render() {
    const { errorText } = styles;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {
            <div>
              <Input
                id="groupNameInput"
                onChange={this.handleGroupNameChange.bind(this)}
                prefix={
                  <Icon
                    type="usergroup-add"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                placeholder={"Enter a group name"}
                value={this.props.groupName}
              />
              {!this.props.success && !this.props.hasAName && (
                <h1 style={errorText}>Please enter a name for your group</h1>
              )}
            </div>
          }
        </Form.Item>

        <Form.Item>
          {
            <div>
              <TextArea
                id="groupDescriptionInput"
                onChange={this.handleGroupDescriptionChange.bind(this)}
                placeholder="Enter a description for your group (optional)"
                rows={7}
                allowClear
                value={this.props.groupDescription}
              />
              {!this.props.success && this.props.descriptionTooLong && (
                <h1 style={errorText}>Description is too long</h1>
              )}
            </div>
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

GroupInfoForm.propTypes = {
  handleGroupName: PropTypes.func,
  handleGroupDescription: PropTypes.func,

  groupName: PropTypes.string,
  groupDescription: PropTypes.string,

  success: PropTypes.bool,
  descriptionTooLong: PropTypes.bool,
  hasAName: PropTypes.bool
};
