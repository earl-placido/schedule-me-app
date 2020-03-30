import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';

export const addAvailabilityQuery = async (
  groupMemberId,
  availabilityIds,
  startTimes,
  endTimes,
) => {
  const token = await AsyncStorage.getItem('token');

  const options = {
    url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/availability`,
    method: 'POST',
    data: {
      groupMemberId,
      availabilityIds,
      startTimes,
      endTimes,
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios(options);
    return response.data.ids;
  } catch (err) {
    console.log(err);
  }
};

export const getAvailabilites = async groupMemberId => {
  const token = await AsyncStorage.getItem('token');

  const options = {
    url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/${groupMemberId}/availability`,
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteAvailabilityQuery = async availabilityId => {
  const token = await AsyncStorage.getItem('token');

  const options = {
    url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/availability`,
    method: 'DELETE',
    data: {availabilityIds: [availabilityId]},
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
