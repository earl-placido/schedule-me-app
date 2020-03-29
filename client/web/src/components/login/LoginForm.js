import { Form, Input, Button } from "antd";
import Icon from "@ant-design/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { authenticate } from "../../actions/Auth.action";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.loginWithEmail = this.loginWithEmail.bind(this);
  }

  loginWithEmail(values) {
    this.props.authenticate("login", values);
  }

  render() {
    return (
      <div className="login-form">
        {this.props.errored ? (
          <p
            className="error-message"
            style={{ textAlign: "center", color: "Red" }}
          >
            {this.props.message}
          </p>
        ) : null}

        <Form name="login" onFinish={this.loginWithEmail}>
          <Form.Item
            className="input-email"
            name="email"
            rules={[
              { type: "email", message: "Please enter a valid email address" },
              { required: true, message: "Please enter your email!" }
            ]}
          >
            <Input
              allowClear
              placeholder={"Enter your email"}
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          </Form.Item>

          <Form.Item
            className="input-password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              allowClear
              placeholder={"Enter your password"}
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          </Form.Item>

          <Form.Item className="input-submit">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  authenticate: PropTypes.func,
  errored: PropTypes.any,
  message: PropTypes.any
};

const mapStateToProps = state => ({
  errored: state.auth.errored,
  message: state.auth.message
});

const mapDispatchToProps = dispatch => ({
  authenticate: (type, data) => dispatch(authenticate(type, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
