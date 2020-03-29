import React, { Component } from "react";
import { Button, Divider, notification, Card, Row, Col } from "antd";
import Login from "../components/login/LoginComponent";

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

    const { backgroundStyle, cardStyle, titleStyle } = styles;

    return (
      <div style={backgroundStyle}>
        <Row align="middle" justify="center">
          <Col flex="auto" />
          <Col flex="auto">
            <Card style={cardStyle}>
              <div>
                <Row justify="center">
                  <img
                    alt="logo"
                    aria-hidden="true"
                    src={process.env.PUBLIC_URL + "/icons/FULL-LOGO1.png"}
                    width="100px"
                  />
                </Row>
                <Row justify="center" style={titleStyle}>
                  Schedule Me Up
                </Row>
                <Row justify="center">
                  <Button href="/creategroup" size="large">
                    Continue as Guest
                  </Button>
                </Row>
                <Divider orientation="center">or</Divider>
                <Row justify="center">
                  <Login />
                </Row>
              </div>
            </Card>
          </Col>
          <Col flex="auto" />
        </Row>
      </div>
    );
  }
}

const styles = {
  backgroundStyle: {
    backgroundColor: "#001529"
  },

  cardStyle: {
    margin: 25,
    borderRadius: 25
  },

  titleStyle: {
    fontSize: 30,
    paddingBottom: 50,
    fontWeight: "bold"
  }
};
