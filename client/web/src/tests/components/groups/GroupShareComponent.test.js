import React from "react";
import GroupShareComponent from "../../../components/groups/GroupShareComponent";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<GroupShareComponent {...props} />);
  return component;
};

describe("GroupShareComponent tests", () => {
  let component, props;
  beforeEach(() => {
    props = {
      link: "test.com"
    };
    component = setUp(props);
  });

  it("should render ScreenContainer", () => {
    expect(component.length).toEqual(1);
    console.log(component.debug())
  });

  it("Test functions calls", () => {
    const retLinkSpy = jest.spyOn(component.instance(), "retrieveCodeFromLink");
    const successSpy = jest.spyOn(component.instance(), "success");
    component.instance().retrieveCodeFromLink(props.link);
    expect(retLinkSpy).toBeCalled();
    component.instance().success();
    expect(successSpy).toBeCalled();
  });
});


