import React, { Component } from 'react';
import { Form, Icon, Input } from 'antd';
import "antd/dist/antd.css";

const { TextArea } = Input;

class GroupInfoForm extends Component{

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        
        return(
            <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please enter your group name!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="usergroup-add" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Enter Group Name"
                                    />,
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator('description', {
                                    rules: [{ required: false}],
                                })(
                                    <TextArea placeholder="Enter group description (Optional)" rows = {7} allowClear/>,
                                )}
                            </Form.Item>

                        </Form>
        );
    }
}

GroupInfoForm = Form.create({name: 'login'})(GroupInfoForm)

export default GroupInfoForm