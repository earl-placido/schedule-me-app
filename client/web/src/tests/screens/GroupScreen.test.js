import React from "react";
import { Card, List } from "antd";
import GroupScreen from "../../screens/GroupScreen";
import MeetingTimeModal from "../../screens/MeetingTimeModal";
import InputAvailability from "../../components/InputAvailabilityModal";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<GroupScreen.WrappedComponent {...props} />);
  return component;
};

describe("Testing the Group Details Screen", () => {
  let component, props;
  beforeEach(() => {
    props = {
      getGroup: jest.fn(),
      getGroupMembers: jest.fn(),
      groupMembers: [1, 2, 3],
      getSelfMember: jest.fn(),
      getMeetings: jest.fn(),
      showModal: jest.fn(),
      closeModal: jest.fn(),
      closeErrorModal: jest.fn(),
      setOptimalTime: jest.fn(),
      getOptimalTime: jest.fn(),
      selectMeeting: jest.fn(),
      inputModalVisible: false,
      meetingModalVisible: false,
      meetings: [1],
      showErrorModal: false,
      group: {
        Groupname: "Lorem Ipsum"
      },
      selfMember: {
        MemberRole: "AD"
      },
      match: {
        params: {
          id: 1000000
        }
      }
    };

    component = setUp(props);
  });

  it("should render GroupScreen", () => {
    expect(component.length).toEqual(1);
  });

  it("Testing if mock functions are called when component mounts", () => {
    expect(props.getGroup.mock.calls.length).toBe(1);
    expect(props.getGroupMembers.mock.calls.length).toBe(1);
    expect(props.getSelfMember.mock.calls.length).toBe(1);
    expect(props.getMeetings.mock.calls.length).toBe(1);
  });

  it("Testing if core child components render", () => {
    expect(component.find(Card)).toHaveLength(1);
    expect(component.find("#input-availability-modal")).toHaveLength(1);
    expect(component.find("#meeting-time-modal")).toHaveLength(1);
    expect(component.find("#error-modal")).toHaveLength(1);
    expect(component.find("#group-name")).toHaveLength(1);
    expect(component.find("#input-availability-button")).toHaveLength(1);
    expect(component.find("#show-code-button")).toHaveLength(1);
  });

  it("Tests closeErrorModal function", () => {
    const closeModalSpy = jest.spyOn(component.instance(), "closeErrorModal");
    component.instance().closeErrorModal();
    expect(props.closeErrorModal.mock.calls.length).toBe(1);
    expect(closeModalSpy).toBeCalled();
  });

  it("Tests handleCancel and handleDone function", () => {
    const cancelSpy = jest.spyOn(component.instance(), "handleCancel");
    const doneSpy = jest.spyOn(component.instance(), "handleDone");
    component.instance().handleCancel();
    component.instance().handleDone();
    expect(props.closeModal.mock.calls.length).toBe(2);
    expect(cancelSpy).toBeCalled();
    expect(doneSpy).toBeCalled();
  });

  it("Test if handleDoneMeeting is called", () => {
    const doneSpy = jest.spyOn(component.instance(), "handleDoneMeeting");
    component.instance().handleDoneMeeting();
    expect(props.setOptimalTime.mock.calls.length).toBe(1);
    expect(doneSpy).toBeCalled();
  });

  it("Test if showModal is called", () => {
    const modalSpy = jest.spyOn(component.instance(), "showModal");
    component.instance().showModal();
    expect(props.showModal.mock.calls.length).toBe(1);
    expect(modalSpy).toBeCalled();
  });

  it("Test getOptimalTime", () => {
    const optimalTimeSpy = jest.spyOn(component.instance(), "getOptimalTime");
    component.instance().getOptimalTime();
    expect(props.showModal.mock.calls.length).toBe(1);
    expect(props.getOptimalTime.mock.calls.length).toBe(1);
    expect(props.selectMeeting.mock.calls.length).toBe(1);
    expect(optimalTimeSpy).toBeCalled();
  });

  it("Test show group code functionality", () => {
    component.setState({ showCode: false });
    component.find("#show-code-button").simulate("click");
    expect(component.state("showCode")).toEqual(true);
    expect(component.find("#group-code-panel")).toHaveLength(1);
  });

  it("Test input availability modal", () => {
    const inputAvailabilityModal = component.find("#input-availability-modal");
    expect(inputAvailabilityModal.find(InputAvailability)).toHaveLength(1);
    expect(inputAvailabilityModal.prop("visible")).toEqual(
      props.inputModalVisible
    );
    component.find("#input-availability-button").simulate("click");
    expect(props.showModal.mock.calls.length).toBe(1);
  });

  it("Test meeting time modal", () => {
    const meetingTimeModal = component.find("#meeting-time-modal");
    expect(meetingTimeModal.find(MeetingTimeModal)).toHaveLength(1);
    expect(meetingTimeModal.prop("visible")).toEqual(props.meetingModalVisible);
  });

  it("Test error modal", () => {
    const errorModal = component.find("#error-modal");
    expect(errorModal.prop("visible")).toEqual(props.showErrorModal);
  });

  it("Tests group members list", () => {
    expect(component.find(List)).toHaveLength(1);
    const groupMembers = component
      .find(List)
      .dive()
      .dive()
      .find(".ant-list-items");
    expect(groupMembers.find("Item")).toHaveLength(props.groupMembers.length);
  });

  it("Tests currentMeetingTime", () => {
    const meetingTime = shallow(component.instance().currentMeetingTime());
    expect(meetingTime.find("#meeting-time-panel")).toHaveLength(1);
    expect(meetingTime.find("#meeting-time"));
    expect(meetingTime.find("#change-meeting-time"));
  });
});
