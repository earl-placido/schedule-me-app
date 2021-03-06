import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";

import GroupMeetingForm from "../../../../components/groups/GroupMeetingForm";

configure({ adapter: new Adapter() });

describe("test Group Meeting Form", () => {
  const mockStore = configureStore();
  const INITIAL_STATE = { test: "test" };
  let store, component;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    component = shallow(<GroupMeetingForm store={store} />).dive();
  });

  it("render group meeting form", () => {
    expect(component.length).toEqual(1);
  });
});
