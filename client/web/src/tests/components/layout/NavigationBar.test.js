import React from "react";
import NavigationBar from "../../../components/layout/NavigationBar";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import configureStore from "redux-mock-store";
import {
  Layout,
  Menu,
  Dropdown,
  Button,
  Avatar,
  message,
  Col,
  Row,
  List,
  Modal
} from "antd";
import { BrowserRouter as Router } from "react-router-dom";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const initialState = {
    NavigationBarReducer: {
      groupList: "groupList",
      showErrorModal: "errorModal",
      getGroupList: jest.fn(),
      closeErrorModal: jest.fn()
    },
    auth: {
      isAuthenticated: true,
      userName: "name",
      displayPicURL: "pic",
      authenticate: jest.fn(),
      logout: jest.fn()
    }
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  
  const component = shallow(<NavigationBar.WrappedComponent {...props} {...store} />);
  return component;
};

describe("Testing the <NavigationBar />", () => {
  let component, props;
  beforeEach(() => {
    props = {
      authenticate: jest.fn(),
      logout: jest.fn(),
      getGroupList: jest.fn()
    };
    component = setUp(props);
  });

  it("Component renders without error", () => {
    console.log(component.debug());
    expect(component.length).toEqual(1);
  });

  it("Tests if child componets render without error", () => {
    expect(component.find('.logo')).toHaveLength(1);
    expect(component.find(Menu)).toHaveLength(1);
    expect(component.find(Row)).toHaveLength(1);
    expect(component.find('.masthead-user')).toHaveLength(1);
  });
});
