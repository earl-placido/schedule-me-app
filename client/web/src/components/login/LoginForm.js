import React, { Component } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import Icon from "@ant-design/icons";
import { withRouter, Redirect } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { updateLoginEmail, updateLoginPassword } from "../../actions/components/login/Login.action";
import { updateLoginEmail, updateLoginPassword, loginWithEmail } from "../../actions/components/screens/Auth.action";


const openNotification = () => {
  notification.info({
    message: "Unavailable Action",
    description:
      "Login and with Email is unavailable at the moment. Use Google to proceed.",
    duration: 5
  });
};

class LoginForm extends Component{
  updateLoginEmail(email){
    this.props.updateLoginEmail(email.target.value);
  }

  updateLoginPassword(password){
    this.props.updateLoginPassword(password.target.value);
  }

  onFinish(values){
    console.log("Sucxcess is :", values);
    this.props.loginWithEmail(values);
  };

  onFinishFailed(errorinfo){
    console.log("Failed", errorinfo);
  };

  render(){
    return (
      <Form name="login" onFinish={this.onFinish} onFinishFailed={this.onFinishFailed()}>
        <Form.Item
          name="email"
          rules={[
            { type: "email", message: "Please enter a valid email address" },
            { required: true, message: "Please input your email!" }
          ]}
        >
          <Input
            allowClear
            onChange={email=>{this.updateLoginEmail(email)}}
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
            onChange={password=>{this.updateLoginPassword(password)}}
            placeholder={"Enter your password"}
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
  
        {/* <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}
  
        <Form.Item>
          <Button
            // onClick={openNotification}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
};

LoginForm.propTypes = {
  updateLoginEmail: PropTypes.func,
  updateLoginPassword: PropTypes.func,
  loginEmail: PropTypes.any,
  loginPassword: PropTypes.any,
  isAuthenticated: PropTypes.any
};

const mapStateToProps = ({ auth }) => {
  const { loginEmail, loginPassword, isAuthenticated } = auth;
  return { loginEmail, loginPassword, isAuthenticated };
};

export default connect(mapStateToProps, { updateLoginEmail, updateLoginPassword, loginWithEmail })(LoginForm);