import React, {Component} from 'react';
import {Calendar, Modal, TimePicker} from 'antd';

const {RangePicker} = TimePicker;

class Group extends Component {

    state = {modalVisible: false};

    onSelect = (value) => {
        console.log(value);
        this.setState({modalVisible: true});
    }

    handleOk = () => {

    }

    handleCancel = () => {
        this.setState({modalVisible: false});
    }

    render() {
        console.log(this.props.match.params.id);
        return (
            <div>
                <Calendar onSelect={this.onSelect} />

                <Modal visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <RangePicker />
                    hello   
                </Modal>
            </div>
        );
    }
}

export default Group;