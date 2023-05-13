import axios from "axios";
import { IMeasureDate, IUserLogin } from "../interfaces/interfaces";
import Cookies from "universal-cookie";

const getApiHost = (): string => "http://10.10.11.128:5000/api-docs";

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
  const result = await sendRequest(
    "post",
    `${getApiHost()}/api/Auth/post_auth_login`,
    {
      ...params,
    }
  );
  return result.data;
};

export const userData = async (params: IMeasureDate) => {
  const cookies = new Cookies();
  const token = cookies.get(`userToken`);

  const result = await sendAuthRequest(
    "get",
    `${getApiHost()}/Counter/get_counter_getCountersByUser`,
    token,
    {
      ...params,
    }
  );
  return result.data;
};
