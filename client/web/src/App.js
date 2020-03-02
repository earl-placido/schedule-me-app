import React, { Component } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ContentContainer from './components/ContentContainer'
import Home from './components/screens/Home/Home';
import CreateGroup from './components/screens/CreateGroup/CreateGroup';


import "antd/dist/antd.css";

const { Footer } = Layout;


export default class App extends Component {

    render() {
        const { footerStyle } = styles

        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route path='/'>
                            <Home/>
                        </Route>
                        <Route path='/createGroup'>
                            <ContentContainer>
                                <CreateGroup />
                            </ContentContainer>
                        </Route>
                    </Switch>

                    <Footer style={footerStyle}>schedule-me-up</Footer>
                </Layout>
            </Router>
        )
    }
}

const styles = {
    footerStyle: {
        textAlign: 'center'
    }
}