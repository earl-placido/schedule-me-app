import { Input, Button, Row } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {
  addUserToGroup,
  setCode
} from "../actions/components/GroupCodeModal.action";
import { closeJoinGroupModal } from "../actions/components/layout/NavigationBar.action";

class GroupCodeModal extends Component {
  handleChange = value => {
    this.props.setCode(value);
  };

  redirect() {
    return <Redirect to={`/groups/${this.props.groupId}/`} />;
  }

  onEnter = () => {
    this.props.addUserToGroup(this.props.code);
  };

  render() {
    const {
      errorMessageStyle,
      groupCodeStyle,
      inputStyle,
      okayButtonStyle
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
              <Button type="primary" onClick={() => this.onEnter()}>
                Okay
              </Button>
            </Row>
          </span>
        ) : (
          this.props.closeJoinGroupModal() && this.redirect()
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
  }
};

const mapStateToProps = ({ GroupCodeModalReducer }) => {
  const {
    success,
    errorGroupCodeMessage,
    groupId,
    code
  } = GroupCodeModalReducer;
  return { success, errorGroupCodeMessage, groupId, code };
};

GroupCodeModal.propTypes = {
  success: PropTypes.any,
  groupId: PropTypes.any,
  errorGroupCodeMessage: PropTypes.any,
  code: PropTypes.any,
  addUserToGroup: PropTypes.func,
  setCode: PropTypes.func,
  closeJoinGroupModal: PropTypes.func
};

export default connect(mapStateToProps, {
  addUserToGroup,
  setCode,
  closeJoinGroupModal
})(GroupCodeModal);
