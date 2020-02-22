import React, {Component} from 'react';
import {connect} from 'react-redux';

class GroupMeetingForm extends Component {
    render() {
        return(
            <div>
                <p>meeting</p>
            </div>
        );
    }
}

export default connect()(GroupMeetingForm);