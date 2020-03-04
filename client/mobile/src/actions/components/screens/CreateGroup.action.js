export const UPDATE_GROUP_NAME = 'update_group_name';
export const UPDATE_GROUP_DESCRIPTION = 'update_group_description';
export const UPDATE_MEETING_DURATION = 'update_meeting_duration';
export const UPDATE_MEETING_FREQUENCY = 'update_meeting_frequency';
export const UPDATE_MEETING_LOCATION = 'update_meeting_location';

export const updateGroupName = (groupName) => {
    return {
        type: UPDATE_GROUP_NAME, 
        payload: groupName
    };
};

export const updateGroupDescription = (groupDescription) => {
    return {
        type: UPDATE_GROUP_DESCRIPTION,
        payload: groupDescription
    };
};

export const updateMeetingDuration = (meetingDuration) => {
    return {
        type: UPDATE_MEETING_DURATION,
        payload: meetingDuration
    };
};

export const updateMeetingFrequency = (meetingFrequency) => {
    return {
        type: UPDATE_MEETING_FREQUENCY,
        payload: meetingFrequency
    };
};

export const updateMeetingLocation = (meetingLocation) => {
    return {
        type: UPDATE_MEETING_LOCATION,
        payload: meetingLocation
    };
};

const INITIAL_STATE = {groupName: '', groupDescription: '', meetingDuration: '', meetingFrequency: '', meetingLocation: ''};

export default(state=INITIAL_STATE, action) => {
    switch(action.type) {
        case(UPDATE_GROUP_NAME): {
            return {...state, groupName: action.payload};
        }
        case (UPDATE_GROUP_DESCRIPTION): {
            return {...state, groupDescription: action.payload};
        }
        case (UPDATE_MEETING_DURATION): {
            return {...state, meetingDuration: action.payload};
        }
        case (UPDATE_MEETING_FREQUENCY): {
            return {...state, meetingFrequency: action.payload};
        }
        case (UPDATE_MEETING_LOCATION): {
            return {...state, meetingLocation: action.payload};
        }
        default: {
            return INITIAL_STATE;
        }
    }
};
