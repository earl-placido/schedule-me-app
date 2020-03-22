import { Button, Row, Typography, Col, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PropTypes from "prop-types";

class GroupShareComponent extends Component {
  retrieveCodeFromLink(link) {
    var theLink = link.split("/");
    return theLink[theLink.length - 2];
  }

  success() {
    message.success("Code copied!");
  }

  render() {
    const { Title } = Typography;
    const { marginTop20, marginTop15 } = styles;
    return (
      <div className="center-container">
        <Row justify="center">
          <h3>Your group has been created!</h3>
        </Row>
        <Row justify="center">
          <h3>Share this code for others to join the group:</h3>
        </Row>
        <Row justify="center">
          <Col offset={2}>
            <Title level={2} style={marginTop15}>
              {this.retrieveCodeFromLink(this.props.link)}
            </Title>
          </Col>
          <Col offset={1}>
            <CopyToClipboard
              onCopy={() => this.success()}
              text={this.retrieveCodeFromLink(this.props.link)}
            >
              <Button style={marginTop20} icon={<CopyOutlined />} />
            </CopyToClipboard>
          </Col>
        </Row>
        <Row justify="center" style={marginTop15}>
          <Button type="primary" href={this.props.link}>
            Go to Group
          </Button>
        </Row>
      </div>
    );
  }
}

const styles = {
  marginTop20: {
    marginTop: 20
  },

  marginTop15: {
    marginTop: 15
  }
};

GroupShareComponent.propTypes = {
  link: PropTypes.any
};

export default GroupShareComponent;
