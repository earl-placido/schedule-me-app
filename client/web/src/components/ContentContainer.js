import React, { Component } from "react";
import { Layout } from "antd";
import LoginModal from "./login/LoginModal";
import PropTypes from "prop-types";
import NavigationBar from "./layout/NavigationBar";

const { Content } = Layout;

class ContentContainer extends Component {
  render() {
    const { contentStyle, containerStyle } = styles;

    return (
      <div>
        <NavigationBar />

        <Content style={contentStyle}>
          <div style={containerStyle}>{this.props.children}</div>
        </Content>

        <LoginModal />
      </div>
    );
  }
}

const styles = {
  headerStyle: {
    position: "fixed",
    zIndex: 1,
    width: "100%"
  },

  contentStyle: {
    padding: "0 50px",
    marginTop: 90
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

ContentContainer.propTypes = {
  children: PropTypes.any
};

export default ContentContainer;
