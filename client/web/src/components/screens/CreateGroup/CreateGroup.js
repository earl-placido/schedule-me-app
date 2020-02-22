import React, { Component } from 'react';
import { Steps, Row, Col, Card, Button, Icon } from 'antd';
import { connect } from 'react-redux';

import GroupInfoForm from '../../groups/GroupInfoForm';
import {updateGroupName, updateGroupDescription, handleSubmit} from './duck';
import "antd/dist/antd.css";


class CreateGroup extends Component {

    finalizeGroup() {
        this.props.handleSubmit(this.props.groupName);
    }

    render() {
        const { Step } = Steps;
        const { containerStyle, cardStyle, buttonContainerStyle } = styles;

        return (
            <div >
                <Row style={{ padding: 50 }}>
                    <Col span={16} offset={4}>
                        <Steps current={0}>
                            <Step title="Group" />
                            <Step title="Meeting" />
                            <Step title="Share" />
                        </Steps>

                    </Col>
                </Row>

                <div style={ containerStyle }>
                    <Card style={ cardStyle }>
                    
                        <Row>
                            <Col span={20} offset={2}>
                                <GroupInfoForm 
                                handleGroupName={this.props.updateGroupName} 
                                handleGroupDescription={this.props.updateGroupDescription} 
                                success={this.props.success}/>
                            </Col>
                        </Row>

                        <Row>
                            <div style={ buttonContainerStyle }>
                                <Button disabled> 
                                    <Icon type="left" />
                                    Previous
                                </Button>

                                <Button type="primary" onClick={this.finalizeGroup.bind(this)}> 
                                    Continue
                                    <Icon type="right" />
                                </Button>
                            </div>

                        </Row>

                    </Card>
                </div>
            </div >
        )
    }
}

const styles = {
    containerStyle : {
        display: 'flex', 
        justifyContent: 'center' 
    },

    cardStyle : {
        width: 800
    },

    buttonContainerStyle : {
        display: 'flex', 
        justifyContent: 'space-between'
    }
}

const mapStateToProps = ({ CreateGroupReducer }) => {
    const { groupName, groupDescription, success } = CreateGroupReducer;
    return {groupName, groupDescription, success};
};

export default connect(mapStateToProps, {updateGroupName, updateGroupDescription, handleSubmit})(CreateGroup);