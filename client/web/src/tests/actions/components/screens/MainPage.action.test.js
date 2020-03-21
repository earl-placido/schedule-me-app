import MainPageReducer, {
  GROUP_LIST
} from "../../../../actions/components/screens/MainPage.action";

describe("MainPage action", () => {
  const INITIAL_STATE = {
    groupList: [],
    showErrorModal: false
  };
  it("test getGroupList", () => {
    const payload = { type: GROUP_LIST, payload: { groupList: ["1"] } };
    const reducerItem = MainPageReducer(INITIAL_STATE, payload);
    expect(reducerItem.groupList[0]).toEqual("1");
  });
});
