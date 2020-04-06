import { Input, Button, Row } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  addUserToGroup,
  setCode
} from "../actions/components/GroupCodeModal.action";
import {
  closeJoinGroupModal,
  getGroupList
} from "../actions/components/layout/NavigationBar.action";
import {
  getGroup,
  getGroupMembers,
  getSelfMember,
  getMeetings
} from "../actions/screens/GroupScreen.action";

class GroupCodeModal extends Component {
  handleChange = value => {
    this.props.setCode(value);
  };

  onEnter = () => {
    this.props.addUserToGroup(this.props.code);
  };

  render() {
    const {
      errorMessageStyle,
      groupCodeStyle,
      inputStyle,
      okayButtonStyle,
      goToGroupButtonStyle
    } = styles;
    return (
      <div>
        {!this.props.success ? (
          <span>
            <Row justify="center" style={inputStyle}>
              <Input
                style={groupCodeStyle}
                maxLength={7}
                onChange={e => this.handleChange(e.target.value)}
                min={0}
                placeholder={"0000000"}
              ></Input>
            </Row>
            <Row justify="center" style={errorMessageStyle}>
              {this.props.errorGroupCodeMessage}
            </Row>
            <Row justify="center" style={okayButtonStyle}>
              <Button type="primary" onClick={this.onEnter}>
                Okay
              </Button>
            </Row>
          </span>
        ) : (
          <span>
            <Row justify="center">You have successfully joined this group!</Row>
            <Row justify="center" style={goToGroupButtonStyle}>
              <Button type="primary" href={this.props.link}>
                Go to Group
              </Button>
            </Row>
          </span>
        )}
      </div>
    );
  }
}

const styles = {
  errorMessageStyle: {
    color: "red",
    paddingTop: 15
  },

  groupCodeStyle: {
    paddingTop: 5,
    fontSize: 25,
    width: 140,
    textAlign: "center"
  },

  inputStyle: {
    paddingTop: 15
  },

  okayButtonStyle: {
    paddingTop: 20,
    paddingBottom: 15
  },

  goToGroupButtonStyle: {
    paddingTop: 20,
    paddingBottom: 5
  }
};

const mapStateToProps = ({ GroupCodeModalReducer }) => {
  const {
    success,
    errorGroupCodeMessage,
    groupId,
    link,
    code
  } = GroupCodeModalReducer;
  return { success, errorGroupCodeMessage, groupId, link, code };
};

GroupCodeModal.propTypes = {
  success: PropTypes.any,
  groupId: PropTypes.any,
  link: PropTypes.any,
  errorGroupCodeMessage: PropTypes.any,
  code: PropTypes.any,
  addUserToGroup: PropTypes.func,
  setCode: PropTypes.func,
  closeJoinGroupModal: PropTypes.func,
  getGroup: PropTypes.func,
  getGroupMembers: PropTypes.func,
  getSelfMember: PropTypes.func,
  getMeetings: PropTypes.func,
  getGroupList: PropTypes.func
};

export default connect(mapStateToProps, {
  addUserToGroup,
  setCode,
  closeJoinGroupModal,
  getGroup,
  getGroupMembers,
  getSelfMember,
  getMeetings,
  getGroupList
})(GroupCodeModal);
