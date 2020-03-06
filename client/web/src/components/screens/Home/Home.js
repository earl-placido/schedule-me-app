import React, { Component } from "react";
import { Layout, Button, Divider } from "antd";
import Login from "../../login/Login";
const { Content } = Layout;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { toggleForms: false };
  }

  render() {
    const { containerStyle, contentStyle, logoStyle, buttonStyle } = styles;

    return (
      <Content style={contentStyle}>
        <div style={containerStyle}>
          {/* LOGO HERE  */}
          <h1 style={logoStyle}>Schedule Me Up</h1>

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
    textAlign: "center",
    marginBottom: 40
  },

  buttonStyle: {
    width: "100%",
    marginBottom: 20
  }
};
