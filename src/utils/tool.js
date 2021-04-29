import { getCurrentUser } from "./auth";
export function jsToFormData(obj) {
  //对象转formdata格式
  let formData = new FormData();
  for (var i in obj) {
    if (isArray(obj[i])) {
      obj[i].map((item) => {
        formData.append(i, item);
      });
      console.log("isArray");
    } else if (obj[i] instanceof FileList) {
      //filelist 文件类型的处理
      console.log("FileList");
      for (var fileItem = 0; fileItem < obj[i].length; fileItem++) {
        formData.append(i, obj[i].item(fileItem));
        console.log("FileList", obj[i].item(fileItem));
      }
    } else {
      if (obj[i]) {
        formData.append(i, isObject(obj[i]) ? JSON.stringify(obj[i]) : obj[i]);
      }
    }
  }
  return formData;
}

export function hasPermission(userPermission) {
  console.log("hasPermission", userPermission);
  let { privage = [] } = getCurrentUser() || {};
  console.log("hasPermission", privage);
  if (!privage.length) {
    return false;
  }
  return privage.some((code) => {
    return code === userPermission;
  });
}

export function isArray(arg) {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
}
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export function isDateIntersection(start1, end1, start2, end2) {
  var startdate1 = new Date(start1.replace("-", "/").replace("-", "/"));
  var enddate1 = new Date(end1.replace("-", "/").replace("-", "/"));

  var startdate2 = new Date(start2.replace("-", "/").replace("-", "/"));
  var enddate2 = new Date(end2.replace("-", "/").replace("-", "/"));

  if (startdate1 >= startdate2 && startdate1 <= enddate2) {
    return true;
  }

  if (enddate1 >= startdate2 && enddate1 <= enddate2) {
    return true;
  }

  if (startdate1 <= startdate2 && enddate1 >= enddate2) {
    return true;
  }
  return false;
}
