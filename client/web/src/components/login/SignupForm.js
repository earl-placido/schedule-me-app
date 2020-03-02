import React from 'react'
import { Form, Input, Button, Icon } from 'antd';

const SignupForm = () => {
    const onFinish = values => {
        console.log('Success', values)
    }

    const onFinishFailed = errorinfo => {
        console.log('Failed', errorinfo)
    }

    return (
        <Form
            name="signup"
            onFinish = { onFinish }
            onFinishFailed = { onFinishFailed }
        >

            <Form.Item
                name="firstname"
                rules={[{ required: true, message: 'Please input your first name!' }]}
            >
                <Input
                    placeholder={"First Name"}
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
            </Form.Item>

            <Form.Item
                name="lastname"
                rules={[{ required: true, message: 'Please input your last name!' }]}
            >
                <Input
                    placeholder={"Last Name"}
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
            </Form.Item>

            <Form.Item
                name="email"
                rules={[
                    { type: 'email', message: 'Please enter a valid email address' },
                    { required: true, message: 'Please input your email address' }
                ]}
            >
                <Input
                    placeholder={"E-mail"}
                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter a password!' }]}
                hasFeedback
            >
                <Input.Password
                    placeholder={"Password"}
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
            </Form.Item>

            <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('The two passwords that you entered do not match!')
                        }
                    })
                ]}
            >
                <Input.Password
                    placeholder={"Confirm Password"}
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
                    Sign Up
                </Button>
            </Form.Item>
        </Form>
    );
}

export default SignupForm;