import React, { Component } from "react";
import { Steps, Row, Col, Card, Button } from "antd";
import Icon from "@ant-design/icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import GroupInfoForm from "../../groups/GroupInfoForm";
import GroupMeetingForm from "../../groups/GroupMeetingForm";
import ShareLinkForm from "../../groups/ShareLinkForm";
import {
  updateGroupName,
  updateGroupDescription,
  updateMeetingDuration,
  updateMeetingFrequency,
  updateMeetingLocation,
  goNextPage,
  goPreviousPage
} from "../../../actions/components/screens/CreateGroup.action";
import "antd/dist/antd.css";

class CreateGroup extends Component {
  // we don't keep the component inside steps because everytime when input changes, the component has to get re-rendered with the
  // redux properties but keeping component tinside steps will prevent the components to get re-rendered thus
  // making the component frozen
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
            handleGroupName={this.props.updateGroupName}
            handleGroupDescription={this.props.updateGroupDescription}
            groupName={this.props.groupName}
            groupDescription={this.props.groupDescription}
            success={this.props.success}
          />
        );
      }
      case 1: {
        return (
          <GroupMeetingForm
            success={this.props.success}
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
        return <ShareLinkForm link={this.props.link} />;
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
                    <Icon type="left" />
                    Previous
                  </Button>

                  <Button
                    id="nextButton"
                    type="primary"
                    onClick={this.goNextPage.bind(this)}
                  >
                    {this.props.currentPage !== 1 ? "Continue" : "Done"}
                    <Icon type="right" />
                  </Button>
                </div>
              )}
            </Row>
          </Card>
        </div>
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

const mapStateToProps = ({ CreateGroupReducer }) => {
  const {
    groupName,
    groupDescription,
    duration,
    frequency,
    location,
    link,
    success,
    currentPage
  } = CreateGroupReducer;
  return {
    groupName,
    groupDescription,
    duration,
    frequency,
    location,
    link,
    success,
    currentPage
  };
};

// set this so eslint won't show error prop not found for redux
CreateGroup.propTypes = {
  groupName: PropTypes.any,
  groupDescription: PropTypes.any,

  duration: PropTypes.any,
  frequency: PropTypes.any,
  location: PropTypes.any,

  link: PropTypes.any,

  success: PropTypes.any,
  currentPage: PropTypes.any,

  updateGroupName: PropTypes.func,
  updateGroupDescription: PropTypes.func,

  updateMeetingDuration: PropTypes.func,
  updateMeetingFrequency: PropTypes.func,
  updateMeetingLocation: PropTypes.func,

  goNextPage: PropTypes.func,
  goPreviousPage: PropTypes.func
};

export default connect(mapStateToProps, {
  updateGroupName,
  updateGroupDescription,
  updateMeetingDuration,
  updateMeetingFrequency,
  updateMeetingLocation,
  goNextPage,
  goPreviousPage
})(CreateGroup);
