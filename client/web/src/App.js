import React, { Component } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { PrivateRoute } from './components/util/PrivateRoute';
import NavigationBar from './components/layout/NavigationBar';
import CreateGroup from './components/screens/CreateGroup/CreateGroup';
import Group from './components/screens/Group/Group';
import "antd/dist/antd.css";
import './css/app.css';

const { Content, Footer } = Layout;

class App extends Component {

    render() {
        const { contentStyle, containerStyle, footerStyle } = styles

        return (
            <div className="app">
                <Router>
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

                                    <PrivateRoute 
                                        path="/groups/:id"
                                        component={Group}
                                        authorized={this.props.isAuthenticated}
                                    />
                                </Switch>
                            </div>
                        </Content>

                        <Footer style={ footerStyle }>schedule-me-up</Footer>
                    </Layout>
                </Router>
            </div>
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