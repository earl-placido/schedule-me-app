import React, {Component} from 'react';
import {Calendar} from 'antd';

class Group extends Component {

    onSelect(value) {
        console.log(value);
    }

    render() {
        console.log(this.props.match.params.id);
        return (
            <div>
                <Calendar onSelect={this.onSelect.bind(this)} />
            </div>
        );
    }
}

export default Group;