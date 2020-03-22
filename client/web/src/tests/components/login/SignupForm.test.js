import React from "react";
import SignupForm from "../../../components/login/SignupForm";
import { Form, Input, Button } from "antd";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<SignupForm.WrappedComponent {...props} />);
  return component;
};

describe("Testing the <SignupForm />", () => {
  describe("Testing Rendering without props", () => {
    let component;
    beforeEach(() => {
      component = setUp();
    });

    it("Component renders without error", () => {
      expect(component.length).toEqual(1);
    });

    it("Child components render without fail", () => {
      expect(component.find(".signup-form")).toHaveLength(1);
      expect(component.find(Form)).toHaveLength(1);
      expect(component.find(Form.Item)).toHaveLength(6);
      expect(component.find(Input)).toHaveLength(3);
      expect(component.find(Input.Password)).toHaveLength(2);
      expect(component.find(Button)).toHaveLength(1);
    });
  });

  describe("Testing function calls", () => {
    let component, props;
    beforeEach(() => {
      props = {
        authenticate: jest.fn()
      };
      component = setUp(props);
    });

    it("Tests authenticate function call", () => {
      const signUpSpy = jest.spyOn(component.instance(), "signUp");
      component.instance().signUp("data");
      expect(props.authenticate.mock.calls.length).toBe(1);
      expect(signUpSpy).toBeCalled();
    });

    it("Tests `onFinishFail`", () => {
      const failSpy = jest.spyOn(component.instance(), "onFinishFailed");
      component.instance().onFinishFailed("data");
      expect(failSpy).toBeCalled();
    });
  });

  it("Test error message", () => {
    const props = {
      errored: true,
      message: "Error Message!"
    };
    const component = setUp(props);
    expect(component.find(".error-message")).toHaveLength(1);
  });
});
