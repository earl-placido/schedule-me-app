import axios from 'axios';
import Config from 'react-native-config';

export const setCurrentOptimalTimeQuery = async (
  meetingId,
  startTime,
  endTime,
) => {
  const optimalTime = {
    startTime,
    endTime,
  };
  const options = {
    url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/meetings/${meetingId}/optimaltime/`,
    method: 'POST',
    data: optimalTime,
    headers: {
      accept: 'application/json',
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const formatDateToString = (startTime, endTime, lastUpdatedTime) => {
  //starttime and endtime is in moment format
  const day = startTime.format('YYYY-MM-DD (dddd)');
  const startTimeString = startTime.format('HH:mm');
  const endTimeString = endTime.format('HH:mm');
  const lastUpdatedTimeString = lastUpdatedTime.format('YYYY-MM-DD HH:mm');
  const meetingAvailableString = `Date: ${day} ${'\nTime: '}${startTimeString} - ${endTimeString}\nLast Updated: ${lastUpdatedTimeString}`;
  return meetingAvailableString;
};

export const getMeetingIdsQuery = async groupId => {
  const options = {
    url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/meetings`,
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  try {
    const response = await axios(options);
    return response.data.meetingIds;
  } catch (err) {
    console.log(err);
  }
};

export const getMeetingCurrentOptimalTimeQuery = async meetingIds => {
  const stringMeetingIds = meetingIds.toString();
  const options = {
    url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/meetings/${stringMeetingIds}/optimaltime/`,
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getOptimalTimes = async groupId => {
  const options = {
    url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/optimaltime/`,
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  try {
    const response = await axios(options);
    return response.data.optimalTime;
  } catch (err) {
    console.log(err);
  }
};
