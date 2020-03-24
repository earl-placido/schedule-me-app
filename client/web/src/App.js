import React, { Component } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { PrivateRoute } from "./components/util/PrivateRoute";
import CreateGroupScreen from "./screens/CreateGroupScreen";
import GroupListScreen from "./screens/GroupListScreen";
import GroupScreen from "./screens/GroupScreen";
import LoginScreen from "./screens/LoginScreen";
import ScreenContainer from "./components/layout/ScreenContainer";

import "antd/dist/antd.css";
import "./css/app.css";

const { Footer } = Layout;

class App extends Component {
  createGroupComponent = () => {
    return (
      <ScreenContainer>
        <CreateGroupScreen />
      </ScreenContainer>
    );
  };

  createGroupDetailComponent = () => {
    return (
      <ScreenContainer>
        <GroupScreen />
      </ScreenContainer>
    );
  };

  createMainComponent = () => {
    return (
      <ScreenContainer>
        <GroupListScreen />
      </ScreenContainer>
    );
  };

  render() {
    const { footerStyle } = styles;
    return (
      <div className="app">
        <Router>
          <Layout>
            <Switch>
              <PrivateRoute
                exact
                path="/createGroup"
                component={this.createGroupComponent}
                authorized={this.props.isAuthenticated}
              />
              <PrivateRoute
                exact
                path="/groups/:id"
                component={this.createGroupDetailComponent}
                authorized={this.props.isAuthenticated}
              />
              <PrivateRoute
                exact
                path="/main"
                component={this.createMainComponent}
                authorized={this.props.isAuthenticated}
              />
              <Route exact path="/">
                <LoginScreen />
              </Route>
            </Switch>
            <Footer style={footerStyle}>schedule-me-up</Footer>
          </Layout>
        </Router>
      </div>
    );
  }
}

const styles = {
  contentStyle: {
    padding: "0 50px",
    marginTop: 64
  },

  containerStyle: {
    background: "#fff",
    padding: 24,
    minHeight: 500,
    marginTop: 20
  },

  footerStyle: {
    textAlign: "center"
  }
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

App.propTypes = {
  isAuthenticated: PropTypes.any
};

export default connect(mapStateToProps, null)(App);
