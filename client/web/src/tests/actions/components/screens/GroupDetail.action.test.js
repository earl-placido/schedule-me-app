import GroupDetailReducer, {
  GROUP_MEMBERS
} from "../../../../actions/components/screens/GroupDetail.action";

describe("GroupDetail action", () => {
  const INITIAL_STATE = {
    groupMembers: []
  };
  it("test getGroupMembers", () => {
    const payload = { type: GROUP_MEMBERS, payload: ["Johnny"] };
    const reducerItem = GroupDetailReducer(INITIAL_STATE, payload);
    expect(reducerItem.groupMembers[0]).toEqual("Johnny");
  });
});
