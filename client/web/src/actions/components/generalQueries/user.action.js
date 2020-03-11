import axios from "axios";

export const getUserByEmail = async userEmail => {
  const userInfo = await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/users/${userEmail}`
  );
  const userId = userInfo.data.userId;
  return { userId };
};
