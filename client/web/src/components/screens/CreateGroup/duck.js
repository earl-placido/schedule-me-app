const UPDATE_GROUP_NAME = 'update_group_name';
const UPDATE_GROUP_DESCRIPTION = 'update_group_description';
const SUBMIT_NEW_GROUP = 'submit_new_group';

export const updateGroupName = (groupName) => {
    return {
        type: UPDATE_GROUP_NAME, 
        payload: groupName
    };
};

export const updateGroupDescription = (groupDescription) => {
    return {
        type: UPDATE_GROUP_DESCRIPTION,
        payload: updateGroupDescription
    };
};

// return true if success, false if fail
export const handleSubmit = (groupName) => {
    if (groupName.length == 0) 
        return {type: SUBMIT_NEW_GROUP, payload: false};
    else
        return {type: SUBMIT_NEW_GROUP, payload: true};
};

const INITIAL_STATE = {groupName: '', groupDescription: '', success: true};

export default(state=INITIAL_STATE, action) => {
    switch(action.type) {
        case(UPDATE_GROUP_NAME): {
            return {...state, groupName: action.payload};
        }
        case (UPDATE_GROUP_DESCRIPTION): {
            return {...state, groupDescription: action.payload};
        }
        case (SUBMIT_NEW_GROUP): {
            return {...state, success: action.payload};
        }
        default: {
            return INITIAL_STATE;
        }
    }
};