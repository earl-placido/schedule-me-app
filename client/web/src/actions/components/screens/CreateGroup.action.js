export const UPDATE_GROUP_NAME = 'update_group_name';
export const UPDATE_GROUP_DESCRIPTION = 'update_group_description';
export const GO_NEXT_PAGE = 'go_next_page';
export const GO_PREVIOUS_PAGE = 'go_previous_page';

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

// return true if success, false if fail
export const goNextPage = (groupName, currentPage) => {  // pass in meeting and share parameters once done
    if (groupName.length === 0)  // must have a value for group name
        return {type: GO_NEXT_PAGE, payload: {success: false}};
    
    if(currentPage === 2)
        return {type: GO_NEXT_PAGE, payload: {success: true, currentPage }};
    else
    return {type: GO_NEXT_PAGE, payload: {success: true, currentPage: currentPage+1 }};
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

const INITIAL_STATE = {groupName: '', groupDescription: '', success: true, currentPage: 0};

export default(state=INITIAL_STATE, action) => {
    switch(action.type) {
        case(UPDATE_GROUP_NAME): {
            return {...state, groupName: action.payload};
        }
        case (UPDATE_GROUP_DESCRIPTION): {
            return {...state, groupDescription: action.payload};
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