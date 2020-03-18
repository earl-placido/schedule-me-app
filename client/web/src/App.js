import React, { Component } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContentContainer from "./components/ContentContainer";
import Home from "./components/screens/Home/Home";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { PrivateRoute } from "./components/util/PrivateRoute";
import GroupDetail from "./components/screens/GroupDetail/GroupDetail";
import MainPage from "./components/screens/MainPage/MainPage";
import CreateGroup from "./components/screens/CreateGroup/CreateGroup";
import "antd/dist/antd.css";
import "./css/app.css";

const { Footer } = Layout;

class App extends Component {
  createGroupComponent = () => {
    return (
      <ContentContainer>
        <CreateGroup />
      </ContentContainer>
    );
  };

  createGroupDetailComponent = () => {
    return (
      <ContentContainer>
        <GroupDetail />
      </ContentContainer>
    );
  };

  createMainComponent = () => {
    return (
      <ContentContainer>
        <MainPage />
      </ContentContainer>
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
                <Home />
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
