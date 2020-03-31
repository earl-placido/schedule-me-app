import React from "react";
import NavigationBar from "../../../components/layout/NavigationBar";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { Menu, Row, Modal } from "antd";

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
        isAuthenticated: false,
        state: { hideNav: false, showMenuMobile: false }
      };
      component = setUp(props);
    });

    it("Component renders without error", () => {
      expect(component.length).toEqual(1);
    });

    it("Tests if child components render without error", () => {
      expect(component.find("#icon")).toHaveLength(1);
      expect(component.find(Menu)).toHaveLength(1);
      expect(component.find(Row)).toHaveLength(1);
      expect(component.find("#auth-button")).toHaveLength(1);
      expect(component.find("#groupSubMenuWeb")).toHaveLength(1);
      expect(component.find("#createGroupWeb")).toHaveLength(1);
      expect(component.find("#joinGroupWeb")).toHaveLength(1);
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
      expect(component.find("#auth-button")).toHaveLength(1);
      component.find("#auth-button").simulate("click");
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
        groupList: [],
        state: { hideNav: false, showMenuMobile: false }
      };
      component = setUp(props);
    });

    it("Checks if user details render when logged in", () => {
      expect(component.find("#auth-button")).toHaveLength(0);
      expect(component.find("#icon")).toHaveLength(1);
      expect(component.find("#userName")).toHaveLength(1);
      expect(props.getGroupList.mock.calls.length).toBe(1);
    });

    it("Testing logoutUser function", () => {
      const logoutSpy = jest.spyOn(component.instance(), "logoutUser");
      component.instance().logoutUser();
      expect(props.logout.mock.calls.length).toBe(1);
      expect(logoutSpy).toBeCalled();
    });
  });
});
