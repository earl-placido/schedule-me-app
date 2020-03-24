import {
  Row,
  Col,
  Card,
  Button,
  List,
  Divider,
  Typography,
  message,
  Avatar,
  Modal
} from "antd";
import {
  UserOutlined,
  CopyOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import InputAvailability from "../components/InputAvailabilityModal";
import {
  getGroupMembers,
  getGroup,
  showModal,
  closeModal,
  closeErrorModal
} from "../actions/screens/GroupScreen.action";

class GroupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { showCode: false };
  }

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
  };

  handleCancel = () => {
    this.props.closeModal();
  };

  render() {
    const { Title } = Typography;
    const {
      containerStyle,
      cardStyle,
      buttonStyle,
      noMarginStyle,
      marginTop5,
      oldAntColStyle
    } = styles;

    return (
      <div style={containerStyle}>
        <Card style={cardStyle}>
          <Row justify="center">
            <Title level={2} style={noMarginStyle}>
              Group: {this.props.group.GroupName}
            </Title>
          </Row>
          <Row justify="center">
            <h4>{this.props.group.GroupDescription}</h4>
          </Row>
          {!this.state.showCode ? (
            <Row justify="center">
              <Button
                onClick={() => {
                  this.setState({ showCode: true });
                }}
              >
                Share Group
              </Button>
            </Row>
          ) : (
            <div>
              <Row justify="center" style={marginTop5}>
                <h3>Share this code for others to join the group:</h3>
              </Row>
              <Row justify="center">
                <Col offset={2} style={oldAntColStyle}>
                  <Title level={2}>{this.props.match.params.id}</Title>
                </Col>
                <Col offset={1} style={oldAntColStyle}>
                  <CopyToClipboard
                    onCopy={() => this.success()}
                    text={this.props.match.params.id}
                  >
                    <Button style={marginTop5} icon={<CopyOutlined />} />
                  </CopyToClipboard>
                </Col>
              </Row>
            </div>
          )}
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
            onCancel={this.handleCancel}
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
  },

  buttonStyle: {
    margin: 30
  },

  noMarginStyle: {
    margin: 0,
    padding: 0
  },

  marginTop5: {
    marginTop: 5
  },

  oldAntColStyle: {
    flex: "0 1 auto"
  }
};

const mapStateToProps = ({ GroupScreenReducer }) => {
  const {
    groupMembers,
    group,
    inputModalVisible,
    showErrorModal
  } = GroupScreenReducer;
  return { groupMembers, group, inputModalVisible, showErrorModal };
};

GroupScreen.propTypes = {
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
  closeErrorModal: PropTypes.func
};

export default withRouter(
  connect(mapStateToProps, {
    getGroupMembers,
    getGroup,
    showModal,
    closeModal,
    closeErrorModal
  })(GroupScreen)
);
