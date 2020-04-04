import axios from "axios";
import moment from "moment";

import { getMemberIdWithEmail } from "../GroupMember.action";
import {
  getAvailabilityQuery,
  addAvailabilityQuery
} from "../Availability.action";

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

export const getInformation = groupId => async dispatch => {
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
              const date = moment(
                availability["CAST(StartTime as char)"]
              ).format("YYYY-MM-DD");
              if (formattedAvailability[date] === undefined)
                formattedAvailability[date] = [availability];
              else formattedAvailability[date].push(availability);
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
  if (availabilities[date] !== undefined)
    rangeHours = availabilities[date] || [""];

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

// remove the start and end time from range hours
// return [value removed, newArray]
const deleteRangeHour = (index, rangeHours) => {
  let newRangeHours = [...rangeHours]; // deep copy
  let valueRemoved = null;

  if (index < newRangeHours.length)
    valueRemoved = newRangeHours.splice(index, 1)[0];

  return [valueRemoved, newRangeHours];
};

const deleteAvailabilityDB = async availabilityId => {
  try {
    // remove from database
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/availability`,
      {
        data: { availabilityIds: [availabilityId] }
      }
    );
    // return errors if there is
    return !response.data.error;
  } catch {
    return false;
  }
};

export const deleteAvailability = (
  rangeHours,
  availabilities
) => async dispatch => {
  const [removedRangeHours, newRangeHours] = deleteRangeHour(-1, rangeHours);
  // if the range hours that was removed is not empty
  if (removedRangeHours) {
    // if it is an existing id, then we query to the database to delete it
    if (removedRangeHours.AvailabilityId !== -1) {
      const success = await deleteAvailabilityDB(
        removedRangeHours.AvailabilityId
      );
      if (!success) {
        dispatch({
          type: DELETE_AVAILABILITY,
          payload: { showErrorModal: true }
        });
        return;
      }

      // remove from availabilities
      const selectedDate = moment(
        removedRangeHours["CAST(StartTime as char)"]
      ).format("YYYY-MM-DD");
      availabilities[selectedDate] = newRangeHours;
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
  if (rangeHours.length === 0) {
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
    return item["CAST(StartTime as char)"];
  });
  const endTimes = filteredRangeHours.map(item => {
    return item["CAST(EndTime as char)"];
  });

  await addAvailabilityQuery(memberId, availabilityIds, startTimes, endTimes)
    .then(addedAvailabilityIds => {
      // update the ids of rangeHours after getting the availbilityId from database
      for (let i = 0; i < addedAvailabilityIds.data.ids.length; i++) {
        if (addedAvailabilityIds.data.ids[i] !== 0)
          filteredRangeHours[i].AvailabilityId =
            addedAvailabilityIds.data.ids[i];
      }
      availabilities[selectedDate.format("YYYY-MM-DD")] = filteredRangeHours;
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

const deleteRange = async (index, rangeHours) => {
  let success = true;
  // if this availability is in database
  if (rangeHours[index].AvailabilityId !== -1) {
    // remove from database
    success = await deleteAvailabilityDB(rangeHours[index].AvailabilityId);
  }
  if (success) rangeHours[index] = "";
  return [success, rangeHours]; // can delete right away because not in db
};

// return true if the current value to add intersect existing time range
const checkForIntersectRange = (index, value, rangeHours) => {
  let [startTime, endTime] = value;
  startTime = startTime.format("HH.mm");
  endTime = endTime.format("HH.mm");

  for (
    let rangeHourIndex = 0;
    rangeHourIndex < rangeHours.length;
    rangeHourIndex++
  ) {
    if (rangeHourIndex === index) continue; // don't want to check intersect with itself

    const hour = rangeHours[rangeHourIndex];
    const currentStartTime = moment(hour["CAST(StartTime as char)"]).format(
      "HH.mm"
    );
    const currentEndTime = moment(hour["CAST(EndTime as char)"]).format(
      "HH.mm"
    );

    const startIntersect = Math.max(startTime, currentStartTime);
    const endIntersect = Math.min(endTime, currentEndTime);

    if (startIntersect <= endIntersect) {
      return true;
    }
  }
  return false;
};

// rangehours contain [[id, [start, end]], [id, [start, end]], ...]
export const onChangeRange = (index, value, rangeHours) => async dispatch => {
  let newRangeHours = [...rangeHours];
  // if deleted value
  if (value === null) {
    let success = false;
    [success, newRangeHours] = await deleteRange(index, newRangeHours);
    if (!success) {
      dispatch({
        type: DELETE_AVAILABILITY,
        payload: {
          showErrorModal: true,
          errorMessage: "Unable to delete range hours."
        }
      });
      return;
    }
  } else {
    // if add value
    const isIntersect = checkForIntersectRange(index, value, rangeHours);
    if (isIntersect) {
      dispatch({
        type: CHANGE_RANGE,
        payload: {
          rangeHours: newRangeHours,
          showErrorModal: true,
          errorMessage: "Time added clash existing time slots."
        }
      });
      return;
    }

    newRangeHours[index] = {
      AvailabilityId: -1,
      "CAST(StartTime as char)": value[0].format("YYYY-MM-DD HH:mm:ss"),
      "CAST(EndTime as char)": value[1].format("YYYY-MM-DD HH:mm:ss")
    };
  }
  dispatch({
    type: CHANGE_RANGE,
    payload: { showErrorModal: false, rangeHours: newRangeHours }
  });
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
  showErrorModal: false,
  errorMessage: "Oops! Something went wrong!"
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
      return { ...state, ...action.payload };
    }
    case CLOSE_ERROR_MODAL: {
      return { ...state, showErrorModal: action.payload };
    }
    default:
      return state;
  }
};
