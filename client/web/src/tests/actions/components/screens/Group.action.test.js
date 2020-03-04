import moment from 'moment';

import {selectDate, showModal, cancelAvailability, deleteAvailability, addAvailability,
handleAdd, onChangeRange,
SELECT_DATE, SHOW_MODAL, HANDLE_OK, CANCEL_AVAILABILITY, DELETE_AVAILABILITY,
ADD_AVAILABILITY, ADD_RANGE, CHANGE_RANGE} from '../../../../actions/components/screens/Group.action';

describe('test group actions', () => {

    it ('test selectdate action', () => {
        const date = moment();
        const value = selectDate(date);
        expect(value.type).toEqual(SELECT_DATE);
        expect(value.payload).toEqual(date);
    });

    it ('test showmodal action', () => {
        const value = showModal();
        expect(value.type).toEqual(SHOW_MODAL);
        expect(value.payload).toEqual(true);
    });

    it ('test cancel availability action', () => {
        const value = cancelAvailability();
        expect(value.type).toEqual(SHOW_MODAL);
        expect(value.payload).toEqual(false);
    });

    it ('test delete availability action', () => {
        const value = deleteAvailability([1, 0]); // should remove the last item in the array
        expect(value.type).toEqual(DELETE_AVAILABILITY);
        expect(value.payload.length).toEqual(1);
        expect(value.payload[0]).toEqual(1);
    });

    it ('test add availability action', () => {
        const selectedDate = moment();
        const day = selectedDate.day();
        const rangeHours = [1, 0];
        let availableDays = {};
        
        const value = addAvailability(selectedDate, rangeHours, availableDays);
        expect(value.type).toEqual(ADD_AVAILABILITY);
        // close modal, add rangeHours to availableDays, reset rangeHours to empty
        expect(value.payload.modalVisible).toEqual(false);
        expect(value.payload.availableDays[day]).toEqual(rangeHours);
        expect(value.payload.rangeHours).toEqual(['']);
    });
    
});