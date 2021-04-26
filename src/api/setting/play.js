import request from "@/utils/request";
/**
 * 请求方法
 * @param {Object} option (用于axios config 中的参数如:data,params,...)
 * @param {string} id(用于url中需要的参数，url需要多个参数，方法继续加参数即可)
 */
export function setStorePaymentAdd(option) {
  return request({
    url: "/store-center/manage/store/payment/add",
    method: "post",
    ...option,
  });
}
export function setStorePaymentEdit(option) {
  return request({
    url: "/store-center/manage/store/payment/edit",
    method: "post",
    ...option,
  });
}
export function setStorePaymentEditUpdate(option) {
  return request({
    url: "/store-center/manage/store/payment/editupdate",
    method: "post",
    ...option,
  });
}
export function storeGetpaymentinfo(option) {
  return request({
    url: "/store-center/manage/store/payment/getpaymentinfo",
    method: "post",
    ...option,
  });
}
export function storeGetpaymenttempinfo(option) {
  return request({
    url: "/store-center/manage/store/payment/getpaymenttempinfo",
    method: "post",
    ...option,
  });
}
export function StoreGetPaymentList(option) {
  return request({
    url: "/store-center/manage/store/payment/list",
    method: "post",
    ...option,
  });
}
export function StoreGetPaymentAduit(option) {
  return request({
    url: "/store-center/manage/store/payment/aduit",
    method: "post",
    ...option,
  });
}
export function StoreGetPaymentChangeview(option) {
  return request({
    url: "/store-center/manage/store/payment/changeview",
    method: "post",
    ...option,
  });
}
export function storeBanklist(option) {
  return request({
    url: "/store-center/manage/store/banklist",
    method: "post",
    ...option,
  });
}
