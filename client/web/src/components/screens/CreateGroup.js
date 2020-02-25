import React, { Component } from 'react';
import { Steps, Row, Col, Card, Button, Icon } from 'antd';
import GroupInfoForm from '../groups/GroupInfoForm/GroupInfoForm'
import GroupMeetingForm from '../groups/GroupMeetingForm/GroupMeetingForm'
import "antd/dist/antd.css";

const steps = [
    {
      title: 'Group',
      content: <GroupInfoForm />,
    },
    {
      title: 'Meeting',
      content: <GroupMeetingForm />,
    },
    {
      title: 'Share',
      content: 'sharable link form should go here',
    },
  ];

export default class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          current: 0,
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
      
    render() {
        const { current } = this.state;
        const { Step } = Steps;
        const { containerStyle, cardStyle } = styles;

        return (
            <div >
                <Row style={{ padding: 50 }}>
                    <Col span={16} offset={4}>
                        <Steps current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                    </Col>
                </Row>

                <div style={ containerStyle }>
                    <Card style={ cardStyle }>
                        <Row>
                            <Col span={20} offset={2}>
                                {steps[current].content}
                            </Col>
                        </Row>

                        <Row>
                            <div className="steps-action">
                                {current < steps.length - 1 && (
                                    <Button style={{ float: 'right'}} type="primary" onClick={() => this.next()}>
                                    Next
                                    <Icon type="right" />
                                    </Button>
                                )}
                                {current === steps.length - 1 && (
                                    <Button style={{ float: 'right'}} type="primary" onClick={() => this.prev()}>
                                    Done
                                    </Button>
                                )}
                                {current > 0 && (
                                    <Button onClick={() => this.prev()}>
                                    <Icon type="left" />
                                    Previous
                                    </Button>
                                )}
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
    }
}