import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Config from 'react-native-config';
import configureMockStore from 'redux-mock-store';
import { updateGroupName, UPDATE_GROUP_NAME, UPDATE_GROUP_DESCRIPTION, updateGroupDescription, updateMeetingDuration, UPDATE_MEETING_DURATION, updateMeetingFrequency, UPDATE_MEETING_FREQUENCY, UPDATE_MEETING_LOCATION, updateMeetingLocation, resetCreateGroup, RESET_CREATE_GROUP, submitMeetingCreation, SUBMIT_MEETING_CREATION } from '../../src/actions/CreateGroup.action';

describe('test create group action', () => {
    it('updateGroupName action test', () => {
        const groupName = 'name';
        const response = updateGroupName(groupName);
        expect(response.type).toEqual(UPDATE_GROUP_NAME);
        expect(response.payload).toEqual(groupName);
    });

    it('updateGroupDescription action test', () => {
        const groupDescription = 'description';
        const response = updateGroupDescription(groupDescription);
        expect(response.type).toEqual(UPDATE_GROUP_DESCRIPTION);
        expect(response.payload).toEqual(groupDescription);
    });
    it('updateMeetingDuration action test', () => {
        const meetingDuration = 'duration';
        const response = updateMeetingDuration(meetingDuration);
        expect(response.type).toEqual(UPDATE_MEETING_DURATION);
        expect(response.payload).toEqual(meetingDuration);
    });
    it('updateMeetingFrequency action test', () => {
        const meetingFrequency = 'frequency';
        const response = updateMeetingFrequency(meetingFrequency);
        expect(response.type).toEqual(UPDATE_MEETING_FREQUENCY);
        expect(response.payload).toEqual(meetingFrequency);
    });
    it('updateMeetingLocation action test', () => {
        const meetingLocation = 'location';
        const response = updateMeetingLocation(meetingLocation);
        expect(response.type).toEqual(UPDATE_MEETING_LOCATION);
        expect(response.payload).toEqual(meetingLocation);
    });
    it('submitMeetingCreation action test', async() => {
        const mockStore = configureMockStore();
        const store = mockStore({});
        const httpMock = new MockAdapter(axios);

        const groupName = 'name';
        const groupDesc = 'desc';
        const duration = new Date('2020-04-07');
        const meetingFrequency = 'frequency';
        const meetingLocation = 'location';

        // should result in error because duration is not properly setup
        httpMock.onPost(`${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups`, {groupName, groupDesc, duration, meetingFrequency, meetingLocation}).reply(200, {groupId: 1});
        await submitMeetingCreation(groupName, groupDesc, duration, meetingFrequency, meetingLocation)(store.dispatch);
        expect(store.getActions()[0]).toEqual(undefined);


        // response 500
        store.clearActions();
        httpMock.onPost(`${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups`, {groupName, groupDesc, duration, meetingFrequency, meetingLocation}).reply(500, 'fail');
        await submitMeetingCreation(groupName, groupDesc, duration, meetingFrequency, meetingLocation)(store.dispatch);
        expect(store.getActions()[0]).toEqual(undefined);

        // happy path
        store.clearActions();
        const dateDuration = duration; // to format to 2 decimals
        const hours = ('0' + dateDuration.getHours()).slice(-2);
        const minutes = ('0' + dateDuration.getMinutes()).slice(-2);
        const seconds = '00';
        const meetingDuration = hours + minutes + seconds;
        httpMock.onPost(`${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups`, {groupName, groupDesc, meetingDuration, meetingFrequency, meetingLocation}).reply(200, {groupId: 1});
        await submitMeetingCreation(groupName, groupDesc, duration, meetingFrequency, meetingLocation)(store.dispatch);
        expect(store.getActions()[0].type).toEqual(SUBMIT_MEETING_CREATION);
        expect(store.getActions()[0].payload).toEqual({code: '1'});

    });
    it('resetCreateGroup action test', () => {
        const response = resetCreateGroup();
        expect(response.type).toEqual(RESET_CREATE_GROUP);
    });
});
