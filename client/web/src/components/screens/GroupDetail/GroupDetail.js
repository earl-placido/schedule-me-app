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
  Avatar,
  Modal
} from "antd";
import {
  getGroupMembers,
  getGroup,
  showModal,
  closeModal,
  closeErrorModal
} from "../../../actions/components/screens/GroupDetail.action";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import InputAvailability from "../Group/InputAvailability";
import PropTypes from "prop-types";

class GroupDetail extends Component {
  componentDidMount() {
    this.props.getGroup(this.props.match.params.id);
    this.props.getGroupMembers(this.props.match.params.id);
  }

  success() {
    message.success("Code copied!");
  }

  showModal = () => {
    this.props.showModal();
  };

  handleDone = () => {
    this.props.closeModal();
  };

  closeErrorModal = () => {
    this.props.closeErrorModal();
  }

  render() {
    const { Title } = Typography;
    const { containerStyle, cardStyle, inputStyle, buttonStyle } = styles;

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
            onClick={this.showModal}
            style={{ float: "right" }}
          >
            Input Your Availability
          </Button>
          <Modal
            width={"60%"}
            visible={this.props.inputModalVisible}
            footer={[
              <Button
                style={buttonStyle}
                type="primary"
                key="done"
                onClick={this.handleDone}
              >
                Done
              </Button>
            ]}
          >
            <InputAvailability />
          </Modal>
        </Card>
        <Modal 
          visible={this.props.showErrorModal}  
          onCancel={this.closeErrorModal} 
          footer={[
            <Button
              type="primary"
              key="ok"
              onClick={this.closeErrorModal}
            >
              OK
            </Button>
          ]}>
          <ExclamationCircleOutlined/> Oops! Something went wrong!
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
  },

  inputStyle: {
    width: 200
  },

  buttonStyle: {
    margin: 30
  }
};

const mapStateToProps = ({ GroupDetailReducer }) => {
  const { groupMembers, group, inputModalVisible, showErrorModal } = GroupDetailReducer;
  return { groupMembers, group, inputModalVisible, showErrorModal };
};

GroupDetail.propTypes = {
  location: PropTypes.any,
  match: PropTypes.any,
  groupMembers: PropTypes.any,
  group: PropTypes.any,
  inputModalVisible: PropTypes.any,
  showErrorModal: PropTypes.any,
  getGroupMembers: PropTypes.func,
  getGroup: PropTypes.func,
  showModal: PropTypes.func,
  closeModal: PropTypes.func,
  closeErrorModal: PropTypes.func,
};

export default withRouter(
  connect(mapStateToProps, {
    getGroupMembers,
    getGroup,
    showModal,
    closeModal,
    closeErrorModal
  })(GroupDetail)
);
