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

export function storetAdd(option) {
  return request({
    url: "/store-center/manage/store/add",
    method: "post",
    ...option,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function storetEditUpdate(option) {
  return request({
    url: "/store-center/manage/store/editupdate",
    method: "post",
    ...option,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function storetEdit(option) {
  return request({
    url: "/store-center/manage/store/edit",
    method: "post",
    ...option,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function storetFilesign(option) {
  return request({
    url: "/store-center/manage/store/filesign",
    method: "post",
    ...option,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function storetAddbyself(option) {
  return request({
    url: "/store-center/manage/store/addbyself",
    method: "post",
    ...option,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function getStoretList(option) {
  return request({
    url: "/store-center/manage/store/list",
    method: "post",
    ...option,
  });
}

// 3.22商户修改(终审后的修改)
export function getStoretEditUpdate(option) {
  return request({
    url: "/store-center/manage/store/list",
    method: "post",
    ...option,
  });
}

export function getStoreEdit(option) {
  return request({
    url: "/store-center/manage/store/edit",
    method: "post",
    ...option,
  });
}
//终审后的查询
export function storeGetstoreinfo(option) {
  return request({
    url: "/store-center/manage/store/getstoreinfo",
    method: "post",
    ...option,
  });
}
//除审后的查询
export function storeGetStoreTempInfo(option) {
  return request({
    url: "/store-center/manage/store/getstoretempinfo",
    method: "post",
    ...option,
  });
}

export function storeAduit(option) {
  return request({
    url: "/store-center/manage/store/aduit",
    method: "post",
    ...option,
  });
}

export function storeChangeView(option) {
  return request({
    url: "/store-center/manage/store/changeview",
    method: "post",
    ...option,
  });
}

export function storeAccountAdd(option) {
  return request({
    url: "/store-center/acount/add",
    method: "post",
    ...option,
  });
}
export function storeAcountListacount(option) {
  return request({
    url: "/store-center/acount/listacount",
    method: "post",
    ...option,
  });
}

export function storeAcountView(option) {
  return request({
    url: "/store-center/acount/view",
    method: "post",
    ...option,
  });
}

export function storeAcountEdit(option) {
  return request({
    url: "/store-center/acount/edit",
    method: "post",
    ...option,
  });
}
export function storeAcountStopacount(option) {
  return request({
    url: "/store-center/acount/stopacount",
    method: "post",
    ...option,
  });
}

export function manageStoreSuresgin(option) {
  return request({
    url: "/store-center/manage/store/suresgin",
    method: "post",
    ...option,
  });
}
