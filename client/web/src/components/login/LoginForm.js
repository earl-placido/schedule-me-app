import React from 'react'
import { Form, Input, Button, Checkbox, Icon } from 'antd';

const LoginForm = () => {
    const onFinish = values => {
        console.log('Success', values)
    }

    const onFinishFailed = errorinfo => {
        console.log('Failed', errorinfo)
    }
    
    return (
        <Form
            name="login"
            onFinish = { onFinish }
            onFinishFailed = { onFinishFailed }
        >
            <Form.Item
                name="username"
                place
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input
                    placeholder={"Enter your username"}
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password
                    placeholder={"Enter your password"}
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
}

export default LoginForm;