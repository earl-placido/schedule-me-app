import React, {Component} from 'react';
import {Content} from 'native-base';
import t from 'tcomb-form-native';

import PropTypes from 'prop-types';

const Form = t.form.Form;

const groupOptions = {
  fields: {
    name: {
      error: 'Please input group name',
    },
    description: {
      multiline: true,
      stylesheet: {
        ...Form.stylesheet,
        textbox: {
          ...Form.stylesheet.textbox,
          normal: {
            ...Form.stylesheet.textbox.normal,
            height: 100,
            textAlignVertical: 'top',
          },
        },
      },
    },
  },
};

const Group = t.struct({
  name: t.String,
  description: t.maybe(t.String),
});

export default class GroupInfoForm extends Component {
  handleGroupInfoChange = () => {
    const value = this.form.getValue();

    this.props.handleGroupName(value ? value.name : '');

    if (value) {
      this.props.handleGroupDescription(value.description);
    }
  };

  render() {
    return (
      <Content padder>
        <Form
          ref={_form => (this.form = _form)}
          options={groupOptions}
          type={Group}
          onChange={this.handleGroupInfoChange}
          value={{
            name: this.props.groupName,
            description: this.props.groupDescription,
          }}
        />
      </Content>
    );
  }
}

GroupInfoForm.propTypes = {
  handleGroupName: PropTypes.func,
  handleGroupDescription: PropTypes.func,
  groupName: PropTypes.any,
  groupDescription: PropTypes.any,
};
