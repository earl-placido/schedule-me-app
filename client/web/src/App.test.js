import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "./App";

configure({ adapter: new Adapter() });

test("Renders", () => {
  const mockStore = configureStore();
  const store = mockStore({
    auth: {}
  });
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
  wrapper.debug();
  expect(wrapper.find(".app")).toHaveLength(1);
});
