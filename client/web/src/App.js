import React, { Component } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ContentContainer from './components/ContentContainer'
import Home from './components/screens/Home/Home';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { PrivateRoute } from './components/util/PrivateRoute';
import CreateGroup from './components/screens/CreateGroup/CreateGroup';
<<<<<<< HEAD
import InputAvailability from './components/screens/Group/InputAvailability';
import "antd/dist/antd.css";
import './css/app.css';

const { Content, Footer } = Layout;
//TODO: add model that gets groupmemberid from userid and groupid
//TODO: query for groupmemberId in input InputAvailability
//TODO: add model that lets you input availability 
//TODO: create route that connects with the model
//TODO: when calendar loads, query for the user availbility through groupmemberid
//TODO: remove commented auth api in server

//move
//TODO: add check for clashing range time 

class App extends Component {
    createGroupComponent(){
        
    }

    containComponent(component) {
        return (
            <ContentContainer>
                {component}
            </ContentContainer>
        );
    }

    render() {
        const { footerStyle } = styles

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
                                        component={this.containComponent(CreateGroup)} 
                                        authorized={this.props.isAuthenticated} 
                                    />

                                    <PrivateRoute 
                                        path="/groups/:id/input"
                                        component={InputAvailability}
                                        authorized={this.props.isAuthenticated}
                                    />
                                    <Route path='/'>
                                        <Home/>
                                    </Route>
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
