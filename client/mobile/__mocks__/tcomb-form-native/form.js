jest.mock('tcomb-form-native/lib', () => {
  const React = require('React');
  const t = require.requireActual('tcomb-form-native/lib');
  t.form.Form.stylesheet = {
    textbox: {
      normal: {},
      error: {},
    },
  };
  t.form.Component.prototype.render = function render() {
    return React.createElement(this.getTemplate().name, this.props);
  };
  return t;
});
