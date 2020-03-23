export const SELECT_DATE = 'select_date';
export const SHOW_MODAL = 'showModal';

const INITIAL_STATE = {
  selectedDate: '',
  modalVisible: false,
};

export const selectDate = selectedDate => {
  return {
    type: SELECT_DATE,
    payload: {selectedDate},
  };
};

export const showModal = () => {
  return {
    type: SHOW_MODAL,
    payload: {modalVisible: true}
  }
}

export const cancelAvailability = () => {
  return {
    type: SHOW_MODAL,
    payload: {modalVisible: false}
  }
}


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_DATE: {
      return {...state, ...action.payload};
    }
    case SHOW_MODAL: {
      return {...state, ...action.payload};
    }
    default:
      return state;
  }
};
