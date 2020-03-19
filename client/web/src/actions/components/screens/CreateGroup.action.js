import axios from "axios";

// group
export const UPDATE_GROUP_NAME = "update_group_name";
export const UPDATE_GROUP_DESCRIPTION = "update_group_description";
// meeting
export const UPDATE_MEETING_DURATION = "UPDATE_MEETING_DURATION";
export const UPDATE_MEETING_FREQUENCY = "UPDATE_MEETING_FREQUENCY";
export const UPDATE_MEETING_LOCATION = "UPDATE_MEETING_LOCATION";
// container page
export const GO_NEXT_PAGE = "go_next_page";
export const GO_PREVIOUS_PAGE = "go_previous_page";
// submit group creation
export const SUBMIT_GROUP_CREATION = "submit_group_creation";

/****** group actions *******/
export const updateGroupName = groupName => {
  return {
    type: UPDATE_GROUP_NAME,
    payload: groupName
  };
};

export const updateGroupDescription = groupDescription => {
  return {
    type: UPDATE_GROUP_DESCRIPTION,
    payload: groupDescription
  };
};

/****** meeting actions ******/
export const updateMeetingDuration = duration => {
  return {
    type: UPDATE_MEETING_DURATION,
    payload: duration
  };
};

export const updateMeetingFrequency = frequency => {
  return {
    type: UPDATE_MEETING_FREQUENCY,
    payload: frequency
  };
};

export const updateMeetingLocation = location => {
  return {
    type: UPDATE_MEETING_LOCATION,
    payload: location
  };
};

// return true if success, false if fail
export const goNextPage = (
  groupName,
  groupDescription,
  duration,
  frequency,
  location,
  currentPage
) => {
  // pass in meeting and share parameters once done
  if (currentPage === 0) return groupPageLogic(groupName, currentPage);
  else
    return submitGroupCreation(
      groupName,
      groupDescription,
      duration,
      frequency,
      location,
      currentPage
    );
};

const groupPageLogic = (groupName, currentPage) => {
  if (groupName.length === 0)
    // must have a value for group name
    return { type: GO_NEXT_PAGE, payload: { success: false } };
  else
    return {
      type: GO_NEXT_PAGE,
      payload: { success: true, currentPage: currentPage + 1 }
    };
};

/***** submit group/meeting form *****/
const submitGroupCreation = (
  groupName,
  groupDesc,
  duration,
  meetingFrequency,
  meetingLocation,
  currentPage
) => async dispatch => {
  if (duration === null)
    return { type: SUBMIT_GROUP_CREATION, payload: { success: false } };

  const dateDuration = duration.toDate(); // to format to 2 decimals
  const hours = ("0" + dateDuration.getHours()).slice(-2);
  const minutes = ("0" + dateDuration.getMinutes()).slice(-2);
  const seconds = ("0" + dateDuration.getSeconds()).slice(-2);

  const meetingDuration = hours + minutes + seconds;
  const groupCreation = {
    groupName,
    groupDesc,
    meetingDuration,
    meetingFrequency,
    meetingLocation
  };
  const authToken = localStorage.getItem("token");

  // call backend to add group
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups`,
    groupCreation,
    {
      headers: {
        accept: "application/json",
        Authorization: `${authToken}`
      }
    }
  );
  //success
  if (response.status === 201) {
    if (response.data.error) {
      dispatch({
        type: SUBMIT_GROUP_CREATION,
        payload: { success: false, response, currentPage: currentPage }
      });
      return;
    }

    const link = `${window.location.origin}/groups/${response.data.groupId}/`;
    dispatch({
      type: SUBMIT_GROUP_CREATION,
      payload: { success: true, link, currentPage: currentPage + 1 }
    });
  } else {
    dispatch({
      type: SUBMIT_GROUP_CREATION,
      payload: { success: false, response, currentPage: currentPage }
    });
  }
};

export const goPreviousPage = currentPage => {
  let newPage = currentPage;
  if (currentPage > 0) newPage = currentPage - 1;

  return {
    type: GO_PREVIOUS_PAGE,
    payload: newPage
  };
};

const INITIAL_STATE = {
  groupName: "",
  groupDescription: "",
  duration: null,
  meetingFrequency: null,
  meetingLocation: null,
  link: "",
  response: null,
  success: true,
  currentPage: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_GROUP_NAME: {
      return { ...state, groupName: action.payload };
    }
    case UPDATE_GROUP_DESCRIPTION: {
      return { ...state, groupDescription: action.payload };
    }
    case UPDATE_MEETING_DURATION: {
      return { ...state, duration: action.payload };
    }
    case UPDATE_MEETING_FREQUENCY: {
      return { ...state, frequency: action.payload };
    }
    case UPDATE_MEETING_LOCATION: {
      return { ...state, location: action.payload };
    }
    case SUBMIT_GROUP_CREATION: {
      return { ...state, ...action.payload };
    }
    case GO_NEXT_PAGE: {
      return { ...state, ...action.payload };
    }
    case GO_PREVIOUS_PAGE: {
      return { ...state, currentPage: action.payload };
    }
    default: {
      return state;
    }
  }
};
