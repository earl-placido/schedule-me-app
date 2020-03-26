import axios from "axios";
import moment from 'moment';

import { getMemberIdWithEmail } from "../GroupMember.action";
import {
  getAvailabilityQuery,
  addAvailabilityQuery
} from "../Availability.action";
import { convertAvailabilityToDays } from "../util/date/day";

export const GROUP_INFORMATION = "group_information";
export const SELECT_DATE = "select_date";
export const SHOW_MODAL = "show_availability_modal";
export const GET_AVAILABILITY = "get_availability";
export const CANCEL_AVAILABILITY = "cancel_availability";
export const DELETE_AVAILABILITY = "delete_availability";
export const ADD_AVAILABILITY = "add_availability";
export const ADD_RANGE = "add_range";
export const CHANGE_RANGE = "change_range";
export const CLOSE_ERROR_MODAL = "close_error_modal";

export const getInformation = (groupId) => async dispatch => {
  axios
    .get(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}`)
    .then(groupInformation => {
      getMemberIdWithEmail(groupId, localStorage.getItem("userEmail")).then(
        groupMember => {
          const memberId = groupMember.GroupMemberId;
          getAvailabilityQuery(memberId).then(availabilities => {
            if (availabilities.error) {
              dispatch({
                type: GROUP_INFORMATION,
                payload: {
                  memberId,
                  groupInformation: groupInformation.data,
                  availabilities: []
                }
              });
              return;
            }
            // formattedAvailability: {date: [{id, starttime, endtime}, {id, starttime, endtime}, {id, starttime, endtime}, ...], date2: ..., date3: ... }
            let formattedAvailability = {};
            for (const availability of availabilities) {
              const date = moment(availability['CAST(StartTime as char)']).format('YYYY-MM-DD');
              if (formattedAvailability[date] === undefined)
                formattedAvailability[date] = [availability];
              else
                formattedAvailability[date].push(availability);
            }

            dispatch({
              type: GROUP_INFORMATION,
              payload: {
                groupInformation: groupInformation.data,
                memberId,
                availabilities: formattedAvailability
              }
            });
          });
        }
      );
    })
    .catch(() => {
      dispatch({
        type: GROUP_INFORMATION,
        payload: {
          showErrorModal: true
        }
      });
    });
};

export const selectDate = (selectedDate, availabilities) => {
  let rangeHours = [""];
  const date = selectedDate.format("YYYY-MM-DD");
  if (availabilities[date] !== undefined) rangeHours = availabilities[date] || [""];

  return {
    type: SELECT_DATE,
    payload: { selectedDate, rangeHours }
  };
};

export const showModal = () => {
  return {
    type: SHOW_MODAL,
    payload: { modalVisible: true }
  };
};

export const cancelAvailability = () => {
  return {
    type: SHOW_MODAL,
    payload: { modalVisible: false, rangeHours: [""] }
  };
};

export const deleteAvailability = (
  rangeHours,
  availabilities
) => async dispatch => {
  let newRangeHours = [...rangeHours];
  const removedRangeHours = newRangeHours.pop();
  // if the range hours that was removed is not empty
  if (removedRangeHours) {
    // if it is an existing id, then we query to the database to delete it
    if (removedRangeHours.AvailabilityId !== -1) {
      // remove from database
      await axios
        .delete(
          `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/availability`,
          {
            data: { availabilityIds: [removedRangeHours.AvailabilityId] }
          }
        )
        .then(response => {
          // handle errors if there is
          if (response.data.error) {
            dispatch({
              type: DELETE_AVAILABILITY,
              payload: newRangeHours,
              showErrorModal: true
            });
            return;
          }

          // remove from availabilityDays
          const selectedDate = moment(removedRangeHours['CAST(StartTime as char)']).format("YYYY-MM-DD");
          availabilities[selectedDate] = newRangeHours;
        })
        .catch(() => {
          dispatch({
            type: DELETE_AVAILABILITY,
            payload: { showErrorModal: true }
          });
          return;
        });
    }
  }

  dispatch({
    type: DELETE_AVAILABILITY,
    payload: { rangeHours: newRangeHours, availabilities }
  });
};

// rangehours contain [[id, [start, end]], [id, [start, end]], ...]
export const addAvailability = (
  memberId,
  selectedDate,
  rangeHours,
  availabilities
) => async dispatch => {
  //currently doesn't check for clashing of time

  // if empty we just close the modal and reset rangeHours
  if (rangeHours.length === 0 || rangeHours[0].length === 0) {
    dispatch({
      type: ADD_AVAILABILITY,
      payload: { modalVisible: false, rangeHours: [""] }
    });
    return;
  }

  // get rid of empty range hours, otherwise will send undefined to server
  let filteredRangeHours = rangeHours.filter(item => {
    return item !== "";
  });

  const availabilityIds = filteredRangeHours.map(item => item.AvailabilityId);
  const startTimes = filteredRangeHours.map(item => {
    return item['CAST(StartTime as char)'];
  });
  const endTimes = filteredRangeHours.map(item => {
    return item['CAST(EndTime as char)'];
  });

  await addAvailabilityQuery(memberId, availabilityIds, startTimes, endTimes)
    .then(addedAvailabilityIds => {
      // update the ids of rangeHours after getting the availbilityId from database
      for (let i = 0; i < addedAvailabilityIds.data.ids.length; i++) {
        if (addedAvailabilityIds.data.ids[i] !== 0)
          filteredRangeHours[i].AvailabilityId = addedAvailabilityIds.data.ids[i];
      }
      availabilities[selectedDate.format('YYYY-MM-DD')] = filteredRangeHours;
      dispatch({
        type: ADD_AVAILABILITY,
        payload: {
          modalVisible: false,
          rangeHours: filteredRangeHours,
          availabilities
        }
      });
    })
    .catch(() => {
      dispatch({
        type: ADD_AVAILABILITY,
        payload: {
          showErrorModal: true
        }
      });
    });
};

export const handleAdd = rangeHours => {
  return {
    type: ADD_RANGE,
    payload: [...rangeHours, ""]
  };
};

// rangehours contain [[id, [start, end]], [id, [start, end]], ...]
export const onChangeRange = (index, value, rangeHours) => {
  let newRangeHours = [...rangeHours];

  // if deleted value
  if (value === null) {
    newRangeHours[index] = "";
  } else {
    newRangeHours[index] = {AvailabilityId: -1, 'CAST(StartTime as char)': value[0].format('YYYY-MM-DD HH:mm:ss'), 
  'CAST(EndTime as char)': value[1].format('YYYY-MM-DD HH:mm:ss')};
  }

  return {
    type: CHANGE_RANGE,
    payload: newRangeHours
  };
};

export const closeErrorModal = () => async dispatch => {
  dispatch({
    type: CLOSE_ERROR_MODAL,
    payload: false
  });
};

const INITIAL_STATE = {
  modalVisible: false,
  rangeHours: [""],
  selectedDate: "",
  availabilities: {},
  groupInformation: "",
  memberId: "",
  showErrorModal: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GROUP_INFORMATION: {
      return { ...state, ...action.payload };
    }
    case SELECT_DATE: {
      return { ...state, ...action.payload };
    }
    case SHOW_MODAL: {
      return { ...state, ...action.payload };
    }
    case CANCEL_AVAILABILITY: {
      return { ...state, modalVisible: action.payload };
    }
    case DELETE_AVAILABILITY: {
      return { ...state, ...action.payload };
    }
    case ADD_AVAILABILITY: {
      return { ...state, ...action.payload };
    }
    case ADD_RANGE: {
      return { ...state, rangeHours: action.payload };
    }
    case CHANGE_RANGE: {
      return { ...state, rangeHours: action.payload };
    }
    case CLOSE_ERROR_MODAL: {
      return { ...state, showErrorModal: action.payload };
    }
    default:
      return state;
  }
};
