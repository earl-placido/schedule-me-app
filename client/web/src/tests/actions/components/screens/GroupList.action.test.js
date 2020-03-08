import GroupListReducer, {
  GROUP_LIST
} from "../../../../actions/components/screens/GroupList.action";

describe("CreateGroup action", () => {
  const INITIAL_STATE = {
    groupList: []
  };
  it("test getGroupList", () => {
    const payload = { type: GROUP_LIST, payload: ["1"] };
    const reducerItem = GroupListReducer(INITIAL_STATE, payload);
    expect(reducerItem.groupList[0]).toEqual("1");
  });
});
