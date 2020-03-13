import axios from "axios";

export const getGroupListQuery = async () => {
  const groupList = await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/`
  );
  return groupList;
};
