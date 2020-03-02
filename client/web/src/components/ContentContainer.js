import React, { Component } from 'react';
import { Layout, Menu } from 'antd';

const { Header, Content } = Layout;

export default class ContentContainer extends Component {
    render() {
        const { headerStyle, contentStyle, containerStyle } = styles

        return (
            <div>
                <Header style={ headerStyle }>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >

                    </Menu>
                </Header>

                <Content style={ contentStyle }>
                    <div style={ containerStyle }>
                        {this.props.children}
                    </div>

                </Content>
                
            </div>
        );
    }
}

const styles = {
    headerStyle : {
        position: 'fixed', 
        zIndex: 1, 
        width: '100%' 
    },

    contentStyle : {
        padding: '0 50px', 
        marginTop: 90 
    },

    containerStyle :{
        background: '#fff', 
        padding: 24, 
        minHeight: 500, 
        marginTop: 20
    },

    footerStyle : {
        textAlign: 'center' 
    }
}