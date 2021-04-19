import axios from "axios";
import { Message } from "element-ui";
import { removeCurrentUser, getToken } from "@/utils/auth";
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
    const token = getToken();
    if (token) {
      config.headers["x-auth-token"] = token;
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
    if (response.status == "200") {
      return data;
    }
    if (data.status == "401" || data.status == 401) {
      removeCurrentUser();
      router.push({
        name: "login",
      });
      return;
    }
    if (data.status == "401.1" || data.status == 401.1) {
      removeCurrentUser();
      Message.error(data.message);
      return Promise.reject(data.message || "Error");
    }
    if (data.status == "406" || data.status == 406) {
      if (data.body.length && data.message == "") {
        data.message = data.body[0].defaultMessage;
      }
    }
    Message.error(data.message);
    return Promise.reject(data.message || "Error");
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
