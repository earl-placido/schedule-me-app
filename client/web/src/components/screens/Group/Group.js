import React, {Component} from 'react';
import {Calendar, Modal, TimePicker, Button} from 'antd';

const {RangePicker} = TimePicker;

class Group extends Component {

    state = {modalVisible: false, rangeHours: ['']};

    onSelect = (value) => {
        console.log(value);
        this.setState({modalVisible: true});
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

    render() {
        console.log(this.props.match.params.id);
        return (
            <div>
                <Calendar onSelect={this.onSelect} />

                <Modal visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <h3 className='modal-header'>Input availability time</h3>
                    {this.state.rangeHours.map( () => <div className='range-picker'><RangePicker /></div>)}

                    <div className='button-container'>
                        <Button shape='round' className="delete-button" onClick={this.handleDelete}>Delete</Button>
                        <Button type='primary' shape='round' className="add-range-button" onClick={this.handleAdd}>Add</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Group;