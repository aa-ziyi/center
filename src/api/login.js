import request from "@/utils/request";
/**
 * 请求方法
 * @param {Object} option (用于axios config 中的参数如:data,params,...)
 * @param {string} id(用于url中需要的参数，url需要多个参数，方法继续加参数即可)
 */
export function getImageCode(option) {
  return request({
    url: "/image/code",
    method: "get",
    ...option,
  });
}
//3.2短信验证码获取接口(注册获取)
export function getNotSendMsg(option) {
  return request({
    url: "/store-center/note/sendmsg",
    method: "post",
    ...option,
  });
}
//短信验证码获取接口(登录使用)
export function getNotLoginmsg(option) {
  return request({
    url: "/note/loginmsg",
    method: "get",
    ...option,
  });
}
//3.4账号校验
export function mainCheckname(option) {
  return request({
    url: "/store-center/main/checkname",
    method: "post",
    ...option,
  });
}
export function mainRegisty(option) {
  return request({
    url: "/store-center/main/registy",
    method: "post",
    ...option,
  });
}
export function mainResetpwd(option) {
  return request({
    url: "main/resetpwd",
    method: "post",
    ...option,
  });
}

export function mainLogin(option) {
  return request({
    url: "main/login",
    method: "post",
    ...option,
  });
}
