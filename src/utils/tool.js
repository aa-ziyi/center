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
function isArray(arg) {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
