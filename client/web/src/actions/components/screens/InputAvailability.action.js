import axios from "axios";

import { getMemberIdWithEmail } from "../generalQueries/groupMember.action";
import {
  getAvailabilityQuery,
  addAvailabilityQuery
} from "../generalQueries/Availability.action";
import { convertAvailabilityToDays } from "../../util/date/day";

export const GROUP_INFORMATION = "group_information";
export const SELECT_DATE = "select_date";
export const SHOW_MODAL = "show_modal";
export const GET_AVAILABILITY = "get_availability";
export const CANCEL_AVAILABILITY = "cancel_availability";
export const DELETE_AVAILABILITY = "delete_availability";
export const ADD_AVAILABILITY = "add_availability";
export const ADD_RANGE = "add_range";
export const CHANGE_RANGE = "change_range";

export const getInformation = (groupId, availableDays) => async dispatch => {
  const groupInformation = await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}`
  );

  const memberId = await getMemberIdWithEmail(
    groupId,
    localStorage.getItem("userEmail")
  );
  const availability = await getAvailabilityQuery(memberId);
  if (availability.error) {
    dispatch({
      type: GROUP_INFORMATION,
      payload: {
        memberId,
        groupInformation: groupInformation.data,
        availableDays: {}
      }
    });
    return;
  }
  const newAvailableDays = convertAvailabilityToDays(
    availableDays,
    availability
  );

  dispatch({
    type: GROUP_INFORMATION,
    payload: {
      groupInformation: groupInformation.data,
      memberId,
      availableDays: newAvailableDays
    }
  });
};

export const selectDate = (selectedDate, availableDays) => {
  const day = selectedDate.day();

  let rangeHours = [""];
  if (availableDays !== undefined) rangeHours = availableDays[day] || [""];

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
  availableDays
) => async dispatch => {
  let newRangeHours = [...rangeHours];
  const removedRangeHours = newRangeHours.pop();
  console.log(removedRangeHours);
  console.log(removedRangeHours[0] === -1);
  // if the range hours that was removed is not empty
  if (removedRangeHours) {
    // if it is an existing id, then we query to the database to delete it
    if (removedRangeHours[0] !== -1) {
      // remove from database
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/availability`,
        {
          data: { availabilityIds: [removedRangeHours[0]] }
        }
      );

      // handle errors if there is
      if (response.data.error) {
        dispatch({ type: DELETE_AVAILABILITY, payload: newRangeHours });
        return;
      }

      // remove from availabilityDays
      const currentDay = removedRangeHours[1][0].day();

      const currentAvailableDays = availableDays[currentDay];
      for (let i = 0; i < currentAvailableDays.length; i++) {
        if (currentAvailableDays[i][1] === removedRangeHours[1]) {
          availableDays[currentDay].splice(i, 1);
          break;
        }
      }
    }
  }

  dispatch({
    type: DELETE_AVAILABILITY,
    payload: { rangeHours: newRangeHours, availableDays }
  });
};

// rangehours contain [[id, [start, end]], [id, [start, end]], ...]
export const addAvailability = (
  memberId,
  selectedDate,
  rangeHours,
  availableDays
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

  const day = selectedDate.day();
  const availabilityIds = filteredRangeHours.map(item => item[0]);
  const startTimes = filteredRangeHours.map(item => {
    if (item[1]) return item[1][0].format("YYYY-MM-DD HH:mm:ss");
  });
  const endTimes = filteredRangeHours.map(item => {
    if (item[1]) return item[1][1].format("YYYY-MM-DD HH:mm:ss");
  });

  const addedAvailabilityIds = await addAvailabilityQuery(
    memberId,
    availabilityIds,
    startTimes,
    endTimes
  );

  // update the ids of rangeHours after getting the availbilityId from database
  for (let i = 0; i < addedAvailabilityIds.data.ids.length; i++) {
    if (addedAvailabilityIds.data.ids[i] !== 0)
      filteredRangeHours[i][0] = addedAvailabilityIds.data.ids[i];
  }
  availableDays[day] = filteredRangeHours;

  dispatch({
    type: ADD_AVAILABILITY,
    payload: {
      availableDays,
      modalVisible: false,
      rangeHours: filteredRangeHours
    }
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
  newRangeHours[index] = [-1, value];
  return {
    type: CHANGE_RANGE,
    payload: newRangeHours
  };
};

const INITIAL_STATE = {
  modalVisible: false,
  rangeHours: [""],
  selectedDate: "",
  availableDays: {},
  groupInformation: "",
  memberId: ""
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
    default:
      return state;
  }
};
