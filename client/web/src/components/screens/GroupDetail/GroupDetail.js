import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  List,
  Divider,
  Typography,
  message,
  Input,
  Avatar
} from "antd";
import {
  getGroupMembers,
  getGroup
} from "../../../actions/components/screens/GroupDetail.action";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class GroupDetail extends Component {
  componentDidMount() {
    this.props.getGroup(this.props.match.params.id);
    this.props.getGroupMembers(this.props.match.params.id);
  }

  success() {
    message.success("Code copied!");
  }

  render() {
    const { Title } = Typography;
    const { containerStyle, cardStyle, inputStyle } = styles;
    const inputAvailabilityLink = `${this.props.location.pathname}input/`;

    return (
      <div style={containerStyle}>
        <Card style={cardStyle}>
          <Row justify="center">
            <Title level={2}>Group: {this.props.group.GroupName}</Title>
          </Row>
          <Row justify="center">
            <Col>
              <Input
                addonBefore={"Sharable Code"}
                disabled={true}
                value={this.props.match.params.id}
                style={inputStyle}
              />
            </Col>
            <Col offset={1}>
              <CopyToClipboard
                onCopy={() => this.success()}
                text={this.props.match.params.id}
              >
                <Button>Copy Code</Button>
              </CopyToClipboard>
            </Col>
          </Row>
          <Divider orientation="center" />
          <Row justify="center">
            <Title level={3}>Group Members</Title>
          </Row>
          <Row justify="center">
            <List
              itemLayout="horizontal"
              dataSource={this.props.groupMembers}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar size={25} icon={<UserOutlined />} />}
                    title={item.UserFName + " " + item.UserLName}
                  />
                </List.Item>
              )}
            />
          </Row>
          <Divider orientation="center" />
          <Button
            type="primary"
            href={inputAvailabilityLink}
            style={{ float: "right" }}
          >
            Input Your Availability
          </Button>
        </Card>
      </div>
    );
  }
}

const styles = {
  containerStyle: {
    display: "flex",
    justifyContent: "center"
  },

  cardStyle: {
    width: 800
  },

  inputStyle: {
    width: 200
  }
};

const mapStateToProps = ({ GroupDetailReducer }) => {
  const { groupMembers, group } = GroupDetailReducer;
  return { groupMembers, group };
};

GroupDetail.propTypes = {
  location: PropTypes.any,
  match: PropTypes.any,
  groupMembers: PropTypes.any,
  group: PropTypes.any,
  getGroupMembers: PropTypes.func,
  getGroup: PropTypes.func
};

export default withRouter(
  connect(mapStateToProps, { getGroupMembers, getGroup })(GroupDetail)
);
