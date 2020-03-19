import axios from "axios";

export const getGroupQuery = async id => {
  const authToken = localStorage.getItem("token");
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${id}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `${authToken}`
      }
    }
  );
  return response;
};

export const getGroupMembersQuery = async groupId => {
  const authToken = localStorage.getItem("token");
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members`,
    {
      headers: {
        accept: "application/json",
        Authorization: `${authToken}`
      }
    }
  );
  return response;
};

export const getGroupListQuery = async ()  => {
  const authToken = localStorage.getItem("token");
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/`,
    {
      headers: {
        accept: "application/json",
        Authorization: `${authToken}`
      }
    }
  );
  return response;
};
