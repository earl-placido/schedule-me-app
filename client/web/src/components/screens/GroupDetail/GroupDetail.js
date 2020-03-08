import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  List,
  Avatar,
  Divider,
  Typography
} from "antd";
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
    const { containerStyle, cardStyle, dividerStyle, titleStyle } = styles;
    return (
      <div style={containerStyle}>
        <Card style={cardStyle}>
          <Row style={titleStyle}>
            <Title level={3}>Group: Equilibrium</Title>
          </Row>
          <Row style={titleStyle}>
            <Title level={4}>
              Optimal Time: 12pm - 2pm on October 26, 1985
            </Title>
          </Row>
          <Divider orientation="center" style={{ dividerStyle }} />
          <Row>
            <List
              itemLayout="horizontal"
              dataSource={this.props.groupMembers}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.UserId}
                    description={item.MemberRole}
                  />
                </List.Item>
              )}
            />
          </Row>
          <Divider orientation="center" style={{ dividerStyle }} />
          <Row>
            <Col span={12}>
              <Button type="primary">Input Your Availability</Button>
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

  dividerStyle: {
    color: "#333",
    fontWeight: "normal"
  },

  titleStyle: {
    textAlign: "center"
  }
};

const mapStateToProps = ({ GroupDetailReducer }) => {
  const { groupMembers } = GroupDetailReducer;
  return { groupMembers };
};

GroupDetail.propTypes = {
  match: PropTypes.any,
  groupMembers: PropTypes.any,
  getGroupMembers: PropTypes.func
};

export default withRouter(
  connect(mapStateToProps, { getGroupMembers })(GroupDetail)
);
