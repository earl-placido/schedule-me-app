import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import GroupDetail from "../../screens/GroupScreen";
import configureStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

describe("GroupDetail, test groupDetailReducer", () => {
  const initialState = {
    GroupDetailReducer: {
      groupMembers: "groupMembers"
    }
  };
  const mockStore = configureStore();
  let store, component;

  beforeEach(() => {
    store = mockStore(initialState);
    component = shallow(
      <Router>
        <GroupDetail store={store} />
      </Router>
    ).dive();
  });

  it("should render GroupDetail", () => {
    expect(component.length).toEqual(1);
  });
});
