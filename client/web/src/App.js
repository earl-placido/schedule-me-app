import React, { Component } from 'react';
import { Layout, Menu, Button } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateGroup from './components/screens/CreateGroup/CreateGroup';
import Login from './components/screens/Login/Login';
import LoginModal from './components/login/LoginModal';
import PropTypes from 'prop-types';

import { toggleModal } from './actions/components/login/LoginModal.action'
import { connect } from 'react-redux';

import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;

//THE CHANGES MADE TO THIS FILE ARE ONLY TEMPORARY. EVERYTHING WILL BE REVERTED ONCE EARL's PR IS MERGED WITH DEVELOP

class App extends Component {

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
                            <Button type="primary" onClick={()=>{
                                this.props.toggleModal(true)
                            }}>Sign In</Button>
                        </Menu>
                    </Header>

                    <Content style={ contentStyle }>
                        <Switch>
                        <div style={ containerStyle }>
                            <Route path='/createGroup'>
                                    <CreateGroup/>
                            </Route>

                            <Route path='/login'>
                                    <Login/>
                            </Route>
                        </div>
                        </Switch>
                    </Content>

                    <LoginModal/>

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
const mapStateToProps = ({ LoginModalReducer }) => {
    const { modalVisible } = LoginModalReducer;
    return { modalVisible };
};

App.propTypes = {
    modalVisible: PropTypes.any
};

export default connect(mapStateToProps, {toggleModal})(App);