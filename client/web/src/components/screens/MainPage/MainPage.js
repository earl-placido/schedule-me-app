import React, { Component } from "react";

import { Row, Card, List, Avatar, Divider, Typography } from "antd";
import Icon from "@ant-design/icons";
import { getGroupList } from "../../../actions/components/screens/MainPage.action";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class MainPage extends Component {
  componentDidMount() {
    this.props.getGroupList();
  }

  render() {
    const { Title } = Typography;
    const { containerStyle, cardStyle, titleStyle } = styles;
    return (
      <div style={containerStyle}>
        <Card style={cardStyle}>
          <Row style={titleStyle}>
            <Title level={4}>Your Groups</Title>
          </Row>
          <Divider orientation="center" />
          <Row>
            <List
              itemLayout="horizontal"
              dataSource={this.props.groupList}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar size={50} icon={<Icon type="usergroup-add" />} />
                    }
                    title={
                      <a href={"/groups/" + item.GroupId + "/"}>
                        {item.GroupName}
                      </a>
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

  titleStyle: {
    textAlign: "center"
  }
};

const mapStateToProps = ({ MainPageReducer }) => {
  const { groupList } = MainPageReducer;
  return { groupList };
};

MainPage.propTypes = {
  groupList: PropTypes.any,
  getGroupList: PropTypes.func
};

export default connect(mapStateToProps, { getGroupList })(MainPage);
