import React, { Component } from "react";

import { Row, Card, List, Icon, Avatar, Divider, Typography } from "antd";
import { getGroupList } from "../../../actions/components/screens/GroupList.action";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class GroupList extends Component {
  componentDidMount() {
    this.props.getGroupList();
  }

  render() {
    const { Title } = Typography;
    const { containerStyle, cardStyle, dividerStyle, titleStyle } = styles;
    return (
      <div style={containerStyle}>
        <Card style={cardStyle}>
          <Row style={titleStyle}>
            <Title level={4}>Your Groups</Title>
          </Row>
          <Divider orientation="center" style={{ dividerStyle }} />
          <Row>
            <List
              itemLayout="horizontal"
              dataSource={this.props.groupList}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar size={50} icon={<Icon type="play-circle-o" />} />
                    }
                    title={
                      <a href={"/group/" + item.GroupId}>{item.GroupName}</a>
                    }
                    description={item.GroupDescription}
                  />
                </List.Item>
              )}
            />
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

const mapStateToProps = ({ GroupListReducer }) => {
  const { groupList } = GroupListReducer;
  return { groupList };
};

GroupList.propTypes = {
  groupList: PropTypes.any,
  getGroupList: PropTypes.func
};

export default connect(mapStateToProps, { getGroupList })(GroupList);
