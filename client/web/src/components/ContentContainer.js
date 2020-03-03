import React, { Component } from 'react';
import { Layout, Menu, Button } from 'antd';

import LoginModal from './login/LoginModal';
import PropTypes from 'prop-types';

import { toggleModal } from '../actions/components/login/LoginModal.action'
import { connect } from 'react-redux';

const { Header, Content } = Layout;

class ContentContainer extends Component {
    render() {
        const { headerStyle, contentStyle, containerStyle } = styles

        return (
            <div>
                <Header style={headerStyle}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >

                        <Button type="primary" onClick={() => {this.props.toggleModal(true)}} style={{float:"right", marginTop: 15}}>
                            Sign In
                        </Button>
                    </Menu>
                </Header>

                <Content style={contentStyle}>
                    <div style={containerStyle}>
                        {this.props.children}
                    </div>
                </Content>

                <LoginModal/>
            </div>
        );
    }
}

const styles = {
    headerStyle: {
        position: 'fixed',
        zIndex: 1,
        width: '100%'
    },

    contentStyle: {
        padding: '0 50px',
        marginTop: 90
    },

    containerStyle: {
        background: '#fff',
        padding: 24,
        minHeight: 500,
        marginTop: 20
    },

    footerStyle: {
        textAlign: 'center'
    }
}

const mapStateToProps = ({ LoginModalReducer }) => {
    const { modalVisible } = LoginModalReducer;
    return { modalVisible };
};

ContentContainer.propTypes = {
    modalVisible: PropTypes.any
};

export default connect(mapStateToProps, { toggleModal })(ContentContainer);