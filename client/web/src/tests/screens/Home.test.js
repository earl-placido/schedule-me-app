import React from "react";
import Home from "../../components/screens/Home/Home";
import Login from "../../components/login/Login";
import Adapter from "enzyme-adapter-react-16";
import { Layout, Button } from "antd";
const { Content } = Layout;
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

describe("Testing the <Home/>", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  it("Test if component renders properly", () => {
    expect(wrapper.length).toEqual(1);
  });

  it("Checks if core child components rendered", () => {
    expect(wrapper.find(Login)).toHaveLength(1);
    expect(wrapper.find(Content)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it("Testing the `handleHttps` function", () => {
    const handleHttpsSpy = jest.spyOn(wrapper.instance(), "handleHttps");
    wrapper.instance().handleHttps();
    expect(handleHttpsSpy).toBeCalled();
  });

  it("Testing the `openRedirectMessage` function", () => {
    const openMessageSpy = jest.spyOn(
      wrapper.instance(),
      "openRedirectMessage"
    );
    wrapper.instance().openRedirectMessage();
    expect(openMessageSpy).toBeCalled();
  });

  it("Tests if `httpsRedirect` actually works", () => {
    let protocol = "https:";
    wrapper.instance().handleHttps(protocol);
    jest.useFakeTimers();
    jest.advanceTimersByTime(6000);
    expect(window.location.protocol).toEqual("http:");
  });
});
