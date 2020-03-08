import React from "react";

import GroupList from "../../components/screens/GroupList/GroupList";
import configureStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

describe("CreateGroup, test groupInfoForm", () => {
  const initialState = {
    GroupListReducer: {
      groupList: "groupList"
    }
  };
  const mockStore = configureStore();
  let store, component;

  beforeEach(() => {
    store = mockStore(initialState);
    component = shallow(<GroupList store={store} />).dive();
  });

  it("should render GroupList", () => {
    expect(component.length).toEqual(1);
  });
});
