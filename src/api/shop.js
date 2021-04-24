import request from "@/utils/request";
/**
 * 请求方法
 * @param {Object} option (用于axios config 中的参数如:data,params,...)
 * @param {string} id(用于url中需要的参数，url需要多个参数，方法继续加参数即可)
 */

export function shopManageAdd(option) {
  return request({
    url: "/store-center/shop/manage/add",
    method: "post",
    ...option,
  });
}
export function shopManageEdit(option) {
  return request({
    url: "/store-center/shop/manage/edit",
    method: "post",
    ...option,
  });
}
export function shopManageChangeview(option) {
  return request({
    url: "/store-center/shop/manage/changeview",
    method: "post",
    ...option,
  });
}
export function shopManageAduit(option) {
  return request({
    url: "/store-center/shop/manage/aduit",
    method: "post",
    ...option,
  });
}
export function shopManageList(option) {
  return request({
    url: "/store-center/shop/manage/list",
    method: "post",
    ...option,
  });
}
export function shopManageView(option) {
  return request({
    url: "/store-center/shop/manage/view",
    method: "post",
    ...option,
  });
}
