import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {
  getGroupList,
  closeErrorModal,
  GROUP_LIST,
  CLOSE_ERROR_MODAL
} from "../../../../actions/components/layout/NavigationBar.action";

describe("test NavigationBar actions", () => {
  let store, httpMock;
  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    const mockStore = configureMockStore();
    store = mockStore({});
    httpMock = new MockAdapter(axios);
  });

  it("test get group list", async () => {
    const groups = [{ groupId: 1 }, { groupId: 2 }];

    httpMock
      .onGet(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/`)
      .reply(200, { groups: [{ groupId: 1 }, { groupId: 2 }] });

    // handle happy path
    getGroupList()(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()[0].type).toEqual(GROUP_LIST);
    expect(store.getActions()[0].payload.groupList).toEqual(groups);

    //handle bad path
    store.clearActions();
    httpMock
      .onGet(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/`)
      .reply({ groups: [{ groupId: 1 }, { groupId: 2 }] });

    getGroupList()(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()[0].type).toEqual(GROUP_LIST);
    expect(store.getActions()[0].payload.groupList).toEqual([]);
    expect(store.getActions()[0].payload.showErrorModal).toEqual(true);
  });

  it("test close error modal", async () => {
    closeErrorModal()(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()[0].type).toEqual(CLOSE_ERROR_MODAL);
    expect(store.getActions()[0].payload).toEqual(false);
  });
});
