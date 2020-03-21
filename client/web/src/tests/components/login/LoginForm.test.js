import React from "react";
import LoginForm from "../../../components/login/LoginForm";
import { Form, Input, Button } from "antd";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

const setUp = (props={}) => {
  const component = shallow(<LoginForm.WrappedComponent {...props} />);
  return component;
}

describe("Testing the <LoginForm />", () => {
  describe("Testing Rendering without props", () => {
    let component;
    beforeEach(()=>{
      component = setUp();
    });
  
    it("Component renders without error", ()=>{
      expect(component.length).toEqual(1);
    });

    it("Child components render without fail", ()=>{
      expect(component.find(".login-form")).toHaveLength(1);
      expect(component.find(Form)).toHaveLength(1);
      expect(component.find(Form.Item)).toHaveLength(3);
      expect(component.find(Input)).toHaveLength(1);
      expect(component.find(".input-email")).toHaveLength(1);
      expect(component.find(Input.Password)).toHaveLength(1);
      expect(component.find(".input-password")).toHaveLength(1);
      expect(component.find(Button)).toHaveLength(1);
      expect(component.find(".input-submit")).toHaveLength(1);
    });
  });

  describe("Testing functionality", () => {
    let component, props;
    beforeEach(()=>{
      props = {
        authenticate : jest.fn()
      }
      component = setUp(props);
    });
    
    it("Tests authenticate function call", () =>{
      const loginSpy = jest.spyOn(component.instance(), 'loginWithEmail');
      component.instance().loginWithEmail("data");
      expect(props.authenticate.mock.calls.length).toBe(1);
      expect(loginSpy).toBeCalled();
    });
  })

  it("Test error message", () => {
    const props = {
      errored : true,
      message : "Error Message!"
    }
    const component = setUp(props);
    expect(component.find('.error-message')).toHaveLength(1);
  });
});
