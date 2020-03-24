import moment from 'moment';

export const SELECT_DATE = 'select_date';
export const SHOW_MODAL = 'show_modal';
export const HANDLE_CHANGE_RANGE_HOUR = 'handle_change_range_hour';
export const ADD_AVAILABILITY = 'add_availability';

const INITIAL_STATE = {
  selectedDate: '',
  modalVisible: false,
  rangeHours: [[]],
  availableDays: [],
};

export const selectDate = (selectedDate, availableDays) => {
  const day = moment(selectedDate.dateString).day();
  let rangeHours = [[]];

  if (availableDays !== undefined) {
    rangeHours = availableDays[day] !== undefined ? availableDays[day] : [[]];
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

export const cancelAvailability = () => {
  return {
    type: SHOW_MODAL,
    payload: {modalVisible: false},
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
  if (rangeHours.length === 0 || rangeHours[0].length === 0) {
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
    return rangeHour !== '';
  });

  const day = moment(selectedDate.dateString).day();

  availableDays[day] = filteredRangeHours;

  dispatch({
    type: ADD_AVAILABILITY,
    payload: {
      availableDays,
      modalVisible: false,
      rangeHours,
      filteredRangeHours,
    },
  });
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
    default:
      return state;
  }
};
