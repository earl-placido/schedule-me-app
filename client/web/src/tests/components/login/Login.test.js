import React from "react";
import Login from "../../../components/login/Login";
import LoginForm from "../../../components/login/LoginForm";
import SignupForm from "../../../components/login/SignupForm";
import { GoogleLogin } from "react-google-login";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { Redirect } from "react-router";

configure({ adapter: new Adapter() });

const setUp = (props={}, store={}) => {
  const component = shallow(<Login.WrappedComponent {...props} {... store}/>);
  return component;
}

describe("Testing the <Login />", () => {
  describe("Testing Rendering without props", () => {
    let component;
    beforeEach(()=>{
      component = setUp();
    });
  
    it("Component renders without error", ()=>{
      expect(component.length).toEqual(1);
    });
  
    it("Renders <Login />", ()=>{
      expect(component.find(LoginForm)).toHaveLength(1);
    });
  
    it("Renders <SignupForm />", ()=>{
      component.setState({ signUpSelected : true })
      expect(component.find(SignupForm)).toHaveLength(1);
    });
  
    it("Renders form toggle buttons", ()=>{
      component.setState({ signUpSelected : true })
      expect(component.find('.login-toggle')).toHaveLength(1)
    });
  
    it("Renders form toggle buttons", ()=>{
      component.setState({ signUpSelected : false })
      expect(component.find('.signup-toggle')).toHaveLength(1)
    });

    it("Renders Google Login component", ()=>{
      expect(component.find(GoogleLogin)).toHaveLength(1);
    });

    it("Check if render in GoogleLogin is called", () =>{
      expect(component.find(GoogleLogin).dive().find('.google-button')).toHaveLength(1);
    })

    it("Test <SignupForm /> toggle", () => {
      component.setState({ signUpSelected : false })
      component.find('.signup-toggle').simulate('click');
      expect(component.state('signUpSelected')).toEqual(true)
    });

    it("Test <LoginForm /> toggle", () => {
      component.setState({ signUpSelected : true })
      component.find('.login-toggle').simulate('click');
      expect(component.state('signUpSelected')).toEqual(false)
    });
  });

  describe("Test <Login /> with props", () => {
    it("Redirects if you are on home page after authentication", () =>{
      const props = {
        isAuthenticated : true, 
        location : {
          pathname : "/" 
        }
      }
      const component = setUp(props);
      expect(component.find(Redirect)).toHaveLength(1);
    });

    it("Does not redirect if not on home page after authentication", () =>{
      const props = {
        isAuthenticated : true, 
        location : {
          pathname : "/other" 
        }
      }
      const component = setUp(props);
      expect(component.find(Redirect)).toHaveLength(0);
    })

    it("Test loginWithGoodle function", () => {
      const props = {
        authenticate : jest.fn()
      }
      const component = setUp(props);
      component.instance().loginWithGoogle("resp");
      expect(props.authenticate.mock.calls.length).toBe(1)
    });
  });
});
