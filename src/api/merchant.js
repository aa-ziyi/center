import request from "@/utils/request";
/**
 * 请求方法
 * @param {Object} option (用于axios config 中的参数如:data,params,...)
 * @param {string} id(用于url中需要的参数，url需要多个参数，方法继续加参数即可)
 */
export function getPrestoreinfo(option) {
  return request({
    url: "/store-center/manage/store/prestoreinfo",
    method: "post",
    ...option,
  });
}

export function getStoretype(option) {
  return request({
    url: "/store-center/manage/store/storetype",
    method: "post",
    ...option,
  });
}
