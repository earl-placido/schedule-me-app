export const UPDATE_GROUP_NAME = 'update_group_name';
export const UPDATE_GROUP_DESCRIPTION = 'update_group_description';
export const UPDATE_GROUP_DURATION = 'update_group_duration';
export const UPDATE_GROUP_FREQUENCY = 'update_group_frequency';
export const UPDATE_GROUP_LOCATION = 'update_group_location';

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

export const updateGroupDuration = (groupDuration) => {
    return {
        type: UPDATE_GROUP_DURATION,
        payload: groupDuration
    };
};

export const updateGroupFrequency = (groupFrequency) => {
    return {
        type: UPDATE_GROUP_FREQUENCY,
        payload: groupFrequency
    };
};

export const updateGroupLocation = (groupLocation) => {
    return {
        type: UPDATE_GROUP_LOCATION,
        payload: groupLocation
    };
};

const INITIAL_STATE = {groupName: '', groupDescription: '', groupDuration: '', groupFrequency: '', groupLocation: ''};

export default(state=INITIAL_STATE, action) => {
    switch(action.type) {
        case(UPDATE_GROUP_NAME): {
            return {...state, groupName: action.payload};
        }
        case (UPDATE_GROUP_DESCRIPTION): {
            return {...state, groupDescription: action.payload};
        }
        case (UPDATE_GROUP_DURATION): {
            return {...state, groupDuration: action.payload};
        }
        case (UPDATE_GROUP_FREQUENCY): {
            return {...state, groupFrequency: action.payload};
        }
        case (UPDATE_GROUP_LOCATION): {
            return {...state, groupLocation: action.payload};
        }
        default: {
            return INITIAL_STATE;
        }
    }
};
