import { Layout } from "antd";
import React, { Component } from "react";
import PropTypes from "prop-types";

import NavigationBar from "./NavigationBar";

const { Content } = Layout;

class ScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { lessPadding: false };
  }

  handleResize = windowWidth => {
    if (windowWidth <= 760) {
      this.setState({ lessPadding: true });
    } else {
      this.setState({ lessPadding: false });
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize(window.innerWidth));
    this.handleResize(window.innerWidth);
  }

  render() {
    const { contentStyle, containerStyle } = styles;

    return (
      <div>
        <NavigationBar />

        <Content style={contentStyle}>
          <div style={containerStyle}>{this.props.children}</div>
        </Content>
      </div>
    );
  }
}

const styles = {
  contentStyle: {},

  containerStyle: {
    background: "#fff",
    padding: 24,
    minHeight: 500
  }
};

ScreenContainer.propTypes = {
  children: PropTypes.any
};

export default ScreenContainer;
