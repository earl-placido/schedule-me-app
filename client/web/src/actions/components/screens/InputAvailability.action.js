import axios from 'axios';

import {getMemberIdWithEmail} from '../generalQueries/groupMember.action';

export const GROUP_INFORMATION = 'group_information';
export const SELECT_DATE = 'select_date';
export const SHOW_MODAL = 'show_modal';
export const CANCEL_AVAILABILITY = 'cancel_availability';
export const DELETE_AVAILABILITY = 'delete_availability';
export const ADD_AVAILABILITY = 'add_availability';
export const ADD_RANGE = 'add_range';
export const CHANGE_RANGE = 'change_range';


export const getGroupInformation = (id) => async(dispatch) => {
    const groupInformation = await axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${id}`);
    const groupId = groupInformation.data.GroupId;
    const memberId = await getMemberIdWithEmail(groupId, localStorage.getItem("userEmail"));
    
    dispatch({
        type: GROUP_INFORMATION,
        payload: {groupInformation: groupInformation.data, memberId}
    });
};

export const selectDate = (date) => {
    return {
        type: SELECT_DATE, 
        payload: date
    }
};

export const showModal = (selectedDate, availableDays) => {
    const day = selectedDate.day();
    const rangeHours = availableDays[day] || [''];
    return {
        type: SHOW_MODAL, 
        payload: {modalVisible: true, rangeHours}
    };
};


export const cancelAvailability = () => {
    return {
        type: SHOW_MODAL, 
        payload: {modalVisible: false}
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

export const convertDatesToDay = (currentYear, currentMonth) => {
    const firstDateOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDateOfMonth = new Date(currentYear, (currentMonth+1) % 11, 0);
    const firstDayOfMonth = firstDateOfMonth.getDay();
    const lastDayOfMonth = lastDateOfMonth.getDay();

    let datesToDay = {}

    // calculate all the dates for a given day (index refers to day: monday, tuesday, ...)
    // {Monday: [1,8,15,22,29], Tuesday: [2,9,16,23,30], ...}
    for (let dayIndex = 1; dayIndex < 8; dayIndex++) {
        firstDateOfMonth.getDay();

        let currentDate = dayIndex;
        datesToDay[currentDate] = (firstDayOfMonth + (dayIndex-1)) % 6; // convert date to day
        
        // get the same day of the following weeks
        currentDate += 7;
        while (currentDate <= lastDayOfMonth) {
            datesToDay[currentDate] = (firstDayOfMonth + (dayIndex-1)) % 6;
            currentDate += 7;
        }
    }

    return datesToDay;

};


const INITIAL_STATE = {modalVisible: false, rangeHours: [''], selectedDate: '', availableDays: {}, groupInformation: '', memberId: ''};

export default(state=INITIAL_STATE, action) => {
    switch(action.type) {
        case (GROUP_INFORMATION): {
            return {...state, ...action.payload}
        }
        case(SELECT_DATE): {
            return {...state, selectedDate: action.payload};
        }
        case(SHOW_MODAL): {
            return {...state, ...action.payload};
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