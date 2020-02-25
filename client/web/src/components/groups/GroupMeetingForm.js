import React, {Component} from 'react';
import { Form, Icon, Input } from 'antd';
import {connect} from 'react-redux';

class GroupMeetingForm extends Component{
    render(){
        return(
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {(
                        <Input
                            prefix={<Icon type="clock-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Meeting Duration"
                        />
                    )}
                </Form.Item>

                <Form.Item>
                    {(
                        <Input
                            prefix={<Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Meeting Frequency (Optional)"
                        />
                    )}
                </Form.Item>

                <Form.Item>
                    {(
                        <Input
                            prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Meeting Location (Optional)"
                        />
                    )}
                </Form.Item>

            </Form>
        );
    }
}

export default connect()(GroupMeetingForm);