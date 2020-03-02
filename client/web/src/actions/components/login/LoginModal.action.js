export const TOGGLE_MODAL = 'toggle_modal';

export const toggleModal = (value) => {
    return {
        type: TOGGLE_MODAL, 
        payload: value
    };
};

const INITIAL_STATE = { modalVisible: false }

export default(state = INITIAL_STATE, action) => {
    switch(action.type){
        case(TOGGLE_MODAL) : {
            return {... state, modalVisible: action.payload};
        }

        default: {
            return INITIAL_STATE;
        }
    }
}