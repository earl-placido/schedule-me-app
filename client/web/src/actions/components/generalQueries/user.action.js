import axios from 'axios';

const GET_USER_BY_EMAIL = 'get_user_by_email';

export const getUserByEmail = (userEmail) => async(dispatch) => {
    const userId = await axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/users/${userEmail}`);
    dispatch({
        type: GET_USER_BY_EMAIL, 
        payload: userId.data.userId
    });
};

const INITIAL_STATE = {userId: ''};

export default(state=INITIAL_STATE, action) => {
    switch(action.type) {
        case(GET_USER_BY_EMAIL): {
            return {...state, userId: action.payload}
        }
        default: {
            return state;
        }
    }
};