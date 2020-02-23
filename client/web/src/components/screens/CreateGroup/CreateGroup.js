import React, { Component } from 'react';
import { Steps, Row, Col, Card, Button, Icon } from 'antd';
import { connect } from 'react-redux';

import GroupInfoForm from '../../groups/GroupInfoForm';
import GroupMeetingForm from '../../groups/GroupMeetingForm';
import {updateGroupName, updateGroupDescription, goNextPage, goPreviousPage} from '../../../actions/components/screens/CreateGroup.action';
import "antd/dist/antd.css";


class CreateGroup extends Component {

    goPreviousPage() {
        this.props.goPreviousPage(this.props.currentPage);
    }

    goNextPage() {
        this.props.goNextPage(this.props.groupName, this.props.currentPage);
    }

    groupComponents() {

        switch(this.props.currentPage) {
            case(0): { // create group info
                return (<GroupInfoForm 
                    handleGroupName={this.props.updateGroupName} 
                    handleGroupDescription={this.props.updateGroupDescription} 
                    groupName={this.props.groupName}
                    groupDescription={this.props.groupDescription}
                    success={this.props.success}/>);
            }
            case(1): { // meeting
                return <GroupMeetingForm/>
            }
            case(2): { // share

            }
            default: {
                return null;
            }
        }
 
    }

    render() {
        const { Step } = Steps;
        const { containerStyle, cardStyle, buttonContainerStyle } = styles;

        return (
            <div >
            
                <Row style={{ padding: 50 }}>
                    <Col span={16} offset={4}>
                        <Steps current={this.props.currentPage}>
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
                                {this.groupComponents()}
                            </Col>
                        </Row>

                        <Row>
                            <div style={ buttonContainerStyle }>
                                <Button disabled={this.props.currentPage === 0} onClick={this.goPreviousPage.bind(this)}> 
                                    <Icon type="left" />
                                    Previous
                                </Button>

                                <Button id="nextButton" type="primary" onClick={this.goNextPage.bind(this)}> 
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
    const { groupName, groupDescription, success, currentPage } = CreateGroupReducer;
    return {groupName, groupDescription, success, currentPage};
};

export default connect(mapStateToProps, {updateGroupName, updateGroupDescription, goNextPage, goPreviousPage})(CreateGroup);