import React, { Component } from 'react';
import { Button } from 'antd';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';


export default class Login extends Component {
    state = { signUpSelected: false }

    close = () => {
        this.props.toggleModal(false)
    };

    render() {
        return (
            <div>
                {!this.state.signUpSelected ? (
                    <div>
                        <LoginForm />
                        <p>
                            Don't have an account? <Button type="link" onClick={() => {
                                this.setState({ signUpSelected: true })
                            }}> Sign Up</Button>
                        </p>
                    </div>
                ) : (
                        <div>
                            <SignupForm />
                            <p>
                                Have an account? <Button type="link" onClick={() => {
                                    this.setState({ signUpSelected: false })
                                }}> Log In</Button>
                            </p>
                        </div>
                    )}
            </div>
        );
    }

}
