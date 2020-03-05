import axios from 'axios';
import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';

import {selectDate, showModal, cancelAvailability, deleteAvailability, addAvailability, getGroupInformation,
handleAdd, onChangeRange, convertDatesToDay,
SELECT_DATE, SHOW_MODAL, DELETE_AVAILABILITY, GROUP_INFORMATION,
ADD_AVAILABILITY, ADD_RANGE, CHANGE_RANGE} from '../../../../actions/components/screens/Group.action';

describe('test group actions', () => {

    it ('test selectdate action', () => {
        const date = moment();
        const value = selectDate(date);
        expect(value.type).toEqual(SELECT_DATE);
        expect(value.payload).toEqual(date);
    });

    it ('test showmodal action', () => {
        const currentDate = moment();
        const availableDays = {};
        const value = showModal(currentDate, availableDays);
        expect(value.type).toEqual(SHOW_MODAL);
        expect(value.payload.modalVisible).toEqual(true);
    });

    it ('test cancel availability action', () => {
        const value = cancelAvailability();
        expect(value.type).toEqual(SHOW_MODAL);
        expect(value.payload.modalVisible).toEqual(false);
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

    it ('test handleadd action', () => {
        const rangeHours = [''];
        const newRangeHours = handleAdd(rangeHours);

        expect(newRangeHours.type).toEqual(ADD_RANGE);
        expect(newRangeHours.payload.length).toEqual(2);
        expect(newRangeHours.payload[1]).toEqual('');
    });

    it ('test onChangeRange action', () => {
        const date = moment();
        const date2 = moment();
        const rangeHours = [date, date2];
        const newRangeHours = onChangeRange(0, moment("12-25-1995", 'MM-DD-YYYY'), rangeHours);
        expect(newRangeHours.type).toEqual(CHANGE_RANGE);
        expect(newRangeHours.payload[0].year()).toEqual(1995);
        expect(newRangeHours.payload[0].month()).toEqual(11);
    });

    it ('test convertDatesToDay action', () => {
        const currentDate = moment();
        const datesToDay = convertDatesToDay(currentDate.year(), currentDate.month());
        expect(datesToDay[currentDate.date()]).toEqual(currentDate.day());
    });
    
});

describe('test contacting server from group', () => {
    let store, httpMock;
    const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

    beforeEach(() => {
        httpMock = new MockAdapter(axios);
        const mockStore = configureMockStore();
        store = mockStore({});
    });

    it('test obtaining group information', async() => {
        httpMock.onGet(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/1000000`).reply(200, {
            data: {
                GroupId: 1,
                GroupName: 'we'
            }
        });

        getGroupInformation(1000000)(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()[0].type).toEqual(GROUP_INFORMATION);
        expect(store.getActions()[0].payload).toEqual({data: {GroupId: 1, GroupName: 'we'}});

    });
});