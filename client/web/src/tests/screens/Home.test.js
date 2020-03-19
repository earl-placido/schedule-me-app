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
    wrapper = shallow(<Home/>);
  });

  it("Test if component renders properly", () => {
    expect(wrapper.length).toEqual(1);
  });

  it("Renders Login", () => {
    expect(wrapper.find(Login)).toHaveLength(1);
  });

  it("Renders `Continue as Guest` button", () => {
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it("Renders `Content` container", () => {
    expect(wrapper.find(Content)).toHaveLength(1);
  });
});
