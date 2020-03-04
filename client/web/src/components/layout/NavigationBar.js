import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { GoogleLogin } from 'react-google-login';
import { Layout, Menu, Dropdown, Button, Avatar, message, Icon } from 'antd';
import PropTypes from 'prop-types';
import { toggleModal } from '../../actions/components/login/LoginModal.action'
import { loginGoogle, logoutGoogle } from '../../actions/components/screens/Auth.action';

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
        message.info('Logged out of account');
    }

    render() {
        const userMenu = (
            <Menu>
                <Menu.Item onClick={this.logoutUser}>Logout</Menu.Item>
            </Menu>
        );

        const userNavigation = this.props.isAuthenticated ? (
             <Dropdown.Button overlay={userMenu} icon={<Avatar size={16} icon={<img src={this.props.displayPicURL} alt=""/>}/>} >
                {this.props.userName}
            </Dropdown.Button>
        ):
        (<div>
            <Button onClick={()=>{
                this.props.toggleModal(true)
            }}>Login</Button>
        </div>);

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

                <div className="masthead-user" style={{float: "right"}}>
                    {userNavigation}
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
	logoutGoogle: () => dispatch(logoutGoogle()),
    loginGoogle: response => dispatch(loginGoogle(response))
});

NavigationBar.propTypes = {
    history: PropTypes.any,
    userName: PropTypes.any,
    displayPicURL: PropTypes.any,
    isAuthenticated: PropTypes.any,
	loginGoogle: PropTypes.func,
	logoutGoogle: PropTypes.func
};

export default compose(
    withRouter,
    connect(mapStateToProps,{toggleModal}, mapDispatchToProps)
)(NavigationBar);