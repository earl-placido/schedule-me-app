import React, { Component } from "react";
import { Form, Input } from "antd";
import Icon from "@ant-design/icons";

import PropTypes from "prop-types";

import "antd/dist/antd.css";
import "../../css/app.css";

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
              {!this.props.success && (
                <h1 style={errorText}>Please input group name</h1>
              )}
            </div>
          }
        </Form.Item>

        <Form.Item>
          {
            <TextArea
              id="groupDescriptionInput"
              onChange={this.handleGroupDescriptionChange.bind(this)}
              placeholder="Enter a description for your group (optional)"
              rows={7}
              allowClear
              value={this.props.groupDescription}
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

GroupInfoForm.propTypes = {
  handleGroupName: PropTypes.func,
  handleGroupDescription: PropTypes.func,
  groupName: PropTypes.any,
  success: PropTypes.any,
  groupDescription: PropTypes.any
};
