import { Steps, Row, Col, Card, Button, Modal } from "antd";
import {
  ExclamationCircleOutlined,
  LeftOutlined,
  RightOutlined
} from "@ant-design/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import GroupInfoForm from "../components/groups/GroupInfoForm";
import GroupMeetingForm from "../components/groups/GroupMeetingForm";
import GroupShareComponent from "../components/groups/GroupShareComponent";
import {
  updateGroupName,
  updateGroupDescription,
  updateMeetingDuration,
  updateMeetingFrequency,
  updateMeetingLocation,
  goNextPage,
  goPreviousPage,
  closeErrorModal
} from "../actions/screens/CreateGroupScreen.action";
import { getGroupList } from "../actions/components/layout/NavigationBar.action";

class CreateGroupScreen extends Component {
  // keeping component inside steps prevents the component being re-rendered
  // the component must be re-rendered with new redux properties every time input changes
  // thus, we don't keep the component inside steps so the component doesn't appear frozen when input changes
  constructor(props) {
    super(props);
    this.steps = [
      {
        title: "Group"
      },
      {
        title: "Meeting"
      },
      {
        title: "Share"
      }
    ];
  }

  stepsComponent() {
    switch (this.props.currentPage) {
      case 0: {
        return (
          <GroupInfoForm
            success={this.props.success}
            hasAName={this.props.hasAName}
            descriptionTooLong={this.props.descriptionTooLong}
            handleGroupName={this.props.updateGroupName}
            handleGroupDescription={this.props.updateGroupDescription}
            groupName={this.props.groupName}
            groupDescription={this.props.groupDescription}
          />
        );
      }
      case 1: {
        return (
          <GroupMeetingForm
            success={this.props.success}
            hasMeetingDuration={this.props.hasMeetingDuration}
            updateMeetingDuration={this.props.updateMeetingDuration}
            updateMeetingFrequency={this.props.updateMeetingFrequency}
            updateMeetingLocation={this.props.updateMeetingLocation}
            duration={this.props.duration}
            location={this.props.location}
            frequency={this.props.frequency}
          />
        );
      }
      case 2: {
        return <GroupShareComponent link={this.props.link} />;
      }
      default: {
        return null;
      }
    }
  }

  goPreviousPage() {
    this.props.goPreviousPage(this.props.currentPage);
  }

  goNextPage() {
    this.props.goNextPage(
      this.props.groupName,
      this.props.groupDescription,
      this.props.duration,
      this.props.frequency,
      this.props.location,
      this.props.currentPage
    );
  }

  closeErrorModal = () => {
    this.props.closeErrorModal();
  };

  componentDidUpdate() {
    // update the navigation bar group list
    if (this.props.currentPage === 2) {
      this.props.getGroupList();
    }
  }

  render() {
    const { Step } = Steps;
    const { containerStyle, cardStyle, buttonContainerStyle } = styles;
    return (
      <div>
        <Row style={{ padding: 50 }}>
          <Col span={16} offset={4}>
            <Steps current={this.props.currentPage}>
              {this.steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </Col>
        </Row>

        <div style={containerStyle}>
          <Card style={cardStyle}>
            <Row>
              <Col span={20} offset={2}>
                {this.stepsComponent()}
              </Col>
            </Row>

            <Row>
              {this.props.currentPage !== 2 && (
                <div style={buttonContainerStyle}>
                  <Button
                    id="previousButton"
                    disabled={this.props.currentPage === 0}
                    onClick={this.goPreviousPage.bind(this)}
                  >
                    <LeftOutlined />
                    Previous
                  </Button>

                  <Button
                    id="nextButton"
                    type="primary"
                    onClick={this.goNextPage.bind(this)}
                  >
                    {this.props.currentPage !== 1 ? "Continue" : "Done"}
                    <RightOutlined />
                  </Button>
                </div>
              )}
            </Row>
          </Card>
        </div>
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

  buttonContainerStyle: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  }
};

const mapStateToProps = ({ CreateGroupScreenReducer }) => {
  const {
    groupName,
    groupDescription,
    duration,
    frequency,
    location,
    link,
    success,
    hasAName,
    descriptionTooLong,
    hasMeetingDuration,
    currentPage,
    showErrorModal
  } = CreateGroupScreenReducer;
  return {
    groupName,
    groupDescription,
    duration,
    frequency,
    location,
    link,
    success,
    hasAName,
    descriptionTooLong,
    hasMeetingDuration,
    currentPage,
    showErrorModal
  };
};

CreateGroupScreen.propTypes = {
  groupName: PropTypes.any,
  groupDescription: PropTypes.any,

  duration: PropTypes.any,
  frequency: PropTypes.any,
  location: PropTypes.any,

  link: PropTypes.any,

  success: PropTypes.bool,
  hasAName: PropTypes.bool,
  descriptionTooLong: PropTypes.bool,
  hasMeetingDuration: PropTypes.bool,

  currentPage: PropTypes.any,

  showErrorModal: PropTypes.any,

  updateGroupName: PropTypes.func,
  updateGroupDescription: PropTypes.func,

  updateMeetingDuration: PropTypes.func,
  updateMeetingFrequency: PropTypes.func,
  updateMeetingLocation: PropTypes.func,

  goNextPage: PropTypes.func,
  goPreviousPage: PropTypes.func,

  closeErrorModal: PropTypes.func,
  getGroupList: PropTypes.func
};

export default connect(mapStateToProps, {
  updateGroupName,
  updateGroupDescription,
  updateMeetingDuration,
  updateMeetingFrequency,
  updateMeetingLocation,
  goNextPage,
  goPreviousPage,
  closeErrorModal,
  getGroupList
})(CreateGroupScreen);
