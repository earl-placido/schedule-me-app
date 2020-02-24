import CreateGroupReducer, {updateGroupName, updateGroupDescription, goPreviousPage, goNextPage,
GO_NEXT_PAGE, GO_PREVIOUS_PAGE, UPDATE_GROUP_DESCRIPTION, UPDATE_GROUP_NAME } from '../../../../actions/components/screens/CreateGroup.action';

describe('CreateGroup action', () => {
    it('test update group name', () => {
        const updateGroupNameAction = updateGroupName('testgroupname');
        expect(updateGroupNameAction.type).toEqual(UPDATE_GROUP_NAME);
        expect(updateGroupNameAction.payload).toEqual('testgroupname');
    });

    it('test update group description', () => {
        const updateGroupDescriptionAction = updateGroupDescription('testgroupdescription');
        expect(updateGroupDescriptionAction.type).toEqual(UPDATE_GROUP_DESCRIPTION);
        expect(updateGroupDescriptionAction.payload).toEqual('testgroupdescription');
    });

    it('test go next page', () => {
        // test empty groupname, success should be false
        let goNextPageAction = goNextPage('', 0);
        expect(goNextPageAction.type).toEqual(GO_NEXT_PAGE);
        expect(goNextPageAction.payload.success).toEqual(false);

        // test not empty groupname, success should be true
        goNextPageAction = goNextPage('groupname', 0);
        expect(goNextPageAction.type).toEqual(GO_NEXT_PAGE);
        expect(goNextPageAction.payload.success).toEqual(true);
        expect(goNextPageAction.payload.currentPage).toEqual(1);

        // currentpage should not increase if at most right
        goNextPageAction = goNextPage('groupname', 2);
        expect(goNextPageAction.payload.currentPage).toEqual(2);
    });

    it('test go previous page', () => {
        // test previous page at index 0, should be 0
        let goNextPageAction = goPreviousPage(0);
        expect(goNextPageAction.type).toEqual(GO_PREVIOUS_PAGE);
        expect(goNextPageAction.payload).toEqual(0);

        // test previous page at not index 0, should reduce by 1
        goNextPageAction = goPreviousPage(1);
        expect(goNextPageAction.type).toEqual(GO_PREVIOUS_PAGE);
        expect(goNextPageAction.payload).toEqual(0);
    });
    
});

describe('test CreateGroup reducer', () => {
    const INITIAL_STATE = {groupName: '', groupDescription: '', success: true, currentPage: 0};

    it('test update group name', () => {
        const payload = {type: UPDATE_GROUP_NAME, payload: 'groupName'};
        const reducerItem = CreateGroupReducer(INITIAL_STATE, payload);
        expect(reducerItem.groupName).toEqual('groupName');
    });

    it('test update group description', () => {
        const payload = {type: UPDATE_GROUP_DESCRIPTION, payload: 'groupDescription'};
        const reducerItem = CreateGroupReducer(INITIAL_STATE, payload);
        expect(reducerItem.groupDescription).toEqual('groupDescription');
    });

    it('test go next page', () => {
        const payload = {type: GO_NEXT_PAGE, payload: {success: true, currentPage: 1 }};
        const reducerItem = CreateGroupReducer(INITIAL_STATE, payload);
        expect(reducerItem.success).toEqual(true);
        expect(reducerItem.currentPage).toEqual(1);
    });

    it('test go previous page', () => {
        const payload = {type: GO_PREVIOUS_PAGE, payload: 0};
        const reducerItem = CreateGroupReducer(INITIAL_STATE, payload);
        expect(reducerItem.currentPage).toEqual(0);
    });
});