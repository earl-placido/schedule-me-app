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
// error modal
export const CLOSE_ERROR_MODAL = "close_error_modal";

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

export const goNextPage = (
  groupName,
  groupDescription,
  duration,
  frequency,
  location,
  currentPage
) => {
  // pass in meeting and share parameters once done
  if (currentPage === 0) {
    return inputGroupInfo(currentPage, groupName, groupDescription);
  } else if (currentPage === 1) {
    return inputMeetingInfo(
      currentPage,
      groupName,
      groupDescription,
      duration,
      frequency,
      location
    );
  }
};

const inputGroupInfo = (currentPage, groupName, groupDesc) => {
  if (groupName.length === 0) {
    // must have a value for group name
    return { type: GO_NEXT_PAGE, payload: { success: false, hasAName: false } };
  } else if (groupDesc.length > 225) {
    return {
      type: GO_NEXT_PAGE,
      payload: { success: false, hasAName: true, descriptionTooLong: true }
    };
  }
  return {
    type: GO_NEXT_PAGE,
    payload: {
      success: true,
      hasAName: true,
      descriptionTooLong: false,
      currentPage: currentPage + 1
    }
  };
};

const inputMeetingInfo = (
  currentPage,
  groupName,
  groupDescription,
  duration,
  frequency,
  location
) => {
  if (duration === null || duration === 0) {
    return {
      type: SUBMIT_GROUP_CREATION,
      payload: { success: false, hasMeetingDuration: false }
    };
  }
  return submitGroupCreation(
    groupName,
    groupDescription,
    duration,
    frequency,
    location,
    currentPage
  );
};

function convertToServerDuration(meetingDuration) {
  const hours = Math.trunc(meetingDuration / 60)
    .toString()
    .padStart(2, "0");
  const mins = (meetingDuration % 60).toString().padStart(2, "0");
  meetingDuration = hours + mins + "00";

  return meetingDuration;
}

/***** submit group/meeting form *****/
const submitGroupCreation = (
  groupName,
  groupDesc,
  meetingDuration,
  meetingFrequency,
  meetingLocation,
  currentPage
) => async dispatch => {
  meetingDuration = convertToServerDuration(meetingDuration);

  const groupCreation = {
    groupName,
    groupDesc,
    meetingDuration,
    meetingFrequency,
    meetingLocation
  };
  const authToken = localStorage.getItem("token");
  // call backend to add group
  await axios
    .post(
      `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups`,
      groupCreation,
      {
        headers: {
          accept: "application/json",
          Authorization: `${authToken}`
        }
      }
    )
    .then(response => {
      if (response.status === 201) {
        if (response.data.error) {
          dispatch({
            type: SUBMIT_GROUP_CREATION,
            payload: { success: false, response, showErrorModal: true }
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
          payload: { success: false, response, showErrorModal: true }
        });
      }
    })
    .catch(() => {
      dispatch({
        type: SUBMIT_GROUP_CREATION,
        payload: { success: false, showErrorModal: true }
      });
    });
};

export const goPreviousPage = currentPage => {
  let newPage = currentPage;
  if (currentPage > 0) newPage = currentPage - 1;

  return {
    type: GO_PREVIOUS_PAGE,
    payload: newPage
  };
};

export const closeErrorModal = () => async dispatch => {
  dispatch({
    type: CLOSE_ERROR_MODAL,
    payload: false
  });
};

const INITIAL_STATE = {
  groupName: "",
  groupDescription: "",
  duration: null,
  meetingFrequency: null,
  meetingLocation: null,
  link: "",
  response: null,
  currentPage: 0,
  success: true,
  hasMeetingDuration: true,
  hasAName: true,
  descriptionTooLong: false,
  showErrorModal: false
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
    case CLOSE_ERROR_MODAL: {
      return { ...state, showErrorModal: action.payload };
    }
    default: {
      return state;
    }
  }
};