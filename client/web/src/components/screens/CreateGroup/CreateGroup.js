import React, { Component } from "react";
import { Steps, Row, Col, Card, Button, Icon } from "antd";
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
    justifyContent: "space-between"
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
// this is for good programming practices, which eslint enforces - we could remove the rule from eslint if we wanted
// see: https://wecodetheweb.com/2015/06/02/why-react-proptypes-are-important/
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
