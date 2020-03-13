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
  List
} from "antd";
import { DownOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { toggleModal } from "../../actions/components/login/LoginModal.action";
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

  chooseStyle(array, noDataStyle, listStyle) {
    return array && array.length > 0 ? listStyle : noDataStyle;
  }

  render() {
    const { headerStyle, listStyle, noDataStyle } = styles;
    const groupMenu = (
      <List
        locale={{ emptyText: "You have not joined any groups.." }}
        size="small"
        itemLayout="horizontal"
        dataSource={this.props.groupList}
        style={
          this.props.groupList && this.props.groupList.length > 0
            ? listStyle
            : noDataStyle
        }
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar size={25} icon={<UsergroupAddOutlined />} />}
              title={
                <a href={"/groups/" + item.GroupId + "/"}>{item.GroupName}</a>
              }
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
        href="/main"
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
          <Col xs={6} sm={5} md={5} lg={4} xl={4}>
            <Dropdown overlay={groupMenu} placement="bottomCenter">
              <Button>
                Groups <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
          <Col xs={6} sm={7} md={5} lg={4} xl={4}>
            <Button type="primary" href="/createGroup">
              Create A Group
            </Button>
          </Col>
          <Col xs={6} sm={8} md={10} lg={12} xl={12}>
            <Button type="primary">Join A Group</Button>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3} xl={3}>
            <div className="masthead-user">{userNavigation}</div>
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
  },

  noDataStyle: {
    padding: 30
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
  toggleModal: value => dispatch(toggleModal(value))
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
  toggleModal: PropTypes.func
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(NavigationBar);
