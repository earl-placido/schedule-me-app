export const SELECT_DATE = 'select_date';
export const SHOW_MODAL = 'show_modal';
export const HANDLE_OK = 'handle_ok';
export const CANCEL_AVAILABILITY = 'cancel_availability';
export const DELETE_AVAILABILITY = 'delete_availability';
export const ADD_RANGE = 'add_range';
export const CHANGE_RANGE = 'change_range';


// const numberToDay = {
//     1: "Monday",
//     2: "Tuesday",
//     3: "Wednesday",
//     4: "Thursday",
//     5: "Friday",
//     6: "Saturday",
//     7: "Sunday"
// };

export const selectDate = (date) => {
    return {
        type: SELECT_DATE, 
        payload: date
    }
};

export const showModal = () => {
    return {
        type: SHOW_MODAL, 
        payload: true
    };
};


export const cancelAvailability = () => {
    return {
        type: SHOW_MODAL, 
        payload: false
    };
};

export const deleteAvailability = (rangeHours) => {
    let newRangeHours = [...rangeHours];
    newRangeHours.pop();

    return {
        type: DELETE_AVAILABILITY,
        payload: rangeHours
    };
};

export const handleAdd = (rangeHours) => {
    return {
        type: ADD_RANGE,
        payload: [...rangeHours, '']
    };
};

export const onChangeRange = (index, value, rangeHours) => {
    let newRangeHours = [...rangeHours];
    newRangeHours[index] = value;
    return {
        type: CHANGE_RANGE,
        payload: newRangeHours
    };
};

// export const onMonthChange = value => {
//     // check if month changed
// };

const INITIAL_STATE = {modalVisible: false, rangeHours: [''], selectedDate: ''};

export default(state=INITIAL_STATE, action) => {
    switch(action.type) {
        case(SELECT_DATE): {
            return {...state, selectedDate: action.payload};
        }
        case(SHOW_MODAL): {
            return {...state, modalVisible: action.payload};
        }
        case(CANCEL_AVAILABILITY): {
            return {...state, modalVisible: action.payload};
        }
        case(DELETE_AVAILABILITY): {
            return {...state, rangeHours: action.payload};
        }
        case (ADD_RANGE): {
            return {...state, rangeHours: action.payload};
        }
        case(CHANGE_RANGE): {
            return {...state, rangeHours: action.payload};
        }
    }
};