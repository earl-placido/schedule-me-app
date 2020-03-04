import React, {Component} from 'react';
import {Calendar, Modal, TimePicker, Button, Checkbox} from 'antd';
import PropTypes from 'prop-types';

const {RangePicker} = TimePicker;

class Group extends Component {

    state = {modalVisible: false, rangeHours: [''], selectedDate: ''};

    onSelect = (value) => {
        const selectedDate = value.format("YYYY-MM-DD");
        this.setState({modalVisible: true, selectedDate});
    }

    handleOk = () => {

    }

    handleCancel = () => {
        this.setState({modalVisible: false});
    }

    handleDelete = () => {
        let rangeHours = [...this.state.rangeHours];
        rangeHours.pop();

        this.setState({rangeHours});
    }

    handleAdd = () => {
        this.setState({rangeHours: [...this.state.rangeHours, '']});
    }

    onChangeRange(index, value) {
        let rangeHours = [...this.state.rangeHours];
        rangeHours[index] = value;
        this.setState({rangeHours});
    }

    render() {
        return (
            <div>
                <Calendar onSelect={this.onSelect} />

                <Modal visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <h2>{this.state.selectedDate}</h2>
                    <h3 className='modal-header'>Input availability time</h3>
                    {this.state.rangeHours.map( (item, index) => {
                        return (
                        <div key={index} className='range-picker'>
                            <RangePicker onChange={this.onChangeRange.bind(this, index)}/>
                        </div>
                        );
                    })}

                    <div className='checkbox-event'>
                        <Checkbox checked disabled>Recurring event</Checkbox>
                    </div>
                    <div className='button-container'>
                        <Button shape='round' className="delete-button" onClick={this.handleDelete}>Delete</Button>
                        <Button type='primary' shape='round' className="add-range-button" onClick={this.handleAdd}>Add</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}

Group.propTypes = {
    match: PropTypes.any
};

export default Group;