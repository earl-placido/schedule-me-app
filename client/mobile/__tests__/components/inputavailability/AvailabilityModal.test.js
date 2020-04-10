import React from 'react';
import AvailabilityModal from '../../../src/components/inputavailability/AvailabilityModal';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import {Button} from 'native-base';
import DatePicker from 'react-native-datepicker';

configure({adapter: new Adapter()});

const setUp = (props = {}) => {
  const component = shallow(<AvailabilityModal.WrappedComponent {...props} />);
  return component;
};

describe('Testing AvailabilityModal', () => {
  let component, props;
  beforeEach(() => {
    const addAvailability = jest.fn();
    addAvailability.mockReturnValue(
      Promise.resolve([
        {
          key: 'data',
        },
      ]),
    );
    props = {
      rangeHours: [
        {
          AvailabilityId: -1,
          'CAST(StartTime as char)': '20130208T080910',
          'CAST(EndTime as char)': '20130208T080910',
        },
      ],
      selectedDate: '',
      deleteAvailability: jest.fn(),
      addRangeHour: jest.fn(),
      cancelAvailability: jest.fn(),
      markDates: jest.fn(),
      addAvailability: addAvailability,
      handleChangeRangeHour: jest.fn(),
      groupMemberId: '',
      availabilities: '',
    };
    component = setUp(props);
  });

  it("Tests if component and it's children render", () => {
    expect(component.length).toEqual(1);
    expect(component.find('#delete-availability-button')).toHaveLength(1);
    expect(component.find('#add-range-hour-button')).toHaveLength(1);
    expect(component.find('#cancel-availability-button')).toHaveLength(1);
    expect(component.find('#add-availability-button')).toHaveLength(1);
  });

  it('Testing increaseHeight', () => {
    const height = 1;
    component.setState({height: height});
    component.instance().increaseHeight();
    expect(component.state('height')).toBeGreaterThan(height);
  });

  it('Testing decreaseHeight', () => {
    const height = 1;
    component.setState({height: height});
    component.instance().decreaseHeight();
    expect(component.state('height')).toBeLessThan(height);
  });

  it('Testing deleteAvailability function', () => {
    const deleteAvailabilitySpy = jest.spyOn(
      component.instance(),
      'deleteAvailability',
    );
    const decreaseHeightSpy = jest.spyOn(
      component.instance(),
      'decreaseHeight',
    );
    component
      .find('#delete-availability-button')
      .first()
      .props()
      .onPress();
    expect(props.deleteAvailability.mock.calls.length).toBe(1);
    expect(deleteAvailabilitySpy).toBeCalled();
    expect(decreaseHeightSpy).toBeCalled();
  });

  it('Testing addRangeHour function', () => {
    const addRangeHourSpy = jest.spyOn(component.instance(), 'addRangeHour');
    const increaseHeightSpy = jest.spyOn(
      component.instance(),
      'increaseHeight',
    );
    component
      .find('#add-range-hour-button')
      .first()
      .props()
      .onPress();
    expect(props.addRangeHour.mock.calls.length).toBe(1);
    expect(addRangeHourSpy).toBeCalled();
    expect(increaseHeightSpy).toBeCalled();
  });

  it('Testing cancelAvailability function', () => {
    component
      .find('#cancel-availability-button')
      .first()
      .props()
      .onPress();
    expect(props.cancelAvailability.mock.calls.length).toBe(1);
  });

  it('Testing addAvailability function', async () => {
    const addAvailabilitySpy = jest.spyOn(
      component.instance(),
      'addAvailability',
    );
    const unfilledTimeSpy = jest.spyOn(
      component.instance(),
      'foundUnfilledTime',
    );
    component
      .find('#add-availability-button')
      .first()
      .props()
      .onPress();
    expect(addAvailabilitySpy).toBeCalled();
    expect(unfilledTimeSpy).toBeCalled();
    expect(props.addAvailability.mock.calls.length).toBe(1);
    await props.addAvailability();
    expect(props.markDates.mock.calls.length).toBe(1);
  });

  it('Testing foundUnfilledTime function', () => {
    const unfilledTimeSpy = jest.spyOn(
      component.instance(),
      'foundUnfilledTime',
    );
    expect(component.instance().foundUnfilledTime(props.rangeHours)).toBe(
      false,
    );
    expect(
      component.instance().foundUnfilledTime([
        {
          AvailabilityId: -1,
          'CAST(StartTime as char)': undefined,
          'CAST(EndTime as char)': 'test',
        },
      ]),
    ).toBe(true);
    expect(unfilledTimeSpy).toBeCalled();
  });

  it('Testing availabilityRender function', () => {
    const deleteAvailabilitySpy = jest.spyOn(
      component.instance(),
      'deleteAvailability',
    );
    const availabilityRenderSpy = jest.spyOn(
      component.instance(),
      'availabilityRender',
    );
    const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');
    const availabilityRender = shallow(
      component.instance().availabilityRender(props.rangeHours[0], 1),
    );

    availabilityRender
      .find(DatePicker)
      .at(0)
      .props()
      .onDateChange();

    availabilityRender
      .find(DatePicker)
      .at(1)
      .props()
      .onDateChange();

    availabilityRender
      .find(Button)
      .first()
      .props()
      .onPress();

    expect(availabilityRenderSpy).toBeCalled();
    expect(handleChangeSpy).toBeCalled();
    expect(deleteAvailabilitySpy).toBeCalled();
    expect(props.handleChangeRangeHour.mock.calls.length).toBe(2);
    expect(props.deleteAvailability.mock.calls.length).toBe(1);
  });
});
