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
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import {
  getSelfMember,
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
} from "../actions/screens/GroupScreen.action";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "antd/dist/antd.css";
import InputAvailability from "../components/InputAvailabilityModal";
import MeetingTimeModal from "./MeetingTimeModal";
import moment from "moment";

class GroupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { showCode: false };
  }

  componentDidMount() {
    this.props.getGroup(this.props.match.params.id);
    this.props.getGroupMembers(this.props.match.params.id);
    this.props.getSelfMember(this.props.match.params.id);
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

  formatDate(date) {
    console.log(date);
    let dateArray = date.replace(/\s/g, "").split(/\W/g);
    let formattedDate = moment({
      year: dateArray[0],
      month: dateArray[1],
      day: dateArray[2]
    }).format("dddd, MMMM Do YYYY");
    let formattedStartTime = moment({
      hour: dateArray[4],
      minute: dateArray[5]
    }).format("h:mm a");
    let formattedEndTime = moment({
      hour: dateArray[6],
      minute: dateArray[7]
    }).format("h:mm a");
    let formattedTime = `${formattedStartTime} - ${formattedEndTime}`;
    return (
      <span>
        {formattedDate} &nbsp;&nbsp;<b>{formattedTime}</b>
      </span>
    );
  }

  currentMeetingTime = () => {
    return (
      <div id="meeting-time-panel">
        <Row justify="center">
          {this.props.meetings &&
            this.props.meetings.map((meeting, index) => {
              return (
                <div key={index} id="meeting-time">
                  <p
                    style={{ display: "inline", marginRight: 10 }}
                    id="meeting-time-detail"
                  >
                    {meeting.meetingAvailableString
                      ? this.formatDate(meeting.meetingAvailableString)
                      : "No meeting time is selected"}
                  </p>
                  {this.props.selfMember &&
                    this.props.selfMember.MemberRole === "AD" && (
                      <Button
                        id="change-meeting-time"
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
        </Row>
      </div>
    );
  };

  removeSeconds(timeString) {
    if (timeString) {
      return timeString.substring(0, timeString.lastIndexOf(":"));
    }
  }

  render() {
    const { Title } = Typography;

    const {
      containerStyle,
      cardStyle,
      buttonStyle,
      noMarginStyle,
      marginTop5,
      marginTop15,
      marginTop25,
      marginBottom10,
      oldAntColStyle
    } = styles;

    return (
      <div style={containerStyle}>
        <Card style={cardStyle}>
          <Row justify="center">
            <Title id="group-name" level={2} style={noMarginStyle}>
              Group: {this.props.group.GroupName}
            </Title>
          </Row>
          {this.props.group.GroupDescription && (
            <Row justify="center" id="group-desc-detail">
              <h4>{this.props.group.GroupDescription}</h4>
            </Row>
          )}
          <Row justify="center" style={marginTop15}>
            <span id="meeting-duration-detail">
              <b>Meeting Duration:</b>{" "}
              {this.removeSeconds(this.props.group.MeetingDuration)}
            </span>
          </Row>
          <Row justify="center" style={noMarginStyle}>
            <span id="meeting-frequency-detail">
              <b>Meeting Frequency:</b>{" "}
              {this.props.group.MeetingFrequency !== null
                ? this.props.group.MeetingFrequency
                : "Not Specified"}
            </span>
          </Row>
          <Row
            justify="center"
            style={marginBottom10}
            id="meeting-location-detail"
          >
            <span>
              <b>Meeting Location:</b>{" "}
              {this.props.group.MeetingLocation !== null
                ? this.props.group.MeetingLocation
                : "Not Specified"}
            </span>
          </Row>
          {!this.state.showCode ? (
            <Row justify="center" style={marginTop25}>
              <Button
                id="show-code-button"
                onClick={() => {
                  this.setState({ showCode: true });
                }}
              >
                Share Group
              </Button>
            </Row>
          ) : (
            <div id="group-code-panel">
              <Row justify="center" style={marginTop25}>
                <h3>Share this code for others to join the group:</h3>
              </Row>
              <Row justify="center">
                <Col offset={2} style={oldAntColStyle}>
                  <Title level={2} id="share-group-code">
                    {this.props.match.params.id}
                  </Title>
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
            <Col>{this.currentMeetingTime()}</Col>
          </Row>
          <Divider orientation="center" />
          <Row justify="center">
            <Title level={3}>Group Members</Title>
          </Row>
          <Row justify="center">
            <List
              itemLayout="horizontal"
              id="group-members-list"
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
            id="input-availability-button"
            type="primary"
            onClick={this.showModal.bind(this, "availability")}
            style={{ float: "right" }}
          >
            Input Your Availability
          </Button>
          <Modal
            id="input-availability-modal"
            width={"60%"}
            visible={this.props.inputModalVisible}
            onCancel={this.handleCancel}
            footer={[
              <Button
                style={buttonStyle}
                type="primary"
                key="done"
                id="availability-done-button"
                onClick={this.handleDone}
              >
                Done
              </Button>
            ]}
          >
            <InputAvailability />
          </Modal>

          <Modal
            id="meeting-time-modal"
            width={"60%"}
            visible={this.props.meetingModalVisible}
            onCancel={this.handleCancel}
            footer={[
              <Button
                style={buttonStyle}
                type="primary"
                key="done"
                id="meeting-modal-done-button"
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
          id="error-modal"
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
    justifyContent: "center",
    margin: 1,
    padding: 1
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

  marginTop15: {
    marginTop: 15
  },

  marginTop25: {
    marginTop: 25
  },

  marginBottom10: {
    marginBottom: 10
  },

  oldAntColStyle: {
    flex: "0 1 auto"
  }
};

const mapStateToProps = ({ GroupScreenReducer }) => {
  const {
    selfMember,
    groupMembers,
    group,
    inputModalVisible,
    meetingModalVisible,
    showErrorModal,
    optimalTimes,
    meetings,
    selectedMeeting,
    selectedOptimalTime
  } = GroupScreenReducer;
  return {
    selfMember,
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

GroupScreen.propTypes = {
  location: PropTypes.any,
  match: PropTypes.any,
  groupMembers: PropTypes.any,
  selfMember: PropTypes.any,
  group: PropTypes.any,
  inputModalVisible: PropTypes.any,
  showErrorModal: PropTypes.any,
  meetingModalVisible: PropTypes.any,
  optimalTimes: PropTypes.any,
  meetings: PropTypes.any,
  selectedMeeting: PropTypes.any,
  selectedOptimalTime: PropTypes.any,
  getSelfMember: PropTypes.func,
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
    getSelfMember,
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
  })(GroupScreen)
);
