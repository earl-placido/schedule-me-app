import { Form, Input, Button } from "antd";
import Icon from "@ant-design/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { authenticate } from "../../actions/Auth.action";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
  }

  signUp(values) {
    console.log("Success", values);
    this.props.authenticate("signup", values);
  }

  onFinishFailed(errorinfo) {
    console.log("Failed", errorinfo);
  }

  render() {
    return (
      <div>
        {this.props.errored ? (
          <p style={{ textAlign: "center", color: "Red" }}>
            {this.props.message}
          </p>
        ) : null}
        <Form
          name="signup"
          onFinish={this.signUp}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" }
            ]}
          >
            <Input
              placeholder={"First Name"}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" }
            ]}
          >
            <Input
              placeholder={"Last Name"}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { type: "email", message: "Please enter a valid email address" },
              { required: true, message: "Please input your email address" }
            ]}
          >
            <Input
              placeholder={"E-mail"}
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter a password!" },
              { min: 8, message: "Password must be atleast 8 characters" },
              { max: 100, message: "Password cannot be over 100 characters!" }
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder={"Password"}
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                }
              })
            ]}
          >
            <Input.Password
              placeholder={"Confirm Password"}
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  authenticate: PropTypes.func,
  isAuthenticated: PropTypes.any,
  errored: PropTypes.any,
  message: PropTypes.any
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errored: state.auth.errored,
  message: state.auth.message
});

const mapDispatchToProps = dispatch => ({
  authenticate: (type, data) => dispatch(authenticate(type, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
