import React, { Component } from "react";
import { Button, Row, Typography, Col, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PropTypes from "prop-types";

class ShareLinkForm extends Component {
  retrieveCodeFromLink(link) {
    var theLink = link.split("/");
    return theLink[theLink.length - 2];
  }

  success() {
    message.success("Code copied!");
  }

  render() {
    const { Title } = Typography;
    const { buttonStyle } = styles;
    return (
      <div className="center-container">
        <Row justify="center">
          <h3>
            Your group has been created! The code for the group can be found
            here:
          </h3>
        </Row>
        <Row justify="center">
          <Col>
            <Title level={3}>
              {this.retrieveCodeFromLink(this.props.link)}
            </Title>
          </Col>
          <Col offset={1}>
            <CopyToClipboard
              onCopy={() => this.success()}
              text={this.retrieveCodeFromLink(this.props.link)}
            >
              <Button icon={<CopyOutlined />} />
            </CopyToClipboard>
          </Col>
        </Row>
        <Row justify="center" style={buttonStyle}>
          <Button type="primary" href={this.props.link}>
            Go to Group
          </Button>
        </Row>
      </div>
    );
  }
}

const styles = {
  buttonStyle: {
    margin: 30
  },

  inputStyle: {
    width: 200
  }
};

ShareLinkForm.propTypes = {
  link: PropTypes.any
};

export default ShareLinkForm;
