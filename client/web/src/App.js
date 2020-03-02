import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CreateGroup from './components/screens/CreateGroup/CreateGroup';
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;

export default class App extends Component {

    render() {
        const { headerStyle, contentStyle, containerStyle, footerStyle } = styles

        return (
            <Router>
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
                        <Switch>
                        <div style={ containerStyle }>
                            <Route path='/createGroup'>
                                    <CreateGroup/>
                            </Route>
                        </div>
                        </Switch>
                    </Content>

                    <Footer style={ footerStyle }>schedule-me-up</Footer>
                </Layout>
            </Router>
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

