import React from 'react';
import JoinGroupScreen from '../../../src/components/screens/JoinGroupScreen';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import {Alert} from 'react-native';

configure({adapter: new Adapter()});

const setUp = (props = {}) => {
  const component = shallow(<JoinGroupScreen.WrappedComponent {...props} />);
  return component;
};

describe('Testing JoinGroupScreen', () => {
  Alert.alert = jest.fn();
  let component, props;

  beforeEach(() => {
    props = {
      navigation: {
        push: jest.fn(),
        navigate: jest.fn(),
      },
      group: {
        GroupId: 1,
        GroupName: 'Test',
      },
      isSpinnerVisible: false,
    };
    component = setUp(props);
    component.setState({isSpinnerVisible: props.state});
  });

  it('Tests if component renders', () => {
    expect(component.length).toEqual(1);
  });

  it('Test toggleSpinner function', () => {
    component.instance().toggleSpinner();
    expect(component.state('isSpinnerVisible')).toEqual(
      !props.isSpinnerVisible,
    );
  });

  it('Test findGroup & addGroupMember calls', () => {
    const addMemberSpy = jest.spyOn(component.instance(), 'addGroupMember');
    component.instance().findGroup('test');
    Alert.alert.mock.calls[0][2][1].onPress();
    expect(addMemberSpy).toBeCalled();
    expect(Alert.alert).toBeCalled();
    expect(props.navigation.push.mock.calls.length).toBe(1);
    expect(props.navigation.navigate.mock.calls.length).toBe(1);
  });

  it('Test handleOnChangeValue and handleOnSubmit', () => {
    const handleSubmitMock = jest.fn();
    const handleChangeMock = jest.fn();
    component.instance().handleOnChangeValue = handleChangeMock;
    component.instance().handleOnSubmit = handleSubmitMock;
    component
      .find('#join-group-button')
      .first()
      .props()
      .onPress();
    expect(handleSubmitMock.mock.calls.length).toBe(1);
  });
});

it('Test error Alerts', () => {
  // navigation prop is useless. It's only here to get rid of the missing prop warning.
  const props = {
    getGroupErrored: true,
    navigation: {
      push: jest.fn(),
      navigate: jest.fn(),
    },
    group: {
      GroupId: 1,
      GroupName: 'Test',
    },
  };
  const component = setUp(props);
  Alert.alert = jest.fn();
  component.instance().findGroup();
  component.instance().addGroupMember();
  expect(Alert.alert.mock.calls.length).toBe(2);
});
