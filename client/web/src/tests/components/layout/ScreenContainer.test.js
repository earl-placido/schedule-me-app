import React from "react";
import ScreenContainer from "../../../components/layout/ScreenContainer";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<ScreenContainer {...props} />);
  return component;
};

describe("ScreenContainer tests", () => {
  let component, props;
  beforeEach(() => {
    props = {
      children: "I am child"
    };
    component = setUp(props);
  });

  it("should render ScreenContainer", () => {
    expect(component.length).toEqual(1);
  });

  it("tests handleResize", () => {
    const handleResizeSpy = jest.spyOn(component.instance(), "handleResize");
    component.setState({ lessPadding: false });
    component.instance().handleResize(200);
    expect(component.state("lessPadding")).toEqual(true);
    component.instance().handleResize(800);
    expect(component.state("lessPadding")).toEqual(false);
    expect(handleResizeSpy).toBeCalled();
  });
});
