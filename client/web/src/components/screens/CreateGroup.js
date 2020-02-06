import React, { Component } from 'react';
import { Steps, Row, Col, Card, Button, Icon } from 'antd';
import GroupInfoForm from '../groups/GroupInfoForm'
import "antd/dist/antd.css";


export default class CreateGroup extends Component {

    render() {
        const { Step } = Steps;

        return (
            <div >
                <Row style={{ padding: 50 }}>
                    <Col span={16} offset={4}>
                        <Steps size="small" current={0}>
                            <Step title="Group Information" />
                            <Step title="Meeting Information" />
                            <Step title="Share" />
                        </Steps>

                    </Col>
                </Row>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: 800 }}>
                        <Row>
                            <Col span={20} offset={2}>
                                <GroupInfoForm />
                            </Col>
                        </Row>

                        <Row>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
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
