import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import Icon from "@ant-design/icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authenticate } from "../../actions/components/screens/Auth.action";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.loginWithEmail = this.loginWithEmail.bind(this);
  }

  loginWithEmail(values) {
    this.props.authenticate("login", values);
  }

  loginFail(errorinfo) {
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
          name="login"
          onFinish={this.loginWithEmail}
          onFinishFailed={this.loginFail}
        >
          <Form.Item
            name="email"
            rules={[
              { type: "email", message: "Please enter a valid email address" },
              { required: true, message: "Please input your email!" }
            ]}
          >
            <Input
              allowClear
              placeholder={"Enter your Email"}
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              allowClear
              placeholder={"Enter your password"}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
