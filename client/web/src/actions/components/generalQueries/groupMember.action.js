import axios from 'axios';


export const getMemberIdWithEmail = async(groupId, userEmail) => {
    const userInformation = await axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/users/${userEmail}`);
    const userId = userInformation.data.userId;

    const memberInformation = await axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members/${userId}`);
    const memberId = memberInformation.data.GroupMemberId;
    return memberId;
}

export const getMemberId = async(groupId, userId) => {
    const memberId = await axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members/${userId}`);
    return memberId;
}

