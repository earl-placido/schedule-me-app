import React, { Component } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import Icon from "@ant-design/icons";
import { withRouter, Redirect } from "react-router";
import { connect } from "react-redux";


const openNotification = () => {
  notification.info({
    message: "Unavailable Action",
    description:
      "Login and with Username is unavailable at the moment. Use Google to proceed.",
    duration: 5
  });
};

class LoginForm extends Component{
  onFinish(values){
    console.log("Success", values);
  };

  onFinishFailed(errorinfo){
    console.log("Failed", errorinfo);
  };

  render(){
    return (
      <Form name="login" onFinish={this.onFinish()} onFinishFailed={this.onFinishFailed()}>
        <Form.Item
          name="username"
          place
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            placeholder={"Enter your Email"}
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
  
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder={"Enter your password"}
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
  
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
  
        <Form.Item>
          <Button
            onClick={openNotification}
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

export default LoginForm;
