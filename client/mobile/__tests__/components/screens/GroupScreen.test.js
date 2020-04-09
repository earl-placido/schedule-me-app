import React from 'react';
import GroupScreen from '../../../src/components/screens/GroupScreen';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import {FloatingAction} from 'react-native-floating-action';
import {Button, Spinner, CardItem} from 'native-base';
import {FlatList} from 'react-native';

configure({adapter: new Adapter()});

const setUp = (props = {}) => {
  const component = shallow(<GroupScreen.WrappedComponent {...props} />);
  return component;
};

describe('Testing AvailabilityModal', () => {
  let component, props;
  beforeEach(() => {
    const getGroup = jest.fn();
    const getGroupMembers = jest.fn();
    const setAvailabilities = jest.fn();
    const getSelfMember = jest.fn();
    const getGroupOptimalTime = jest.fn();

    getGroup.mockReturnValue(
      Promise.resolve([
        {
          key: 'data',
        },
      ]),
    );

    getGroupMembers.mockReturnValue(
      Promise.resolve([
        {
          key: 'data',
        },
      ]),
    );

    setAvailabilities.mockReturnValue(
      Promise.resolve([
        {
          key: 'data',
        },
      ]),
    );

    getSelfMember.mockReturnValue(
      Promise.resolve([
        {
          key: 'data',
        },
      ]),
    );

    getGroupOptimalTime.mockReturnValue(
      Promise.resolve([
        {
          key: 'data',
        },
      ]),
    );

    props = {
      getGroup: getGroup,
      getGroupMembers: getGroupMembers,
      groupMembers: [
        {UserFName: 'Other', UserLName: 'User', UserEmail: 'test@test.com'},
      ],
      isMeetingModalVisible: false,
      isInputAvailabilityVisible: false,
      getSelfMember: getSelfMember,
      getGroupOptimalTime: getGroupOptimalTime,
      setAvailabilities: setAvailabilities,
      selectMeeting: jest.fn(),
      getAllOptimalTimes: jest.fn(),
      toggleMeetingModal: jest.fn(),
      toggleInputAvailability: jest.fn(),
      route: {
        params: {
          codeNum: '',
        },
      },
      meetings: [1],
      showErrorModal: false,
      group: {
        Groupname: 'Lorem Ipsum',
      },
      selfMember: {
        MemberRole: 'AD',
      },
      match: {
        params: {
          id: 1000000,
        },
      },
    };
    component = setUp(props);
    component.setState({
      finishedLoadingGroupDetails: false,
      currUser: {
        UserFName: 'Test',
        UserLName: 'User',
        UserEmail: 'test@test.com',
      },
    });
  });

  it('Tests if component and children', () => {
    const meetingTimeSpy = jest.spyOn(
      component.instance(),
      'currentMeetingTime',
    );
    expect(component.length).toEqual(1);
    expect(component.find(Spinner)).toHaveLength(1);
    component.setState({finishedLoadingGroupDetails: true});
    expect(meetingTimeSpy).toBeCalled();
  });

  it('Tests loadGroupDetails function', async () => {
    const loadDetailsSpy = jest.spyOn(component.instance(), 'loadGroupDetails');
    component.instance().loadGroupDetails();
    await props.getGroup();
    await props.getGroupMembers();
    await props.setAvailabilities();
    await props.getSelfMember();
    await props.getGroupOptimalTime();
    expect(loadDetailsSpy).toBeCalled();
    expect(props.getGroup.mock.calls.length).toBe(3);
    expect(props.getGroupMembers.mock.calls.length).toBe(3);
    expect(props.setAvailabilities.mock.calls.length).toBe(3);
    expect(props.getSelfMember.mock.calls.length).toBe(3);
    expect(props.getGroupOptimalTime.mock.calls.length).toBe(3);
  });

  it('Tests dialog functions', () => {
    const user = {
      UserFName: 'Other',
      UserLName: 'User',
      UserEmail: 'test@test.com',
    };
    const showDialogSpy = jest.spyOn(component.instance(), 'showDialog');
    const handleCloseSpy = jest.spyOn(component.instance(), 'handleClose');
    component.instance().showDialog(user);
    expect(showDialogSpy).toBeCalled();
    expect(component.state('dialogVisible')).toEqual(true);
    expect(component.state('currUser')).toEqual(user);
    component.instance().handleClose();
    expect(handleCloseSpy).toBeCalled();
    expect(component.state('dialogVisible')).toEqual(false);
  });

  it('Tests getOptimalTime function', () => {
    component.instance().getOptimalTime();
    expect(props.selectMeeting.mock.calls.length).toBe(1);
    expect(props.getAllOptimalTimes.mock.calls.length).toBe(1);
    expect(props.toggleMeetingModal.mock.calls.length).toBe(1);
  });

  it('Tests currentMeetingTime function', () => {
    const optimalTimeSpy = jest.spyOn(component.instance(), 'getOptimalTime');
    const currentMeetingView = shallow(
      component.instance().currentMeetingTime(),
    );
    currentMeetingView
      .find(Button)
      .first()
      .props()
      .onPress();
    expect(optimalTimeSpy).toBeCalled();
  });

  it('Tests floating action', () => {
    component.setState({finishedLoadingGroupDetails: true});
    expect(component.find(FloatingAction)).toHaveLength(1);
    component
      .find(FloatingAction)
      .first()
      .props()
      .onPressItem();
    expect(props.toggleInputAvailability.mock.calls.length).toBe(1);
  });

  it('Tests FlatList', () => {
    const item = {
      item: {UserFName: 'Other', UserLName: 'User', UserEmail: 'test@test.com'},
    };
    const showDialogSpy = jest.spyOn(component.instance(), 'showDialog');
    component.setState({finishedLoadingGroupDetails: true});
    const flatList = shallow(
      component
        .find(FlatList)
        .props()
        .renderItem(item),
    );
    flatList
      .find(CardItem)
      .first()
      .props()
      .onPress();
    expect(showDialogSpy).toBeCalled();
  });

  it('Tests modals', () => {
    component.setState({finishedLoadingGroupDetails: true});
    expect(component.find('#meeting-modal')).toHaveLength(1);
    expect(component.find('#availability-modal')).toHaveLength(1);
    component
      .find('#meeting-modal')
      .first()
      .props()
      .onBackdropPress();
    expect(props.toggleMeetingModal.mock.calls.length).toBe(1);
  });
});
