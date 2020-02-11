import React, { Component } from 'react';
import './App.css';
import { Layout, Menu } from 'antd';
import CreateGroup from './components/screens/CreateGroup'
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;

export default class App extends Component {


    render() {
        return (
            <div className="App">
                <Layout>
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">Groups</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>

                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <div style={{ background: '#fff', padding: 24, minHeight: 500, marginTop: 20}}>
                            <CreateGroup/>
                        </div>
                    </Content>

                    <Footer style={{ textAlign: 'center' }}>schedule-me-up</Footer>
                </Layout>
            </div>
        )
    };
}
