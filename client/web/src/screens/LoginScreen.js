import React, { Component } from "react";
import { Col, Layout, Button, Divider, notification, Row } from "antd";
import Login from "../components/login/LoginComponent";

const { Content } = Layout;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { toggleForms: false };
  }

  openRedirectMessage() {
    notification.info({
      message: "Redirecting to HTTP",
      description: "You will be redirected to HTTP in 5 seconds!",
      duration: 5
    });
  }

  handleHttps(protocol) {
    if (protocol === "https:") {
      this.openRedirectMessage();
      setInterval(() => {
        window.location.replace(
          `http:${window.location.href.substring(
            window.location.protocol.length
          )}`
        );
      }, 6000);
    }
  }

  render() {
    this.handleHttps(window.location.protocol);

    const { containerStyle, contentStyle, logoStyle, buttonStyle } = styles;

    return (
      <Content style={contentStyle}>
        <div style={containerStyle}>
          <Row align="middle" gutter={[20, 32]} justify="center">
            <Col>
              <img
                aria-hidden="true"
                src={process.env.PUBLIC_URL + "/icons/FULL-ICON.png"}
                width="100px"
              />
            </Col>
            <Col>
              <text style={logoStyle}>Schedule Me Up</text>
            </Col>
          </Row>

          <Button href="/creategroup" size="large" style={buttonStyle}>
            Continue as Guest
          </Button>

          <Divider orientation="center" style={{ marginBottom: 30 }}>
            or
          </Divider>

          <Login />
        </div>
      </Content>
    );
  }
}

const styles = {
  containerStyle: {
    background: "#fff",
    padding: 24,
    minHeight: 500,
    marginTop: 20,
    alignItems: "center"
  },

  contentStyle: {
    padding: "0 50px",
    width: "50%",
    marginTop: 20,
    alignSelf: "center"
  },

  logoStyle: {
    fontSize: 50,
    fontWeight: 500,
    color: "rgba(0, 0, 0, 0.85)"
  },

  buttonStyle: {
    width: "100%",
    marginBottom: 20
  }
};
