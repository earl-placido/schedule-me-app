import React from 'react';
import InputAvailabilityModal from '../../../src/components/inputavailability/InputAvailabilityModal';
import AvailabilityModal from '../../../src/components/inputavailability/AvailabilityModal';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import {Button} from 'native-base';

configure({adapter: new Adapter()});

const setUp = (props = {}) => {
  const component = shallow(
    <InputAvailabilityModal.WrappedComponent {...props} />,
  );
  return component;
};

describe('Testing InputAvailabilityModal', () => {
  let component, props;
  beforeEach(() => {
    props = {
      toggleInputAvailability: jest.fn(),
      selectDate: jest.fn(),
      showModal: jest.fn(),
    };
    component = setUp(props);
  });

  it("Tests if component and it's children render", () => {
    expect(component.length).toEqual(1);
    expect(component.find(Calendar)).toHaveLength(1);
    expect(component.find(Modal)).toHaveLength(1);
    expect(component.find(AvailabilityModal)).toHaveLength(1);
  });

  it('Tests function calls', () => {
    component
      .find(Button)
      .first()
      .props()
      .onPress();
    component
      .find(Calendar)
      .first()
      .props()
      .onDayPress();
    expect(props.toggleInputAvailability.mock.calls.length).toBe(1);
    expect(props.selectDate.mock.calls.length).toBe(1);
    expect(props.showModal.mock.calls.length).toBe(1);
  });
});
