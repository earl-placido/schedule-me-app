import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  List,
  Divider,
  Typography,
  Input,
  Avatar
} from "antd";
import Icon from "@ant-design/icons";
import { getGroupMembers } from "../../../actions/components/screens/GroupDetail.action";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class GroupDetail extends Component {
  componentDidMount() {
    this.props.getGroupMembers(this.props.match.params.id);
  }

  render() {
    const { Title } = Typography;
    const { containerStyle, cardStyle, titleStyle, buttonStyle } = styles;
    const inputAvailabilityLink = `${this.props.location.pathname}input/`;

    return (
      <div style={containerStyle}>
        <Card style={cardStyle}>
          <Row style={titleStyle}>
            <Title level={2}>Group: Equilibrium</Title>
            <h3>Sharable Code</h3>
            <Input value={this.props.match.params.id} />
          </Row>
          <Divider orientation="center" />
          <Row>
            <Title level={3}>Group Members</Title>
            <List
              itemLayout="horizontal"
              dataSource={this.props.groupMembers}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar size={25} icon={<Icon type="user" />} />}
                    title={item.UserFName + " " + item.UserLName}
                  />
                </List.Item>
              )}
            />
          </Row>
          <Divider orientation="center" />
          <Row>
            <Col>
              <Button
                type="primary"
                style={buttonStyle}
                href={inputAvailabilityLink}
              >
                Input Your Availability
              </Button>
            </Col>
          </Row>
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

  titleStyle: {
    textAlign: "center"
  },

  buttonStyle: {
    float: "right"
  }
};

const mapStateToProps = ({ GroupDetailReducer }) => {
  const { groupMembers } = GroupDetailReducer;
  return { groupMembers };
};

GroupDetail.propTypes = {
  location: PropTypes.any,
  match: PropTypes.any,
  groupMembers: PropTypes.any,
  getGroupMembers: PropTypes.func
};

export default withRouter(
  connect(mapStateToProps, { getGroupMembers })(GroupDetail)
);
