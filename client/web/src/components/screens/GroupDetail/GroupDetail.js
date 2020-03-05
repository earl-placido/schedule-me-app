import React, { Component } from 'react';
import { Row, Col, Card, Button, List, Avatar, Divider, Typography } from 'antd';
import "antd/dist/antd.css";

export default class GroupDetail extends Component { 
    render() {
        const { Title } = Typography;
        const { containerStyle, cardStyle, dividerStyle, titleStyle } = styles;
        const userList = [
            {
              name: 'Renz Cabusas',
              role: 'Administrator'
            },
            {
              name: 'Brenna Epp',
              role: 'Member'
            },
            {
              name: 'Bonnie Tang',
              role: 'Member'
            },
            {
              name: 'Daryl Fung',
              role: 'Member'
            },
          ];
        return (
            <div style={ containerStyle }>
                <Card style={ cardStyle }>
                    <Row style= { titleStyle }>
                        <Title level={3}>Group: Equilibrium</Title>
                    </Row>
                    <Row style= { titleStyle }>
                        <Title level={4}>Optimal Time: 12pm - 2pm on October 26, 1985</Title>
                    </Row>
                    <Divider orientation="center" style={{ dividerStyle }}/>
                    <Row>
                        <List
                            itemLayout="horizontal"
                            dataSource={userList}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item.name}</a>}
                                description={item.role}
                                />
                            </List.Item>
                            )}
                        />
                    </Row>
                    <Divider orientation="center" style={{ dividerStyle }}/>
                    <Row justify="center">
                        <Col span={12}>
                            <Button type="primary">Input Your Availability</Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

const styles = {
    containerStyle : {
        display: 'flex', 
        justifyContent: 'center',
    },

    cardStyle : {
        width: 800
    },

    dividerStyle: {
        color: '#333',
        fontWeight: 'normal'
    },

    titleStyle : {
        textAlign: 'center',
    }
}