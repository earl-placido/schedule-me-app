import moment from 'moment';

export const SELECT_DATE = 'select_date';
export const SHOW_MODAL = 'show_modal';
export const HANDLE_CHANGE_RANGE_HOUR = 'handle_change_range_hour';
export const ADD_AVAILABILITY = 'add_availability';
export const ADD_RANGE_HOUR = 'add_range_hour';
export const CANCEL_AVAILABILITY = 'cancel_availability';
export const MARK_DATES = 'mark_dates';
export const DELETE_AVAILABILITY = 'delete_availability';

const INITIAL_STATE = {
  selectedDate: '',
  modalVisible: false,
  rangeHours: [[]],
  availableDays: {},
  markedDates: {},
};

export const selectDate = (selectedDate, availableDays) => {
  const date = moment(selectedDate.dateString).format('YYYY-MM-DD');

  let rangeHours = [[]];

  if (availableDays !== undefined) {
    rangeHours = availableDays[date] !== undefined ? availableDays[date] : [[]];
  }

  return {
    type: SELECT_DATE,
    payload: {selectedDate, rangeHours},
  };
};

export const showModal = () => {
  return {
    type: SHOW_MODAL,
    payload: {modalVisible: true},
  };
};

export const cancelAvailability = rangeHours => {
  if (rangeHours !== undefined) {
    // remove any empty range hours
    let filteredRangeHours = rangeHours.filter(rangeHour => {
      return rangeHour.length !== 0;
    });

    return {
      type: SHOW_MODAL,
      payload: {
        modalVisible: false,
        rangeHours: filteredRangeHours,
      },
    };
  }

  return {
    type: SHOW_MODAL,
    payload: {
      modalVisible: false,
    },
  };
};

export const handleChangeRangeHour = (
  selectedDate,
  index,
  startOrEndTimeIndex,
  rangeHours,
) => {
  let newRangeHours = [...rangeHours];

  // -1 represents the group member id.  Right now, set it to -1 and will change later
  newRangeHours[index][startOrEndTimeIndex] = [-1, selectedDate];

  // swap values if start time is later than end time
  let startAndEndTimeDefined =
    newRangeHours[index][0] !== undefined && newRangeHours[index][1];

  if (startAndEndTimeDefined) {
    let startTime = newRangeHours[index][0][1];
    let endTime = newRangeHours[index][1][1];
    if (startTime > endTime) {
      swapStartAndEndTime(newRangeHours, index);
    }
  }

  return {
    type: HANDLE_CHANGE_RANGE_HOUR,
    payload: newRangeHours,
  };
};

const swapStartAndEndTime = (newRangeHours, index) => {
  let startTime = newRangeHours[index][0][1];
  let endTime = newRangeHours[index][1][1];

  newRangeHours[index][0][1] = endTime;
  newRangeHours[index][1][1] = startTime;
};

export const addAvailability = (
  selectedDate,
  rangeHours,
  availableDays,
) => async dispatch => {
  // TODO: Add availabilityId to range hours

  // if no range hours were added to date, reset range hours and close modal
  if (rangeHours.length === 0) {
    dispatch({
      type: ADD_AVAILABILITY,
      payload: {
        modalVisible: false,
        rangeHours: [[]],
      },
    });

    return;
  }

  // remove empty range hours
  let filteredRangeHours = rangeHours.filter(rangeHour => {
    return rangeHour.length !== 0;
  });

  // if just empty hours, don't add any availability
  if (filteredRangeHours.length == 0)
  {
    dispatch({
      type: ADD_AVAILABILITY,
      payload: {
        modalVisible: false,
        rangeHours: filteredRangeHours,
      },
    });
    return;
  }

  const date = moment(selectedDate.dateString).format('YYYY-MM-DD');

  availableDays[date] = filteredRangeHours;

  dispatch({
    type: ADD_AVAILABILITY,
    payload: {
      availableDays,
      modalVisible: false,
      rangeHours: filteredRangeHours,
    },
  });
};

export const addRangeHour = rangeHours => {
  return {
    type: ADD_RANGE_HOUR,
    payload: [...rangeHours, []],
  };
};

export const deleteAvailability = (
  rangeHours,
  availableDays,
  index,
  selectedDate,
) => {
  let newRangeHours = [...rangeHours];
  const removedRangeHour = newRangeHours.splice(index, 1);

  // if removed range hour is not empty
  if (removedRangeHour[0] !== undefined && removedRangeHour[0].length != 0) {
    // TO DO: delete from database

    if (availableDays !== undefined) {
      if (availableDays[selectedDate.dateString] !== undefined) {
        availableDays[selectedDate.dateString].splice(index, 1);

        if (availableDays[selectedDate.dateString].length === 0) {
          delete availableDays[selectedDate.dateString];
        }
      }
    }
  }

  return {
    type: DELETE_AVAILABILITY,
    payload: {
      rangeHours: newRangeHours,
      availableDays: availableDays,
    },
  };

  // this.decreaseHeight();
  // this.setState({
  //   rangeHours: newRangeHours,
  // });
};

export const markDates = availableDays => {
  if (availableDays !== undefined) {
    // make copy of available days map
    let markedDates = {};
    for (var date in availableDays) markedDates[date] = availableDays[date];

    for (var day in availableDays) {
      markedDates[day] = {marked: true};
    }

    return {
      type: MARK_DATES,
      payload: {
        markedDates: markedDates,
      },
    };
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_DATE: {
      return {...state, ...action.payload};
    }
    case SHOW_MODAL: {
      return {...state, ...action.payload};
    }
    case HANDLE_CHANGE_RANGE_HOUR: {
      return {...state, rangeHours: action.payload};
    }
    case ADD_AVAILABILITY: {
      return {...state, ...action.payload};
    }
    case ADD_RANGE_HOUR: {
      return {...state, rangeHours: action.payload};
    }
    case CANCEL_AVAILABILITY: {
      return {...state, ...action.payload};
    }
    case MARK_DATES: {
      return {...state, ...action.payload};
    }
    case DELETE_AVAILABILITY: {
      return {...state, ...action.payload};
    }
    default:
      return state;
  }
};
