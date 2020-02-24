import React, { Component } from 'react';
import { Form, Icon, Input } from 'antd';
import "antd/dist/antd.css";

const { TextArea } = Input;

export default class GroupInfoForm extends Component{
    render(){
        return(
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {(
                        <Input
                            prefix={<Icon type="usergroup-add" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Enter Group Name"
                        />
                    )}
                </Form.Item>

                <Form.Item>
                    {(<TextArea placeholder="Enter group description (Optional)" rows = {7} allowClear/>)}
                </Form.Item>
            </Form>
        );
    }
}
