import React from "react";
import MeetingTimeModal from "../../screens/MeetingTimeModal";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<MeetingTimeModal {...props} />);
  return component;
};

describe("MeetingTimeModal tests", () => {
  let component, props;
  beforeEach(() => {
    props = {
      optimalTimes: [["1984-01-01:20130208T080910_20130208T080910"]],
      selectOptimalTime: jest.fn()
    };
    component = setUp(props);
  });

  it("should render MeetingTimeModal", () => {
    expect(component.length).toEqual(1);
    expect(component.find(".optimal-time-display")).toHaveLength(2);
  });

  it("Tests handleClick function", () => {
    const data = "test";
    const handleClickSpy = jest.spyOn(component.instance(), "handleClick");
    component.setState({ currentSelected: null });
    expect(component.state("currentSelected")).toEqual(null);
    component.instance().handleClick(data);
    expect(props.selectOptimalTime.mock.calls.length).toBe(1);
    expect(handleClickSpy).toBeCalled();
    expect(component.state("currentSelected")).toEqual(data);
  });

  it("Tests meeting time display", () => {
    const handleClickSpy = jest.spyOn(component.instance(), "handleClick");
    const meetingTimeDisplay = component.find("#meeting-time-display");
    expect(meetingTimeDisplay).toHaveLength(1);
    meetingTimeDisplay.simulate("click");
    component.instance().handleClick();
    expect(handleClickSpy).toBeCalled();
  });
});
