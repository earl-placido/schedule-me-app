import React, { Component } from "react";

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
import {
  UsergroupAddOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import {
  getGroupList,
  closeErrorModal
} from "../../../actions/components/screens/MainPage.action";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class MainPage extends Component {
  componentDidMount() {
    this.props.getGroupList();
  }

  closeErrorModal = () => {
    this.props.closeErrorModal();
  };

  render() {
    const { Title } = Typography;
    const { containerStyle, cardStyle } = styles;
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
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar size={50} icon={<UsergroupAddOutlined />} />
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
    width: 800
  }
};

const mapStateToProps = ({ MainPageReducer }) => {
  const { groupList, showErrorModal } = MainPageReducer;
  return { groupList, showErrorModal };
};

MainPage.propTypes = {
  groupList: PropTypes.any,
  showErrorModal: PropTypes.any,
  getGroupList: PropTypes.func,
  closeErrorModal: PropTypes.func
};

export default connect(mapStateToProps, { getGroupList, closeErrorModal })(
  MainPage
);
