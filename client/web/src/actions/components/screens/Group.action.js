import moment from 'moment';

export const SELECT_DATE = 'select_date';
export const SHOW_MODAL = 'show_modal';
export const HANDLE_OK = 'handle_ok';
export const CANCEL_AVAILABILITY = 'cancel_availability';
export const DELETE_AVAILABILITY = 'delete_availability';
export const ADD_AVAILABILITY = 'add_availability';
export const ADD_RANGE = 'add_range';
export const CHANGE_RANGE = 'change_range';


// const numberToDay = {
//     1: "Monday",
//     2: "Tuesday",
//     3: "Wednesday",
//     4: "Thursday",
//     5: "Friday",
//     6: "Saturday",
//     0: "Sunday"
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
        payload: newRangeHours
    };
};

export const addAvailability = (selectedDate, rangeHours, availableDays) => {
    //currently doesn't check for clashing of time
    const day = selectedDate.day();
    availableDays[day] = rangeHours;
    return {
        type: ADD_AVAILABILITY, 
        payload: {availableDays, modalVisible: false, rangeHours: ['']}
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

const convertDatesToDay = (currentYear, currentMonth) => {
    const firstDateOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDateOfMonth = new Date(currentYear, currentMonth+1, 0);

    let datesToDay = {}

    // calculate all the dates for a given day (index refers to day: monday, tuesday, ...)
    // {Monday: [1,8,15,22,29], Tuesday: [2,9,16,23,30], ...}
    for (let dayIndex = 1; dayIndex < 8; dayIndex++) {
        firstDateOfMonth.getDay();

        let currentDate = dayIndex;
        datesToDay[currentDate] = (firstDateOfMonth.getDay() + (dayIndex-1)) % 6; // convert date to day
        currentDate += 7;
        while (currentDate <= lastDateOfMonth) 
            datesToDay[currentDate] = (firstDateOfMonth.getDay() + (dayIndex-1)) % 6;
    }

    return datesToDay;

};

export const onPanelChange = (value, availableDays) => {
    // check if month changed

};

const INITIAL_STATE = {modalVisible: false, rangeHours: [''], selectedDate: '', availableDays: {}};

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
        case (ADD_AVAILABILITY): {
            return {...state, ...action.payload};
        }
        case (ADD_RANGE): {
            return {...state, rangeHours: action.payload};
        }
        case(CHANGE_RANGE): {
            return {...state, rangeHours: action.payload};
        }
        default:
            return INITIAL_STATE;
    }
};