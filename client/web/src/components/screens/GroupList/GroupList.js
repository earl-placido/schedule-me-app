import React, { Component } from 'react';
import { Row, Card, List, Icon, Avatar, Divider, Typography } from 'antd';
import "antd/dist/antd.css";

export default class GroupList extends Component { 
    render() {
        const { Title } = Typography;
        const { containerStyle, cardStyle, dividerStyle, titleStyle } = styles;
        const groupList = [
            {
                groupId: '1',
                groupName: 'Equilibrium',
                groupDescription: 'For everyone, everything, equally',
                groupOwnerId: '277',
            },
            {
                groupId: '2',
                groupName: 'Schedule McScheduleFace',
                groupDescription: 'A rip off of Boaty McBoatFace',
                groupOwnerId: '278',
            },
            {
                groupId: '3',
                groupName: 'Anti-Hate Club',
                groupDescription: 'All things about hating hate',
                groupOwnerId: '279',
            },
            {
                groupId: '4',
                groupName: 'Im With Stupid ^',
                groupDescription: 'Im With Stupid ^',
                groupOwnerId: '210',
            },
          ];
        return (
            <div style={ containerStyle }>
                <Card style={ cardStyle }>
                    <Row style= { titleStyle }>
                        <Title level={4}>Your Groups</Title>
                    </Row>
                    <Divider orientation="center" style={{ dividerStyle }}/>
                    <Row style={{ listStyle }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={groupList}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                avatar={<Avatar size={50} icon={<Icon type="play-circle-o"/>} />}
                                title={<a href="/group">{item.groupName}</a>}
                                description={item.groupDescription}
                                />
                            </List.Item>
                            )}
                        />
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
    },
}