import responses from '../../util/responses';

export const LOGIN_REQUEST = 'login_request';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_ERROR = 'login_error';
export const LOGOUT_SUCCESS = 'logout_success';

const INITIAL_STATE = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    userName: localStorage.getItem('userName'),
    displayPicURL: localStorage.getItem('displayPicURL'),
    message: '',
    errored: false
};

const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    };
}

const loginSuccess = (userName, displayPicURL, token) => {
    return {
        type: LOGIN_SUCCESS,
        payload: { userName, displayPicURL, token }
    };
}

const loginError = (error) => {
    return {
        type: LOGIN_ERROR,
        payload: error
    };
}

const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    };
}

export const loginGoogle = (response) => {
    return dispatch => {
        dispatch(loginRequest());
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/auth/google`, options).then(res => {
            if (res.status === responses.SUCCESS) {
                const token = res.headers.get('x-auth-token');
                res.json().then(user => {
                    localStorage.setItem('token', token);
                    localStorage.setItem('userName', user.displayName);
                    localStorage.setItem('userId', user.id);
                    localStorage.setItem('displayPicURL', user._json.picture);

                    dispatch(loginSuccess(user.displayName, user._json.picture, token));
                });
            }
            else {
                throw new Error(res.err);
            }
        }).catch(err => dispatch(loginError(err.message)));
    }
}

export const logoutGoogle = () => {
    return dispatch => {
        localStorage.removeItem('token');
        dispatch(logoutSuccess());
    };
}

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isAuthenticated: false,
                message: 'Logging in'
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                message: 'Login is successful',
                token: action.payload.token,
                userName: action.payload.userName,
                displayPicURL: action.payload.displayPicURL
            };

        case LOGIN_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                errored: true,
                message: action.payload
            };

        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                userName: null,
                displayPicURL: null
            };

        default:
            return state;
        }
}