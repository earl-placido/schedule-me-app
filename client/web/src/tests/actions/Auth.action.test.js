import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';

import { authenticate, logout,
LOGIN_REQUEST, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../../actions/Auth.action';

describe("test auth action", () => {
    // Storage Mock
    function storageMock() {
        let storage = {};

        return {
        setItem: function(key, value) {
            storage[key] = value || '';
        },
        getItem: function(key) {
            return key in storage ? storage[key] : null;
        },
        removeItem: function(key) {
            delete storage[key];
        },
        get length() {
            return Object.keys(storage).length;
        },
        key: function(i) {
            const keys = Object.keys(storage);
            return keys[i] || null;
        }
        };
    }
    let originalStorage = window.localStorage;
    let originalSessionStorage = window.sessionStorage;
    beforeAll(() => {
        window.localStorage = storageMock();
        window.sessionStorage = storageMock();
    });

    let httpMock, store;
    const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

    beforeEach(() => {
        httpMock = new MockAdapter(axios);
        const mockStore = configureMockStore();
        store = mockStore({});
    });

    it("test authenticate", async() => {
        const type = 'login';
        const response = {accessToken: null};

        httpMock.onPost(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/auth/` + type, 
        {accessToken: null}).reply(200, {
            firstName: 'first', lastName: 'last', displayPicURL: 'a', email: 'a@email.com'
        }, {"x-auth-token": 'token'});

        authenticate(type, response)(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()[0].type).toEqual(LOGIN_REQUEST);
        expect(store.getActions()[1].type).toEqual(LOGIN_SUCCESS);
        expect(localStorage.getItem('token')).toEqual('token');
        expect(localStorage.getItem('userName')).toEqual('first last');
        expect(localStorage.getItem('displayPicURL')).toEqual('a');
        expect(localStorage.getItem('userEmail')).toEqual('a@email.com');

        // bad path
        store.clearActions();
        httpMock.onPost(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/auth/` + type, 
        {accessToken: null}).reply(200, {
            firstName: 'first', lastName: 'last', displayPicURL: 'a', email: 'a@email.com'
        });
        authenticate(type, response)(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()[1].type).toEqual(LOGIN_ERROR);
        expect(store.getActions()[1].payload).toEqual("TypeError: Cannot read property 'x-auth-token' of undefined");

    });

    it("test logout", async() => {
        expect(localStorage.getItem('token')).toEqual('token');
        expect(localStorage.getItem('userName')).toEqual('first last');
        expect(localStorage.getItem('displayPicURL')).toEqual('a');
        expect(localStorage.getItem('userEmail')).toEqual('a@email.com');

        logout()(store.dispatch);
        await flushAllPromises();

        expect(store.getActions()[0].type).toEqual(LOGOUT_SUCCESS);
        expect(localStorage.getItem('token')).toEqual(null);
        expect(localStorage.getItem('userName')).toEqual(null);
        expect(localStorage.getItem('displayPicURL')).toEqual(null);
    });

    afterAll(() => {
        window.localStorage = originalStorage;
        window.sessionStorage = originalSessionStorage;
    });
});