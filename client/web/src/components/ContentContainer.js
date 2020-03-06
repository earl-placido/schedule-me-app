import React, { Component } from 'react';
import { Layout } from 'antd';

import LoginModal from './login/LoginModal';
import PropTypes from 'prop-types';
import NavigationBar from './layout/NavigationBar'
import { toggleModal } from '../actions/components/login/LoginModal.action'
import { connect } from 'react-redux';

const { Content } = Layout;

class ContentContainer extends Component {
    render() {
        const { contentStyle, containerStyle } = styles
        return (
            <div>
                <NavigationBar/>

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
    modalVisible: PropTypes.any,
    children: PropTypes.any
};

export default connect(mapStateToProps, { toggleModal })(ContentContainer); 