// group
export const UPDATE_GROUP_NAME = 'update_group_name';
export const UPDATE_GROUP_DESCRIPTION = 'update_group_description';
// meeting
export const UPDATE_MEETING_DURATION = 'UPDATE_MEETING_DURATION';
export const UPDATE_MEETING_FREQUENCY = 'UPDATE_MEETING_FREQUENCY';
export const UPDATE_MEETING_LOCATION = 'UPDATE_MEETING_LOCATION';
// container page
export const GO_NEXT_PAGE = 'go_next_page';
export const GO_PREVIOUS_PAGE = 'go_previous_page';
// submit group creation
export const SUBMIT_GROUP_CREATION = 'submit_group_creation';

/****** group actions *******/
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
export const goNextPage = (groupName, groupDescription, duration, frequency, location, currentPage) => {  // pass in meeting and share parameters once done
    if (currentPage === 0)
        return groupPageLogic(groupName, currentPage);
    else
        return submitGroupCreation(groupName, groupDescription, duration, frequency, location, currentPage);
};

const groupPageLogic = (groupName, currentPage) => {
    if (groupName.length === 0)  // must have a value for group name
        return {type: GO_NEXT_PAGE, payload: {success: false}};
    else
        return {type: GO_NEXT_PAGE, payload: {success: true, currentPage: currentPage+1}};
};

/***** submit group/meeting form *****/
export const submitGroupCreation = (groupName, groupDescription,
    duration, frequency, location, currentPage) => {
        if (duration === null)
            return {type:SUBMIT_GROUP_CREATION  , payload: {success: false}};
        
        // call backend to add group
        return {type:SUBMIT_GROUP_CREATION  , payload: {success: true, currentPage: currentPage+1}}; 
};


export const goPreviousPage = (currentPage) => {
    let newPage = currentPage;
    if (currentPage > 0) 
        newPage = currentPage - 1;

    return {
        type: GO_PREVIOUS_PAGE, 
        payload: newPage
    };
};

const INITIAL_STATE = {groupName: '', groupDescription: '', 
                       duration: null, meetingFrequency: null, meetingLocation: null,
                       success: true, currentPage: 0};

export default(state=INITIAL_STATE, action) => {
    switch(action.type) {
        case(UPDATE_GROUP_NAME): {
            return {...state, groupName: action.payload};
        }
        case (UPDATE_GROUP_DESCRIPTION): {
            return {...state, groupDescription: action.payload};
        }
        case (UPDATE_MEETING_DURATION): {
            return {...state, duration: action.payload};
        }
        case (UPDATE_MEETING_FREQUENCY): {
            return {...state, frequency: action.payload};
        }
        case (UPDATE_MEETING_LOCATION): {
            return {...state, location: action.payload};
        }
        case (SUBMIT_GROUP_CREATION): {
            return {...state, ...action.payload};
        }
        case (GO_NEXT_PAGE): {
            return {...state, ...action.payload};
        }
        case (GO_PREVIOUS_PAGE): {
            return {...state, currentPage: action.payload};
        }
        default: {
            return INITIAL_STATE;
        }
    }
};