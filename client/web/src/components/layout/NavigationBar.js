import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Layout, Menu, Dropdown, Button, Avatar, message } from "antd";
import PropTypes from "prop-types";
import { toggleModal } from "../../actions/components/login/Modal.action";
import { authenticate, logout } from "../../actions/components/screens/Auth.action";

const { Header } = Layout;

export class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.logoutUser = this.logoutUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(response) {
    //This will have to be changed
    this.props.authenticate('google',response);
  }

  logoutUser() {
    this.props.logout();
    message.info("Logged out of account");
  }

  render() {
    const userMenu = (
      <Menu>
        <Menu.Item onClick={this.logoutUser}>Logout</Menu.Item>
      </Menu>
    );

    const userNavigation = this.props.isAuthenticated ? (
      <Dropdown.Button
        overlay={userMenu}
        icon={
          <Avatar
            size={16}
            icon={<img src={this.props.displayPicURL} alt="" />}
          />
        }
      >
        {this.props.userName}
      </Dropdown.Button>
    ) : (
      <div>
        <Button
          onClick={() => {
            this.props.toggleModal(true);
          }}
        >
          Login
        </Button>
      </div>
    );

    return (
      <Header style={headerStyle}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        ></Menu>

        <div className="masthead-user" style={{ float: "right" }}>
          {userNavigation}
        </div>
      </Header>
    );
  }
}

const headerStyle = {
  position: "fixed",
  zIndex: 3,
  width: "100%"
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.userName,
  displayPicURL: state.auth.displayPicURL,
  modalVisible: state.modalVisible
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  authenticate: (type, response) => dispatch(authenticate(type, response)),
  toggleModal: value => dispatch(toggleModal(value))
});

NavigationBar.propTypes = {
  history: PropTypes.any,
  userName: PropTypes.any,
  displayPicURL: PropTypes.any,
  isAuthenticated: PropTypes.any,
  authenticate: PropTypes.func,
  logout: PropTypes.func,
  modalVisible: PropTypes.any,
  toggleModal: PropTypes.func
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(NavigationBar);
