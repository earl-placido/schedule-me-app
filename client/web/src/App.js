import React, { Component } from 'react';
import './App.css';
import { Layout, Menu } from 'antd';
import CreateGroup from './components/screens/CreateGroup'
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;

export default class App extends Component {

    render() {
        const { headerStyle, contentStyle, containerStyle, footerStyle } = styles

        return (
            <div className="App">
                <Layout>
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
                            <CreateGroup/>
                        </div>
                    </Content>

                    <Footer style={ footerStyle }>schedule-me-up</Footer>
                </Layout>
            </div>
        )
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
        marginTop: 64 
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

