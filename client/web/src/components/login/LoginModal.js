import React, { Component } from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";
import Login from "./Login";
import { connect } from "react-redux";
import { toggleModal } from "../../actions/components/login/Login.action";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = { signUpSelected: false };
  }

  close() {
    this.props.toggleModal(false);
  }

  render() {
    return (
      <div>
        <Modal
          title={"Login"}
          visible={this.props.modalVisible}
          onCancel={this.close}
          footer={null}
        >
          <Login />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ LoginReducer }) => {
  const { modalVisible } = LoginReducer;
  return { modalVisible };
};

LoginModal.propTypes = {
  modalVisible: PropTypes.any,
  toggleModal: PropTypes.func
};

export default connect(mapStateToProps, { toggleModal })(LoginModal);
