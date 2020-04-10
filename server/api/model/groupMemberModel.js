module.exports = mysql => {
  const groupMemberModel = {};

  groupMemberModel.getGroupMemberId = (groupId, userId) => {
    return mysql
      .query(
        `
                SELECT GroupMemberId, MemberRole FROM \`GroupMember\` WHERE GroupId = ? AND UserId = ?;
                `,
        [groupId, userId]
      )
      .then(res => {
        if (res.errno) {
          return { error: res.sqlMessage };
        } else {
          return res;
        }
      });
  };

  return groupMemberModel;
};
