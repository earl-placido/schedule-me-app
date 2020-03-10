import React from "react";

import MainPage from "../../components/screens/MainPage/MainPage";
import configureStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

describe("MainPage, test groupInfoForm", () => {
  const initialState = {
    MainPageReducer: {
      groupList: "groupList"
    }
  };
  const mockStore = configureStore();
  let store, component;

  beforeEach(() => {
    store = mockStore(initialState);
    component = shallow(<MainPage store={store} />).dive();
  });

  it("should render GroupList", () => {
    expect(component.length).toEqual(1);
  });
});
