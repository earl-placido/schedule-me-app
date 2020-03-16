import React from "react";
import Home from "../../components/screens/Home/Home";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

describe("Testing the Home page", () => {
  let wrapper;
  beforeEach(() => {wrapper = shallow(<Home/>);});

  it("includes ")
});
