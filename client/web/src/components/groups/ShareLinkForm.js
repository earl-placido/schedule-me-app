import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';


class ShareLinkForm extends Component {
    render() {
        return (
            <div className='center-container'>
                <h3>Your group has been created! The link for the group can be found here:</h3>
                <Input value={this.props.link}/>
            </div>
        );
    }
}

ShareLinkForm.propTypes = {
    link: PropTypes.any
};

export default ShareLinkForm;