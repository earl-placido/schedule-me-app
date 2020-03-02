import React, { Component } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import { connect } from 'react-redux';
import { toggleModal } from '../../actions/components/login/LoginModal.action'

class LoginModal extends Component {
    constructor(props) {
        super(props);
    }

    state = { signUpSelected: false }

    close = () => {
        this.props.toggleModal(false)
    };

    render() {
        return (
            <div>
                <Modal
                    title={this.state.signUpSelected ? ("Sign Up") : ("Log In")}
                    visible={this.props.modalVisible}
                    onCancel={() => {
                        this.props.toggleModal(false)
                    }}
                    footer={null}
                >

                    {!this.state.signUpSelected ? (
                        <div>
                            <LoginForm />
                            <p>
                                Don't have an account? <a onClick={() => {
                                    this.setState({ signUpSelected: true })
                                }}> Sign Up</a>
                            </p>
                        </div>
                    ) : (
                            <div>
                                <SignupForm />
                                <p>
                                    Have an account? <a onClick={() => {
                                        this.setState({ signUpSelected: false })
                                    }}> Log In</a>
                                </p>
                            </div>
                        )}
                </Modal>
            </div>
        );
    }

}

const mapStateToProps = ({ LoginModalReducer }) => {
    const { modalVisible } = LoginModalReducer;
    return { modalVisible };
};

LoginModal.propTypes = {
    modalVisible: PropTypes.any
};

export default connect(mapStateToProps, {toggleModal})(LoginModal);