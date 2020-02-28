
import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Button, message } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types'; 

import { logoutGoogle } from '../../actions/components/screens/Auth.action';

const { Header } = Layout;

export class NavigationBar extends Component {
    
	constructor(props) {
        super(props);

        this.logoutUser = this.logoutUser.bind(this);
        this.handleLoginButton = this.handleLoginButton.bind(this);
	}

    logoutUser() {
        this.props.logoutGoogle();
        message.info('Logged out of account');
    }

    handleLoginButton() {
        const { history } = this.props;
        history.push("/login");
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item key="1" onClick={this.logoutUser}>Logout</Menu.Item>
            </Menu>
        );

        const userDropdown = this.props.isAuthenticated ? (
             <Dropdown.Button overlay={menu} >
                {this.props.userName}
            </Dropdown.Button>
        ):
        (<Button onClick={this.handleLoginButton}>Login</Button>);

        return (
            <Header style={ headerStyle }>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                >
                </Menu>

                <div>
                    {userDropdown}
                </div>
            </Header>
        )
    }
}

const headerStyle = {
    position: 'fixed', 
    zIndex: 1, 
    width: '100%'
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
    userName: state.auth.userName,
    displayPicURL: state.auth.displayPicURL
});

const mapDispatchToProps = dispatch => ({
	logoutGoogle: () => dispatch(logoutGoogle())
});

NavigationBar.propTypes = {
    history: PropTypes.any,
    userName: PropTypes.any,
    isAuthenticated: PropTypes.any,
	logoutGoogle: PropTypes.func
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(NavigationBar);