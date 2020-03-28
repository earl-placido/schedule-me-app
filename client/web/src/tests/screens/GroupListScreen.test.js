import React from "react";
import { Card, List, Modal } from "antd";
import GroupListScreen from "../../screens/GroupListScreen";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<GroupListScreen.WrappedComponent {...props} />);
  return component;
};

describe("Testing <GroupListScreen>", () => {
  let component, props;
  beforeEach(() => {
    props = {
      getGroupList: jest.fn(),
      closeErrorModal: jest.fn(),
      groupList: []
    };

    component = setUp(props);
  });

  it("should render GroupList", () => {
    expect(component.length).toEqual(1);
  });

  it("Tests if child components register core child components", () => {
    expect(component.find(Card)).toHaveLength(1);
    expect(component.find(List)).toHaveLength(1);
    expect(component.find(Modal)).toHaveLength(1);
  });

  it("Testing if getGroupsList is called", () => {
    expect(props.getGroupList.mock.calls.length).toBe(1);
  });

  it("Tests if groupList is empty", () => {
    const groupList = component
      .find(List)
      .dive()
      .dive()
      .find(".ant-list-items");
    expect(groupList.find("a")).toHaveLength(0);
  });

  it("Tests closeErrorModal function", () => {
    const closeModalSpy = jest.spyOn(component.instance(), "closeErrorModal");
    component.instance().closeErrorModal();
    expect(props.closeErrorModal.mock.calls.length).toBe(1);
    expect(closeModalSpy).toBeCalled();
  });
});

it("Tests if the number of items rendered matches the number of groups", () => {
  const props = {
    getGroupList: jest.fn(),
    groupList: [1, 2, 3]
  };

  const component = setUp(props);
  const groupList = component
    .find(List)
    .dive()
    .dive()
    .find(".ant-list-items");
  expect(groupList.find("a")).toHaveLength(props.groupList.length);
});
