jest.mock('tcomb-form-native/lib', () => {
  const t = require.requireActual('tcomb-form-native/lib');
  t.form.Form.stylesheet = {
    textbox: {
      normal: {},
      error: {},
    },
  };
  return t;
});
