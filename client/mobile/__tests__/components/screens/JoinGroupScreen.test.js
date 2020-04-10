import React from 'react';
import JoinGroupScreen from '../../../src/components/screens/JoinGroupScreen';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import {Alert} from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

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
      getGroup: jest.fn(),
      addGroupMember: jest.fn(),
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

  it('Test findGroup & addGroupMember calls', () => {
    const addMemberSpy = jest.spyOn(component.instance(), 'addGroupMember');
    component.instance().findGroup('test');
    Alert.alert.mock.calls[0][2][1].onPress();
    expect(addMemberSpy).toBeCalled();
    expect(Alert.alert).toBeCalled();
    expect(props.navigation.push.mock.calls.length).toBe(1);
    expect(props.navigation.navigate.mock.calls.length).toBe(1);
  });

  it('Test handleOnSubmit function', () => {
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleOnSubmit');
    const getValue = jest.fn();
    getValue.mockReturnValue({code: 'Test'});
    jest.useFakeTimers();
    component.instance()['form'] = {
      getValue: () => getValue,
    };
    component
      .find(Form)
      .first()
      .props()
      .onChange();

    component
      .find('#join-group-button')
      .first()
      .props()
      .onPress();

    expect(handleSubmitSpy).toBeCalled();
    expect(props.getGroup.mock.calls.length).toBe(1);
    expect(props.addGroupMember.mock.calls.length).toBe(1);
    expect(component.find(Form)).toHaveLength(1);
    expect(component.state('isSpinnerVisible')).toEqual(
      !props.isSpinnerVisible,
    );
    jest.advanceTimersByTime(1000);
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
