import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

import {getGroupMemberWithEmail} from '../actions/screens/GetGroupMembers.action';
import {
  getAvailabilites,
  addAvailabilityQuery,
  deleteAvailabilityQuery,
} from '../actions/Availability.action';

export const SELECT_DATE = 'select_date';
export const SHOW_MODAL = 'show_modal';
export const HANDLE_CHANGE_RANGE_HOUR = 'handle_change_range_hour';
export const ADD_AVAILABILITY = 'add_availability';
export const ADD_RANGE_HOUR = 'add_range_hour';
export const CANCEL_AVAILABILITY = 'cancel_availability';
export const MARK_DATES = 'mark_dates';
export const DELETE_AVAILABILITY = 'delete_availability';
export const SET_AVAILABILITIES = 'set_availabilities';

const INITIAL_STATE = {
  selectedDate: '',
  modalVisible: false,
  rangeHours: [[]],
  availabilities: {},
  markedDates: {},
  groupMemberId: '',
  error: null,
};

export const setAvailabilities = groupId => async dispatch => {
  const userEmail = await AsyncStorage.getItem('userEmail');

  const groupMemberResponse = await getGroupMemberWithEmail(groupId, userEmail);
  const groupMemberId = groupMemberResponse.GroupMemberId;
  const availabilities = await getAvailabilites(groupMemberId);

  // no availability for user
  if (availabilities.error) {
    dispatch({
      type: SET_AVAILABILITIES,
      payload: {
        availabilities: {},
        groupMemberId: groupMemberId,
        markedDates: {},
        rangeHours: [[]],
      },
    });
    return;
  }

  let formattedAvailabilities = {};

  for (var availability of availabilities) {
    const date = moment(availability['CAST(StartTime as char)']).format(
      'YYYY-MM-DD',
    );

    const currDate = moment(new Date()).format('YYYY-MM-DD');
    if (date < currDate)
    {
      await deleteAvailabilityQuery(availability.AvailabilityId);
      continue;
    }

    if (formattedAvailabilities[date] === undefined) {
      formattedAvailabilities[date] = [availability];
    } else {
      formattedAvailabilities[date].push(availability);
    }
  }

  dispatch(markDates(formattedAvailabilities));

  dispatch({
    type: SET_AVAILABILITIES,
    payload: {
      availabilities: formattedAvailabilities,
      groupMemberId: groupMemberId,
    },
  });
};

// sets the date that the user clicked on from the calendar and retrieve range of hours the user is availabile for on that date
export const selectDate = (selectedDate, availabilities) => {
  const date = moment(selectedDate.dateString).format('YYYY-MM-DD');

  let rangeHours = [[]];

  // retrieve range hours for date if user previously added an availability for that date
  if (availabilities !== undefined) {
    rangeHours = availabilities[date] || [[]];
  }

  return {
    type: SELECT_DATE,
    payload: {selectedDate, rangeHours},
  };
};

// display the input availability modal
export const showModal = () => {
  return {
    type: SHOW_MODAL,
    payload: {modalVisible: true},
  };
};

// when user decides to not input an availability, close the modal and remove any empty hours
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
};

// add specified range hour to range hours array: [[-1, startTime, endTime], [-1, startTime, endTime], ...]
export const handleChangeRangeHour = (
  selectedTime,
  selectedDate,
  index,
  startOrEndTimeIndex,
  rangeHours,
) => {
  let newRangeHours = [...rangeHours];

  // deleted value
  if (selectedTime === null) {
    newRangeHours[index] = [];
  } else {
    // -1 represents the group member id.  Right now, set it to -1 and will change to actual member availability later
    let availabilityId = -1;

    let startTime =
      startOrEndTimeIndex == 0
        ? selectedDate.dateString + ' ' + convertTo24Hours(selectedTime)
        : rangeHours[index]['CAST(StartTime as char)'];
    let endTime =
      startOrEndTimeIndex == 1
        ? selectedDate.dateString + ' ' + convertTo24Hours(selectedTime)
        : rangeHours[index]['CAST(EndTime as char)'];

    // swap startTime and endTime if defined and if ensure startTime is later than endTime
    if (startTime && endTime && startTime > endTime) {
      let temp = startTime;
      startTime = endTime;
      endTime = temp;
    }

    newRangeHours[index] = {
      AvailabilityId: availabilityId,
      'CAST(StartTime as char)': startTime,
      'CAST(EndTime as char)': endTime,
    };
  }

  return {
    type: HANDLE_CHANGE_RANGE_HOUR,
    payload: newRangeHours,
  };
};

const convertTo24Hours = time => {
  let hours = parseInt(time.split(' ')[0].split(':')[0]);
  let minutes = parseInt(time.split(' ')[0].split(':')[1]);
  const abbreviation = time.split(' ')[1];

  if (abbreviation === 'PM' && hours < 12) {
    hours += 12;
  } else if (abbreviation === 'AM' && hours === 12) {
    hours = 0;
  }

  let sHours = hours.toString();
  let sMinutes = minutes.toString();

  if (hours < 10) {
    sHours = '0' + sHours;
  }

  if (minutes < 10) {
    sMinutes = '0' + sMinutes;
  }

  return sHours + ':' + sMinutes;
};

// when user clicks OK, add the inputted range of hours to availabileDay object
/*
  e.g. 
  availabilities: {
    "1998-31-01": [[-1, startTime, endTime], [-1, startTime, endTime]]
    "2020-03-24": [[-1, startTime, endTime], [-1, startTime, endTime], [-1, startTime, endTime], [-1, startTime, endTime]]
  }
*/
export const addAvailability = (
  groupMemberId,
  selectedDate,
  rangeHours,
  availabilities,
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
  if (filteredRangeHours.length == 0) {
    dispatch({
      type: ADD_AVAILABILITY,
      payload: {
        modalVisible: false,
        rangeHours: filteredRangeHours,
      },
    });
    return;
  }
  const availabilityIds = filteredRangeHours.map(
    rangeHour => rangeHour.AvailabilityId,
  );
  const startTimes = filteredRangeHours.map(rangeHour => {
    return rangeHour['CAST(StartTime as char)'];
  });

  const endTimes = filteredRangeHours.map(rangeHour => {
    return rangeHour['CAST(EndTime as char)'];
  });

  const addedAvailabilityIds = await addAvailabilityQuery(
    groupMemberId,
    availabilityIds,
    startTimes,
    endTimes,
  );

  if (addedAvailabilityIds.length === 0) {
    dispatch({
      type: ADD_AVAILABILITY,
      payload: {
        modalVisible: false,
        error: 'An error has occurred.  Availability has not been added',
      },
    });
    return;
  }

  // set the range hours to the correct availability ids
  for (let i = 0; i < addedAvailabilityIds.length; i++) {
    if (addedAvailabilityIds[i] !== 0) {
      filteredRangeHours[i].AvailabilityId = addedAvailabilityIds[i];
    }
  }

  // date will act as a key and the range hours will be the values for that key
  const date = moment(selectedDate.dateString).format('YYYY-MM-DD');
  availabilities[date] = filteredRangeHours;

  dispatch(markDates(availabilities));

  dispatch({
    type: ADD_AVAILABILITY,
    payload: {
      availabilities,
      modalVisible: false,
      error: null,
      rangeHours: filteredRangeHours,
    },
  });
};

// render a new range hour to the screen
export const addRangeHour = rangeHours => {
  return {
    type: ADD_RANGE_HOUR,
    payload: [...rangeHours, []],
  };
};

// delete availability from availableDay object
export const deleteAvailability = (
  rangeHours,
  availabilities,
  index,
  selectedDate,
) => async dispatch => {
  // copy given range hours and remove entry using the given index
  let newRangeHours = [...rangeHours];
  const removedRangeHour = newRangeHours.splice(index, 1);

  // // if a range hour was actually removed...
  if (removedRangeHour[0] !== undefined && removedRangeHour[0].length != 0) {
    const response = await deleteAvailabilityQuery(
      removedRangeHour[0].AvailabilityId,
    );

    // handle error if there is
    if (response.error) {
      dispatch({
        type: DELETE_AVAILABILITY,
        payload: newRangeHours,
      });
      return;
    }

    // check if availabilities had that range hour as a value for the selected date
    if (availabilities !== undefined) {
      if (availabilities[selectedDate.dateString] !== undefined) {
        availabilities[selectedDate.dateString] = newRangeHours;

        // if selectedDate no longer has any range hours, then completely delete the entry in the object.  This should also remove the marking from the calendar
        if (availabilities[selectedDate.dateString].length === 0) {
          delete availabilities[selectedDate.dateString];
          dispatch(markDates(availabilities));
        }
      }
    }
  }

  dispatch({
    type: DELETE_AVAILABILITY,
    payload: {
      rangeHours: newRangeHours,
      availabilities: availabilities,
    },
  });
};

// mark the dates that the user is available on, which is used to render dots in the calendar
export const markDates = availabilities => {
  let markedDates = {};

  if (availabilities !== undefined) {
    // make copy of available days object

    for (var date in availabilities) markedDates[date] = availabilities[date];

    // mark each date
    for (var day in availabilities) {
      markedDates[day] = {marked: true};
    }
  }

  return {
    type: MARK_DATES,
    payload: {
      markedDates: markedDates,
    },
  };
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
    case SET_AVAILABILITIES: {
      return {...state, ...action.payload};
    }
    default:
      return state;
  }
};
