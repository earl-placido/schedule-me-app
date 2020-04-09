import React from 'react';
import GroupListScreen from '../../../src/components/screens/GroupListScreen';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import {CardItem} from 'native-base';

import {FlatList} from 'react-native';

configure({adapter: new Adapter()});

const setUp = (props = {}) => {
  const component = shallow(<GroupListScreen.WrappedComponent {...props} />);
  return component;
};

describe('Testing GroupListScreen', () => {
  let component, props;
  beforeEach(() => {
    props = {
      getGroupList: jest.fn(),
      groupList: [1, 2, 3],
      navigation: {
        push: jest.fn(),
        navigate: jest.fn(),
      },
    };
    component = setUp(props);
  });

  it('Tests if component renders', () => {
    expect(component.length).toEqual(1);
    expect(props.getGroupList.mock.calls.length).toBe(1);
  });

  it('Tests FlatList', () => {
    const item = {
      item: {GroupId: 1, GroupName: 'Test'},
    };
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
    expect(props.navigation.push.mock.calls.length).toBe(1);
    expect(props.navigation.navigate.mock.calls.length).toBe(1);
  });
});

it('Tests no groups', () => {
  const props = {
    getGroupList: jest.fn(),
    groupList: [],
    navigation: {
      push: jest.fn(),
      navigate: jest.fn(),
    },
  };
  const component = setUp(props);
  expect(component.find('#no-groups-text')).toHaveLength(1);
});
