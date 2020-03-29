import { Layout, Menu, Button, Avatar, message, Col, Row, Modal } from "antd";
import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import { toggleModal } from "../../actions/components/login/Modal.action";
import { authenticate, logout } from "../../actions/Auth.action";
import {
  getGroupList,
  closeErrorModal
} from "../../actions/components/layout/NavigationBar.action";

const { Header } = Layout;
const { SubMenu } = Menu;

export class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.state = { hideNav: false, showMenuMobile: false };
  }

  handleResize = () => {
    if (window.innerWidth <= 760) {
      this.setState({ hideNav: true });
    } else {
      this.setState({ hideNav: false });
    }
  };

  componentDidMount() {
    this.props.getGroupList();
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  loginUser(response) {
    //This will have to be changed
    this.props.authenticate("google", response);
  }

  logoutUser() {
    this.props.logout();
    message.info("Logged out of account");
  }

  closeErrorModal = () => {
    this.props.closeErrorModal();
  };

  renderGroupMenuItem = group => {
    return (
      <Menu.Item key={group.GroupId}>
        <a href={"/groups/" + group.GroupId + "/"}>{group.GroupName}</a>
      </Menu.Item>
    );
  };

  userNavigation = () => {
    const { floatRight } = styles;
    return this.props.isAuthenticated ? (
      <SubMenu
        id="userName"
        style={floatRight}
        title={
          <Row>
            <Col pull={2}>{this.props.userName}</Col>
            <Col>
              <Avatar
                size={32}
                icon={<img src={this.props.displayPicURL} alt="user picture" />}
              />
            </Col>
          </Row>
        }
      >
        <Menu.Item onClick={this.logoutUser}>Log Out</Menu.Item>
      </SubMenu>
    ) : (
      <Menu.Item
        id="auth-button"
        onClick={() => {
          this.props.toggleModal(true);
        }}
      >
        Login
      </Menu.Item>
    );
  };

  renderNavMenuWeb = () => {
    const { menuStyle, noSidePadding, headerStyle } = styles;
    return (
      <Header style={headerStyle}>
        <Row>
          <Menu theme="dark" mode="horizontal" style={menuStyle}>
            <Menu.Item id="icon" style={noSidePadding}>
              <a href="/main/">
                <img
                  aria-hidden="true"
                  src={process.env.PUBLIC_URL + "/icons/FULL-LOGO1.png"}
                  width="45px"
                  alt="user picture"
                />
              </a>
            </Menu.Item>
            <SubMenu
              id="groupSubMenuWeb"
              title={
                <span>
                  Groups <DownOutlined />
                </span>
              }
            >
              {this.props.groupList ? (
                this.props.groupList.map(group => {
                  return this.renderGroupMenuItem(group);
                })
              ) : (
                <Menu.Item>You have not joined any groups</Menu.Item>
              )}
            </SubMenu>
            <Menu.Item id="createGroupWeb">
              <a href="/createGroup/">Create A Group</a>
            </Menu.Item>
            <Menu.Item id="joinGroupWeb">Join A Group</Menu.Item>
            {this.userNavigation()}
          </Menu>
        </Row>
      </Header>
    );
  };

  renderNavMenuMobile = () => {
    return (
      <span>
        {!this.state.showMenuMobile ? (
          <Menu theme="dark" mode="inline">
            <Menu.Item
              id="icon"
              onClick={() => {
                this.setState({ showMenuMobile: true });
              }}
            >
              <Row justify="center">
                <img
                  aria-hidden="true"
                  src={process.env.PUBLIC_URL + "/icons/FULL-LOGO1.png"}
                  width="40px"
                  alt="user picture"
                />
              </Row>
            </Menu.Item>
          </Menu>
        ) : (
          <span>
            <Menu theme="dark" mode="inline">
              <Menu.Item
                id="icon"
                onClick={() => {
                  this.setState({ showMenuMobile: false });
                }}
              >
                <Row justify="center">
                  <img
                    aria-hidden="true"
                    src={process.env.PUBLIC_URL + "/icons/FULL-LOGO1.png"}
                    width="40px"
                    alt="user picture"
                  />
                </Row>
              </Menu.Item>
              <SubMenu id="groupSubMenuMobile" title={<span>Groups</span>}>
                {this.props.groupList ? (
                  this.props.groupList.map(group => {
                    return this.renderGroupMenuItem(group);
                  })
                ) : (
                  <Menu.Item>You have not joined any groups</Menu.Item>
                )}
              </SubMenu>
              <Menu.Item id="createGroupMobile">
                <a href="/createGroup/">Create A Group</a>
              </Menu.Item>
              <Menu.Item id="joinGroupMobile">Join A Group</Menu.Item>
              <Menu.Item onClick={this.logoutUser} id="logOutMobile">
                Log Out
                <Row>
                  <Col pull={2}>Log Out</Col>
                  <Col>
                    <Avatar
                      size={32}
                      icon={<img src={this.props.displayPicURL} alt="" />}
                    />
                  </Col>
                </Row>
              </Menu.Item>
            </Menu>
          </span>
        )}
      </span>
    );
  };

  render() {
    const { layoutStyle } = styles;

    return (
      <Layout style={layoutStyle}>
        {!this.state.hideNav
          ? this.renderNavMenuWeb()
          : this.renderNavMenuMobile()}
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
      </Layout>
    );
  }
}

const styles = {
  headerStyle: {
    zIndex: 25
  },

  fixedPosition: {
    position: "fixed"
  },

  noSidePadding: {
    paddingLeft: 0
  },

  oldAntColStyle: {
    flex: "0 1 auto"
  },

  menuStyle: {
    margin: 0,
    paddingTop: 10,
    color: "#ffffff",
    width: "100%"
  },

  layoutStyle: {
    background: "transparent"
  },

  bottomPadding: {
    paddingBottom: 25
  },

  floatRight: {
    float: "right"
  },

  floatLeft: {
    float: "left"
  }
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.userName,
  displayPicURL: state.auth.displayPicURL,
  modalVisible: state.modalVisible,
  groupList: state.NavigationBarReducer.groupList,
  showErrorModal: state.NavigationBarReducer.showErrorModal
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  authenticate: (type, response) => dispatch(authenticate(type, response)),
  toggleModal: value => dispatch(toggleModal(value)),
  getGroupList: () => dispatch(getGroupList()),
  closeErrorModal: () => dispatch(closeErrorModal())
});

NavigationBar.propTypes = {
  history: PropTypes.any,
  userName: PropTypes.any,
  displayPicURL: PropTypes.any,
  isAuthenticated: PropTypes.any,
  showErrorModal: PropTypes.any,
  authenticate: PropTypes.func,
  logout: PropTypes.func,
  modalVisible: PropTypes.any,
  groupList: PropTypes.any,
  toggleModal: PropTypes.func,
  getGroupList: PropTypes.func,
  closeErrorModal: PropTypes.func
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(NavigationBar);
