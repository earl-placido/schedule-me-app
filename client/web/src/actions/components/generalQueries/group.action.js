import axios from "axios";

export const getGroupQuery = async id => {
  const authToken = localStorage.getItem("token");
  const group = await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${id}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `${authToken}`
      }
    }
  );
  return group;
};
