import React, {Component} from 'react';
import { Form, Icon, Input, TimePicker } from 'antd';

class GroupMeetingForm extends Component{

    changeDuration(duration) {
        this.props.updateMeetingDuration(duration);
    }

    changeFrequency(frequency) {
        this.props.updateMeetingFrequency(frequency.target.value);
    }

    changeLocation(location) {
        this.props.updateMeetingLocation(location.target.value);
    }

    render(){

        const {errorText} = styles;

        return(
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {(
                        <div>
                            <TimePicker  format={'HH:mm'}
                            placeholder="Duration"
                            value={this.props.duration}
                            onChange={this.changeDuration.bind(this)}
                            id='duration'
                            />
                            {!this.props.success && <h1 style={errorText}>Please input meeting duration.</h1>}
                        </div>
                    )}
                </Form.Item>

                <Form.Item>
                    {(
                        <Input
                            prefix={<Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Meeting Frequency (Optional)"
                            value={this.props.frequency}
                            onChange={this.changeFrequency.bind(this)}
                            id='frequency'
                        />
                    )}
                </Form.Item>

                <Form.Item>
                    {(
                        <Input
                            prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Meeting Location (Optional)"
                            value={this.props.location}
                            onChange={this.changeLocation.bind(this)}
                            id='location'
                        />
                    )}
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
    }
};

export default GroupMeetingForm;