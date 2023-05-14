import axios from "axios";
import { IHomeAlone, IMeasureDate, IUserLogin } from "../interfaces/interfaces";
import Cookies from "universal-cookie";

const getApiHost = (): string => "http://10.10.11.128:5000/";

const sendRequest = (
  method: "get" | "post" | "patch" | "delete",
  url: string,
  data?: any
) =>
  axios({
    method,
    url: url,
    ...(data && { data }),
  });

const sendAuthRequest = (
  method: "get" | "post" | "patch" | "delete",
  url: string,
  token: string,
  data?: any
) =>
  axios({
    method,
    url: url,
    ...(data && { data }),
    headers: {
      Authorization: token,
    },
  });

export const login = async (params: IUserLogin) => {
  console.log("Login");
  const result = await sendRequest("post", `${getApiHost()}auth/login`, {
    ...params,
  });
  return result.data;
};

export const userData = async () => {
  const cookies = new Cookies();
  const token = cookies.get("userToken");

  const result = await sendAuthRequest(
    "get",
    `${getApiHost()}data/getCountersByUser`,
    `Bearer ${token}`
  );
  return result.data;
};

export const adminData = async () => {
  const cookies = new Cookies();
  const token = cookies.get("userToken");

  const result = await sendAuthRequest(
    "get",
    `${getApiHost()}data/getCounters`,
    `Bearer ${token}`
  );
  return result.data;
};

export const leftHome = async (params: IHomeAlone) => {
  const cookies = new Cookies();
  const token = cookies.get("userToken");

  const result = await sendAuthRequest(
    "post",
    `${getApiHost()}data/homeAlone`,
    `Bearer ${token}`,
    { ...params }
  );
  return result.data;
};
