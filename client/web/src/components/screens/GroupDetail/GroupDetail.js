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
  getGroupMember,
  getGroupMembers,
  getGroup,
  showModal,
  closeModal,
  closeErrorModal,
  getOptimalTime,
  getMeetings,
  selectMeeting,
  selectOptimalTime,
  setOptimalTime
} from "../../../actions/components/screens/GroupDetail.action";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import InputAvailability from "../Group/InputAvailability";
import MeetingTimeModal from "./MeetingTimeModal";
import PropTypes from "prop-types";

class GroupDetail extends Component {
  componentDidMount() {
    this.props.getGroup(this.props.match.params.id);
    this.props.getGroupMembers(this.props.match.params.id);
    this.props.getGroupMember(this.props.match.params.id);
    this.props.getMeetings(this.props.match.params.id);
  }

  success() {
    message.success("Code copied!");
  }

  showModal(type) {
    this.props.showModal(type);
  }

  handleDone = () => {
    this.props.closeModal();
  };

  closeErrorModal = () => {
    this.props.closeErrorModal();
  };

  handleCancel = () => {
    this.props.closeModal();
  };

  handleDoneMeeting = () => {
    this.props.setOptimalTime(
      this.props.meetings,
      this.props.selectedMeeting,
      this.props.selectedOptimalTime
    );
  };

  getOptimalTime(selectedMeeting) {
    this.props.selectMeeting(selectedMeeting);
    this.props.getOptimalTime(this.props.match.params.id);
    this.showModal("meeting");
  }

  currentMeetingTime = () => {
    return (
      <div>
        {this.props.meetings &&
          this.props.meetings.map((meeting, index) => {
            return (
              <div key={index}>
                <p style={{ display: "inline", marginRight: 10 }}>
                  {meeting.meetingAvailableString ||
                    "Meeting time is currently empty."}
                </p>
                {this.props.groupMember &&
                  this.props.groupMember.MemberRole === "AD" && (
                    <Button
                      type="primary"
                      style={{ backgroundColor: "green" }}
                      onClick={this.getOptimalTime.bind(this, meeting)}
                    >
                      Change
                    </Button>
                  )}
              </div>
            );
          })}
      </div>
    );
  };

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
            <Col>{this.currentMeetingTime()}</Col>
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
            onClick={this.showModal.bind(this, "availability")}
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

          <Modal
            width={"60%"}
            visible={this.props.meetingModalVisible}
            onCancel={this.handleCancel}
            footer={[
              <Button
                style={buttonStyle}
                type="primary"
                key="done"
                onClick={this.handleDoneMeeting}
              >
                Done
              </Button>
            ]}
          >
            <MeetingTimeModal
              optimalTimes={this.props.optimalTimes || []}
              selectOptimalTime={this.props.selectOptimalTime}
            />
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

  inputStyle: {
    width: 200
  },

  buttonStyle: {
    margin: 30
  }
};

const mapStateToProps = ({ GroupDetailReducer }) => {
  const {
    groupMember,
    groupMembers,
    group,
    inputModalVisible,
    meetingModalVisible,
    showErrorModal,
    optimalTimes,
    meetings,
    selectedMeeting,
    selectedOptimalTime
  } = GroupDetailReducer;
  return {
    groupMember,
    groupMembers,
    group,
    inputModalVisible,
    meetingModalVisible,
    showErrorModal,
    optimalTimes,
    meetings,
    selectedMeeting,
    selectedOptimalTime
  };
};

GroupDetail.propTypes = {
  location: PropTypes.any,
  match: PropTypes.any,
  groupMembers: PropTypes.any,
  groupMember: PropTypes.any,
  group: PropTypes.any,
  inputModalVisible: PropTypes.any,
  showErrorModal: PropTypes.any,
  meetingModalVisible: PropTypes.any,
  optimalTimes: PropTypes.any,
  meetings: PropTypes.any,
  selectedMeeting: PropTypes.any,
  selectedOptimalTime: PropTypes.any,
  getGroupMember: PropTypes.func,
  getGroupMembers: PropTypes.func,
  getOptimalTime: PropTypes.func,
  getGroup: PropTypes.func,
  showModal: PropTypes.func,
  closeModal: PropTypes.func,
  closeErrorModal: PropTypes.func,
  getMeetings: PropTypes.func,
  selectMeeting: PropTypes.func,
  setOptimalTime: PropTypes.func,
  selectOptimalTime: PropTypes.func
};

export default withRouter(
  connect(mapStateToProps, {
    getGroupMember,
    getGroupMembers,
    getGroup,
    showModal,
    closeModal,
    closeErrorModal,
    getOptimalTime,
    getMeetings,
    selectMeeting,
    selectOptimalTime,
    setOptimalTime
  })(GroupDetail)
);
