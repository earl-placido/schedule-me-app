import {
  Layout,
  Menu,
  Dropdown,
  Button,
  Avatar,
  message,
  Col,
  Row,
  List,
  Modal
} from "antd";
import {
  DownOutlined,
  UsergroupAddOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import { toggleModal } from "../../actions/components/login/Modal.action";
import {
  authenticate,
  logout
} from "../../actions/Auth.action";
import {
  getGroupList,
  closeErrorModal
} from "../../actions/components/layout/NavigationBar.action";

const { Header } = Layout;

export class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.logoutUser = this.logoutUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  componentDidMount() {
    this.props.getGroupList();
  }

  loginUser(response) {
    //This will have to be changed
    this.props.authenticate("google", response);
  }

  logoutUser() {
    this.props.logout();
    message.info("Logged out of account");
  }

  chooseStyle(array, noDataStyle, listStyle) {
    return array && array.length > 0 ? listStyle : noDataStyle;
  }

  closeErrorModal = () => {
    this.props.closeErrorModal();
  };

  render() {
    const { headerStyle, listStyle, noDataStyle } = styles;
    const groupMenu = (
      <List
        locale={{ emptyText: "You have not joined any groups" }}
        size="small"
        itemLayout="horizontal"
        dataSource={this.props.groupList}
        selectable={"true"}
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

        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col>
            <Dropdown overlay={groupMenu} placement="bottomCenter">
              <Button>
                Groups <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
          <Col flex="100px">
            <Button type="primary" href="/createGroup">
              Create A Group
            </Button>
          </Col>
          <Col>
            <Button type="primary">Join A Group</Button>
          </Col>
          <Col flex="auto"></Col>
          <Col flex="100px">
            <div className="masthead-user">{userNavigation}</div>
          </Col>
        </Row>
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
