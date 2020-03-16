import React, { Component } from "react";
import { Input, Button, Row } from "antd";
import PropTypes from "prop-types";

class ShareLinkForm extends Component {
  render() {
    return (
      <div className="center-container">
        <Row justify="center">
          <h3>
            Your group has been created! The link for the group can be found
            here:
          </h3>
          <Input value={this.props.link} />
        </Row>
        <Row justify="center">
          <Button type="primary" href={this.props.link}>
            Go to Group Page
          </Button>
        </Row>
      </div>
    );
  }
}

ShareLinkForm.propTypes = {
  link: PropTypes.any
};

export default ShareLinkForm;
