import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import configureStore from "redux-mock-store";

import {
  GO_NEXT_PAGE,
  GO_PREVIOUS_PAGE,
  UPDATE_GROUP_DESCRIPTION,
  UPDATE_MEETING_DURATION,
  UPDATE_MEETING_LOCATION,
  UPDATE_MEETING_FREQUENCY,
  UPDATE_GROUP_NAME
} from "../../actions/components/screens/CreateGroup.action";
import CreateGroup from "../../components/screens/CreateGroup/CreateGroup";

configure({ adapter: new Adapter() });

describe("CreateGroup, test groupInfoForm", () => {
  const initialState = {
    CreateGroupReducer: {
      groupName: "groupName",
      groupDescription: "groupDescription",
      duration: "duration",
      frequency: "frequency",
      location: "location",
      success: true,
      currentPage: 0
    }
  };
  const mockStore = configureStore();
  let store, component;

  beforeEach(() => {
    store = mockStore(initialState);
    component = shallow(<CreateGroup store={store} />).dive();
  });

  it("should render CreateGroup", () => {
    expect(component.length).toEqual(1);
  });

  it("should contain appropriate properties from redux", () => {
    expect(component.props().groupName).toEqual("groupName");
    expect(component.props().groupDescription).toEqual("groupDescription");
    expect(component.props().duration).toEqual("duration");
    expect(component.props().frequency).toEqual("frequency");
    expect(component.props().location).toEqual("location");
    expect(component.props().success).toEqual(true);
    expect(component.props().currentPage).toEqual(0);
  });

  it("should run goNextPage in CreateGroup", () => {
    component
      .dive()
      .find("#nextButton")
      .simulate("click");
    expect(store.getActions()[0].type).toEqual(GO_NEXT_PAGE);
  });

  it("should run goPreviousPage in CreateGroup", () => {
    component
      .dive()
      .find("#previousButton")
      .simulate("click");
    expect(store.getActions()[0].type).toEqual(GO_PREVIOUS_PAGE);
  });

  it("should run updateGroupName in CreateGroup", () => {
    component
      .dive()
      .find("GroupInfoForm")
      .dive()
      .find("#groupNameInput")
      .simulate("change", { target: { value: "changed" } });
    expect(store.getActions()[0].type).toEqual(UPDATE_GROUP_NAME);
  });

  it("should run updateGroupDescription in CreateGroup", () => {
    component
      .dive()
      .find("GroupInfoForm")
      .dive()
      .find("#groupDescriptionInput")
      .simulate("change", { target: { value: "changed" } });
    expect(store.getActions()[0].type).toEqual(UPDATE_GROUP_DESCRIPTION);
  });
});

describe("Create group test GroupMeetingForm", () => {
  const initialState = {
    CreateGroupReducer: {
      groupName: "groupName",
      groupDescription: "groupDescription",
      duration: "duration",
      meeting: "meeting",
      location: "location",
      success: true,
      currentPage: 1
    }
  };
  const mockStore = configureStore();
  let store, component;

  beforeEach(() => {
    store = mockStore(initialState);
    component = shallow(<CreateGroup store={store} />).dive();
  });

  it("should run updateMeetingDuration in CreateGroup", () => {
    component
      .dive()
      .find("GroupMeetingForm")
      .dive()
      .find("#duration")
      .simulate("change", { target: { value: "changed" } });
    expect(store.getActions()[0].type).toEqual(UPDATE_MEETING_DURATION);
  });

  it("should run udateMeetingFrequency in CreateGroup", () => {
    component
      .dive()
      .find("GroupMeetingForm")
      .dive()
      .find("#frequency")
      .simulate("change", { target: { value: "changed" } });
    expect(store.getActions()[0].type).toEqual(UPDATE_MEETING_FREQUENCY);
  });

  it("should run updateMeetingLocation in CreateGroup", () => {
    component
      .dive()
      .find("GroupMeetingForm")
      .dive()
      .find("#location")
      .simulate("change", { target: { value: "changed" } });
    expect(store.getActions()[0].type).toEqual(UPDATE_MEETING_LOCATION);
  });
});
