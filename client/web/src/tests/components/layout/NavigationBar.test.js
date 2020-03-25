import React from "react";
import NavigationBar from "../../../components/layout/NavigationBar";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { Menu, Dropdown, Row, Modal } from "antd";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<NavigationBar.WrappedComponent {...props} />);
  return component;
};

describe("Testing the <NavigationBar />", () => {
  describe("When not logged in", () => {
    let component, props;
    beforeEach(() => {
      props = {
        authenticate: jest.fn(),
        logout: jest.fn(),
        getGroupList: jest.fn(),
        closeErrorModal: jest.fn(),
        toggleModal: jest.fn(),
        isAuthenticated: false
      };
      component = setUp(props);
    });

    it("Component renders without error", () => {
      expect(component.length).toEqual(1);
    });

    it("Tests if child componets render without error", () => {
      expect(component.find(".logo")).toHaveLength(1);
      expect(component.find(Menu)).toHaveLength(1);
      expect(component.find(Row)).toHaveLength(1);
      expect(component.find(".masthead-user")).toHaveLength(1);
      expect(component.find(".nav-button")).toHaveLength(2);
      expect(component.find(Dropdown)).toHaveLength(1);
      expect(component.find(".dropdown-button")).toHaveLength(1);
      expect(component.find(Modal)).toHaveLength(1);
    });

    it("Testing if getGroupsList is called", () => {
      expect(props.getGroupList.mock.calls.length).toBe(1);
    });

    it("Testing loginUser function", () => {
      const loginSpy = jest.spyOn(component.instance(), "loginUser");
      component.instance().loginUser("data");
      expect(props.authenticate.mock.calls.length).toBe(1);
      expect(loginSpy).toBeCalled();
    });

    it("Testing closeErrorModal function", () => {
      const closeModalSpy = jest.spyOn(component.instance(), "closeErrorModal");
      component.instance().closeErrorModal();
      expect(props.closeErrorModal.mock.calls.length).toBe(1);
      expect(closeModalSpy).toBeCalled();
    });

    it("Testing the auth options displayed", () => {
      expect(component.find(".auth-button")).toHaveLength(1);
      component.find(".auth-button").simulate("click");
      expect(props.toggleModal.mock.calls.length).toBe(1);
    });
  });

  describe("When logged in", () => {
    let component, props;
    beforeEach(() => {
      props = {
        logout: jest.fn(),
        getGroupList: jest.fn(),
        isAuthenticated: true,
        userName: "myUserName",
        displayPicURL: "pic",
        groupList: []
      };
      component = setUp(props);
    });

    it("Checks if user details render when logged in", () => {
      expect(component.find(".auth-button")).toHaveLength(0);
      expect(component.find(Dropdown.Button)).toHaveLength(1);
      expect(component.find(".username")).toHaveLength(1);
      expect(component.find(".username").text()).toEqual(props.userName);
      expect(component.find(Dropdown).prop("overlay").props.dataSource).toEqual(
        props.groupList
      );
    });

    it("Testing logoutUser function", () => {
      const logoutSpy = jest.spyOn(component.instance(), "logoutUser");
      component.instance().logoutUser();
      expect(props.logout.mock.calls.length).toBe(1);
      expect(logoutSpy).toBeCalled();
    });
  });
});
