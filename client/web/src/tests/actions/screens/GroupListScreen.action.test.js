import axios from "axios";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";

import MainPageReducer, {
  getGroupList,
  closeErrorModal,
  GROUP_LIST,
  CLOSE_ERROR_MODAL
} from "../../../actions/screens/GroupListScreen.action";

describe("MainPage action", () => {
  const INITIAL_STATE = {
    groupList: [],
    showErrorModal: false
  };
  let httpMock, store;

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it("test getGroupList", async () => {
    const payload = { type: GROUP_LIST, payload: { groupList: ["1"] } };
    const reducerItem = MainPageReducer(INITIAL_STATE, payload);
    expect(reducerItem.groupList[0]).toEqual("1");

    httpMock
      .onGet(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/`)
      .reply(200, { groups: ["1"] });
    await getGroupList()(store.dispatch);

    expect(store.getActions()[0].type).toEqual(GROUP_LIST);
    expect(store.getActions()[0].payload).toEqual({ groupList: ["1"] });

    store.clearActions();
    // handle bad path, no status 200
    httpMock
      .onGet(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/`)
      .reply({ groups: ["1"] });
    await getGroupList()(store.dispatch);

    expect(store.getActions()[0].type).toEqual(GROUP_LIST);
    expect(store.getActions()[0].payload).toEqual({
      groupList: [],
      showErrorModal: true
    });
  });

  it("test close error modal", async () => {
    await closeErrorModal()(store.dispatch);
    expect(store.getActions()[0].type).toEqual(CLOSE_ERROR_MODAL);
    expect(store.getActions()[0].payload).toEqual(false);
  });
});
