import axios from "axios";

export const getMemberIdWithEmail = async (groupId, userEmail) => {
  const userInformation = await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/users/email/${userEmail}`,
    {
      headers: {
        authorization: `Basic ${localStorage.getItem("token")}`
      }
    }
  );
  const userId = userInformation.data.userId;
  const memberInformation = await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members/${userId}`
  );
  console.log(memberInformation);
  const memberId = memberInformation.data.groupMembers[0].GroupMemberId;
  return memberId;
};

export const getMemberId = async (groupId, userId) => {
  const memberId = await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members/${userId}`
  );
  return memberId;
};
