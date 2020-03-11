import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Layout,
  Menu,
  Dropdown,
  Button,
  Avatar,
  message,
  Col,
  Row,
  Icon,
  List
} from "antd";
import PropTypes from "prop-types";
import { toggleModal } from "../../actions/components/login/LoginModal.action";
import { getGroupList } from "../../actions/components/screens/MainPage.action";
import {
  loginGoogle,
  logoutGoogle
} from "../../actions/components/screens/Auth.action";

const { Header } = Layout;

export class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.logoutUser = this.logoutUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(response) {
    this.props.loginGoogle(response);
  }

  logoutUser() {
    this.props.logoutGoogle();
    message.info("Logged out of account");
  }

  render() {
    const { headerStyle, listStyle } = styles;
    const groupMenu = (
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={this.props.groupList}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar size={25} icon={<Icon type="usergroup-add" />} />}
              title={
                <a href={"/groups/" + item.GroupId + "/"}>{item.GroupName}</a>
              }
              style={listStyle}
            />
          </List.Item>
        )}
      />
    );

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

        <Row>
          <Col span={2}>
            <Dropdown overlay={groupMenu} placement="bottomCenter">
              <Button>
                Groups <Icon type="down" />
              </Button>
            </Dropdown>
          </Col>
          <Col span={2}>
            <Button type="primary" href="/createGroup">
              Create A Group
            </Button>
          </Col>
          <Col span={2}>
            <Button type="primary">Join A Group</Button>
          </Col>
          <Col>
            <div className="masthead-user" style={{ float: "right" }}>
              {userNavigation}
            </div>
          </Col>
        </Row>
      </Header>
    );
  }
}

const styles = {
  headerStyle: {
    position: "fixed",
    zIndex: 1,
    width: "100%"
  },

  listStyle: {
    paddingRight: 40
  }
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.userName,
  displayPicURL: state.auth.displayPicURL,
  modalVisible: state.modalVisible,
  groupList: state.MainPageReducer.groupList
});

const mapDispatchToProps = dispatch => ({
  logoutGoogle: () => dispatch(logoutGoogle()),
  loginGoogle: response => dispatch(loginGoogle(response)),
  toggleModal: value => dispatch(toggleModal(value)),
  getGroupList: () => dispatch(getGroupList())
});

NavigationBar.propTypes = {
  history: PropTypes.any,
  userName: PropTypes.any,
  displayPicURL: PropTypes.any,
  isAuthenticated: PropTypes.any,
  groupList: PropTypes.any,
  modalVisible: PropTypes.any,
  loginGoogle: PropTypes.func,
  logoutGoogle: PropTypes.func,
  toggleModal: PropTypes.func,
  getGroupList: PropTypes.func
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(NavigationBar);
