import React from "react";
import LoginModal from "../../../components/login/LoginModal";
import Login from "../../../components/login/LoginComponent";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<LoginModal.WrappedComponent {...props} />);
  return component;
};

describe("Testing the <LoginModal />", () => {
  let component, props;
  beforeEach(() => {
    props = {
      toggleModal: jest.fn()
    };
    component = setUp(props);
  });

  it("Component renders without error", () => {
    expect(component.length).toEqual(1);
  });

  it("Checks if child <Login > component renders", () => {
    expect(component.find(Login)).toHaveLength(1);
  });

  it("Tests if close function works", () => {
    const closeSpy = jest.spyOn(component.instance(), "close");
    component.instance().close();
    expect(closeSpy).toBeCalled();
    expect(props.toggleModal.mock.calls.length).toBe(1);
  });
});
