import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import moment from "moment";

import Group from "../../components/screens/Group/InputAvailability";
import {
  SHOW_MODAL,
  SELECT_DATE,
  CHANGE_RANGE,
  ADD_AVAILABILITY,
  ADD_RANGE,
  DELETE_AVAILABILITY
} from "../../actions/components/screens/InputAvailability.action";

configure({ adapter: new Adapter() });

describe("test group", () => {
  let store, component;
  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    const mockStore = configureStore([thunk]);
    store = mockStore({
      AddAvailabilityReducer: {
        modalVisible: false,
        rangeHours: [[-1, [moment(), moment()]]],
        selectedDate: moment(),
        availableDays: {},
        groupInformation: ""
      }
    });
    component = shallow(
      <Group store={store} match={{ params: { id: 1000000 } }} />
    ).dive();
  });

  it("test proper render of Group", () => {
    expect(component.length).toEqual(1);
  });

  it("test render appropriate properties from redux", () => {
    expect(component.props().modalVisible).toEqual(false);
    expect(component.props().rangeHours.length).toEqual(1);
    expect(component.props().availableDays).toEqual({});
    expect(component.props().groupInformation).toEqual("");
  });

  it("test if add availability button show modal", () => {
    component
      .dive()
      .find("#show-modal-button")
      .simulate("click");
    expect(store.getActions()[0].type).toEqual(SHOW_MODAL);
  });

  it("test if selecting calendar update the selectedDate", () => {
    component
      .dive()
      .instance()
      .onSelect(moment());
    expect(store.getActions()[0].type).toEqual(SELECT_DATE);
  });

  it("test if click cancel on modal disable modal visible", () => {
    component
      .dive()
      .instance()
      .handleCancel();
    expect(store.getActions()[0].type).toEqual(SHOW_MODAL);
  });

  it("test click delete on rangeHours", () => {
    component
      .dive()
      .instance()
      .handleDelete();
    expect(store.getActions()[0].type).toEqual(DELETE_AVAILABILITY);
  });

  it("test click add on rangeHours", () => {
    component
      .dive()
      .instance()
      .handleAdd();
    expect(store.getActions()[0].type).toEqual(ADD_RANGE);
  });

  it("test change range", () => {
    component
      .dive()
      .instance()
      .onChangeRange(0, [moment(), moment()]);
    expect(store.getActions()[0].type).toEqual(CHANGE_RANGE);
  });
});
