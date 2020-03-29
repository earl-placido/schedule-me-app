import {
  Row,
  Card,
  List,
  Avatar,
  Divider,
  Typography,
  Modal,
  Button
} from "antd";
import { TeamOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getGroupList,
  closeErrorModal
} from "../actions/screens/GroupListScreen.action";

class GroupListScreen extends Component {
  componentDidMount() {
    this.props.getGroupList();
  }

  closeErrorModal = () => {
    this.props.closeErrorModal();
  };

  render() {
    const { Title } = Typography;
    const { containerStyle, cardStyle, listItem } = styles;
    return (
      <div style={containerStyle}>
        <Card style={cardStyle}>
          <Row justify="center">
            <Title level={4}>Your Groups</Title>
          </Row>
          <Divider orientation="center" />
          <Row justify="center">
            <List
              itemLayout="horizontal"
              dataSource={this.props.groupList}
              renderItem={item => (
                <a href={"/groups/" + item.GroupId + "/"}>
                  <List.Item style={listItem} className="focus-outlined">
                    <List.Item.Meta
                      avatar={<Avatar size={50} icon={<TeamOutlined />} />}
                      title={item.GroupName}
                      description={item.GroupDescription}
                    />
                  </List.Item>
                </a>
              )}
            />
          </Row>
        </Card>
        <Modal
          visible={this.props.showErrorModal}
          onCancel={this.closeErrorModal}
          footer={[
            <Button type="primary" key="ok" onClick={this.closeErrorModal}>
              OK
            </Button>
          ]}
        >
          <ExclamationCircleOutlined /> Oops! Something went wrong!
        </Modal>
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
    width: "90%"
  },

  listItem: {
    padding: 10
  }
};

const mapStateToProps = ({ GroupListScreenReducer }) => {
  const { groupList, showErrorModal } = GroupListScreenReducer;
  return { groupList, showErrorModal };
};

GroupListScreen.propTypes = {
  groupList: PropTypes.any,
  showErrorModal: PropTypes.any,
  getGroupList: PropTypes.func,
  closeErrorModal: PropTypes.func
};

export default connect(mapStateToProps, { getGroupList, closeErrorModal })(
  GroupListScreen
);
