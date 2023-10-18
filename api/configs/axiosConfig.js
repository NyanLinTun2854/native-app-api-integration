import axios from "axios";
import { getAuthToken, getUserName } from "../../utils/asyncStorage";
import { useSelector } from "react-redux";

const authSetup = async () => {
  // const state = useSelector((state) => state.user);
  const userToken = await getAuthToken();
  const userName = await getUserName();
  // const userToken = state.usertoken;
  // const userName = state.username;
  console.log(userToken, userName, "storage when call api");
  axios.interceptors.request.use((config) => {
    config.headers = {
      Authorization: `Bearer ${userToken}`,
      Username: `${userName}`,
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": "true",
      // 'Cache-Control': 'no-cache'
    };
    console.log(config, "oasoasoasoas");
    return config;
  });
};

export const fetcher = async (value) => {
  let result;

  await authSetup();

  // calling api
  // await axios
  //   .get(value)
  //   .then(async (response) => {
  //     result = response;
  //   })
  //   .catch(async (error) => {
  //     return Promise.reject(error);
  //   });
  try {
    const res = await axios.get(value);
    result = res;
  } catch (error) {
    return Promise.reject(error);
  }
  return result;
};

export const postFetcher = async (value, requestData) => {
  let result;

  await authSetup();

  // calling api

  try {
    const res = await axios.post(value, requestData);
    result = res;
  } catch (error) {
    return Promise.reject(error);
  }
  return result;
};

export const deleteFetcher = async (value) => {
  let result;

  await authSetup();

  // calling api

  try {
    const res = await axios.delete(value);
    result = res;
  } catch (error) {
    return Promise.reject(error);
  }

  return result;
};

export const putFetcher = async (value, requestData) => {
  let result;

  await authSetup();

  // calling api

  try {
    const res = await axios.put(value, requestData);
    result = res;
  } catch (err) {
    return Promise.reject(err);
  }

  return result;
};
