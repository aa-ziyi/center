import axios from "axios";
import { Message } from "element-ui";
import { getToken, removeToken, removeCurrentUser } from "@/utils/auth";
import router from "@/router";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    console.log("config", config);
    const token = getToken();
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    console.log("response", response);
    let data = response.data;
    let { ret, msg } = data;
    if (ret == "401" || ret == 401) {
      removeToken();
      removeCurrentUser();
      router.push({
        name: "login",
      });
      return Promise.reject(msg || "Error");
    }
    if (ret == "0" || ret == 0) {
      return data;
    }
    Message.error(msg || "服务器异常");
    return Promise.reject(msg || "Error");
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default service;
