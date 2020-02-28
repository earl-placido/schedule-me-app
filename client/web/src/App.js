import React, { Component } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types'; 

import CreateGroup from './components/screens/CreateGroup/CreateGroup';
import { PrivateRoute } from './components/util/PrivateRoute';
import NavigationBar from './components/layout/NavigationBar';
import Login from './components/screens/Login/Login';
import "antd/dist/antd.css";

const { Content, Footer } = Layout;

class App extends Component {

    render() {
        const { contentStyle, containerStyle, footerStyle } = styles

        return (
            <Router history={createBrowserHistory()}>
                <Layout>
                    <NavigationBar/>
                    <Content style={ contentStyle }>
                        <div style={ containerStyle }>
                            <Switch>
                                <PrivateRoute 
                                    exact path="/createGroup" 
                                    component={CreateGroup} 
                                    authorized={this.props.isAuthenticated} 
                                />
                                <Route exact path="/login" component={Login} />
                            </Switch>
                        </div>
                    </Content>

                    <Footer style={ footerStyle }>schedule-me-up</Footer>
                </Layout>
            </Router>
        )
    }
}

const styles = {
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


App.propTypes = {
    isAuthenticated: PropTypes.any
};

export default connect(mapStateToProps, null)(App);