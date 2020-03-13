import axios from "axios";

export const getGroupListQuery = async () => {
  const authToken = localStorage.getItem("token");
  const groupList = await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/`,
    {
      headers: {
        accept: "application/json",
        Authorization: `${authToken}`
      }
    }
  );
  return groupList;
};
