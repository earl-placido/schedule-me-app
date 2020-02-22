import React, { Component } from 'react';
import { Form, Icon, Input } from 'antd';
import "antd/dist/antd.css";
import "../../css/app.css";

const { TextArea } = Input;

export default class GroupInfoForm extends Component{
    render(){

        const {errorInput, errorText } = styles;

        return(
            <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {(
                                    <div>
                                        <Input
                                            onChange={ text => {this.props.handleGroupName(text.target.value)}}
                                            prefix={<Icon type="usergroup-add" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder={"Enter Group Name"}
                                        />
                                        {!this.props.success && <h1 style={errorText}>Please input group name</h1>}
                                    </div>
                                )}
                            </Form.Item>

                            <Form.Item>
                                {(<TextArea 
                                onChange={text => {this.props.handleGroupDescription(text.target.value)}}
                                placeholder="Enter group description (Optional)" rows = {7} allowClear/>)}
                            </Form.Item>

            </Form>
        );
    }
}

const styles = {
    errorText: {
        fontSize: 12,
        color: 'red',
        marginLeft: 10
    },
    errorInput: {
        borderColor: 'red'
    }
};
