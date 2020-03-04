import React, {Component} from 'react';
import {Calendar, Modal, TimePicker, Button, Checkbox} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {selectDate, showModal, cancelAvailability, deleteAvailability,
     handleAdd, onChangeRange, onMonthChange} from '../../../actions/components/screens/Group.action';

const {RangePicker} = TimePicker;

class Group extends Component {

    state = {modalVisible: false, rangeHours: [''], selectedDate: ''};

    onSelect = (value) => {
        this.props.selectDate(value);
    }

    showModal = () => {
        this.props.showModal();
    }

    handleOk = () => {
        // todo add avaiability
    }

    handleCancel = () => {
        this.props.cancelAvailability();
    }

    handleDelete = () => {
        this.props.deleteAvailability(this.props.rangeHours);
    }

    handleAdd = () => {
        this.props.handleAdd(this.props.rangeHours);
    }

    onChangeRange(index, value) {
        this.props.onChangeRange(index, value, this.props.rangeHours);
    }

    // onPanelChange = value => {
    //     // check if month changed
    // };

    render() {
        return (
            <div>
                <Button onClick={this.showModal} type="primary" >Add Availability</Button>
                <Calendar onSelect={this.onSelect} onPanelChange={this.onPanelChange}/>

                <Modal visible={this.props.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <h2>{this.props.selectedDate}</h2>
                    <h3 className='modal-header'>Input availability time</h3>
                    {this.props.rangeHours.map( (item, index) => {
                        return (
                        <div key={index} className='range-picker'>
                            <RangePicker onChange={this.onChangeRange.bind(this, index)}/>
                        </div>
                        );
                    })}

                    <div className='checkbox-event'>
                        <Checkbox checked disabled>Repeat weekly</Checkbox>
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

const mapStateToProps = ({ AddAvailabilityReducer }) => {
    const {modalVisible, rangeHours, selectedDate} = AddAvailabilityReducer;
    return {modalVisible, rangeHours, selectedDate};
};

Group.propTypes = {
    match: PropTypes.any,
    showModal: PropTypes.any,
    cancelAvailability: PropTypes.any,
    deleteAvailability: PropTypes.any,
    rangeHours: PropTypes.any,
    modalVisible: PropTypes.any,
    selectedDate: PropTypes.any,
    
    
    handleAdd: PropTypes.func,
    selectDate: PropTypes.func,
    onChangeRange: PropTypes.func,
};

export default connect(mapStateToProps, 
    {selectDate, showModal, cancelAvailability, deleteAvailability,
        handleAdd, onChangeRange, onMonthChange})(Group);