import React, { Component } from 'react';
import { Steps, Row, Col, Card, Button, Icon } from 'antd';
import GroupInfoForm from '../groups/GroupInfoForm'
import "antd/dist/antd.css";


export default class CreateGroup extends Component {

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
                                <GroupInfoForm />
                            </Col>
                        </Row>

                        <Row>
                            <div style={ buttonContainerStyle }>
                                <Button disabled> 
                                    <Icon type="left" />
                                    Previous
                                </Button>

                                <Button type="primary"> 
                                    Continue
                                    <Icon type="right" />
                                </Button>
                            </div>

                        </Row>

                    </Card>
                </div>
            </div >
        )
    };
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