/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === "string" || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
}

export function validateEmail(rule, value, callback) {
  if (value && validEmail(value)) {
    callback();
  } else {
    callback(new Error(rule.message || "请输入正确的邮箱"));
  }
}

export function validatePositiveInteger(rule, value, callback) {
  console.log(rule, "rule");
  const positiveInteger = /^[0-9]*$/;
  if (value && !positiveInteger.test(value)) {
    callback(new Error(rule.message || "请填写大于等于0的正整数"));
  } else {
    callback();
  }
}
export function validateSingleBit(rule, value, callback) {
  console.log(rule, 89898);
  const singleBit = /^[0-9]+([.][0-9]{1}){0,1}$/;
  if (value && !singleBit.test(value)) {
    callback(new Error(rule.message || "请输入数字，允许一位小数点"));
  } else {
    callback();
  }
}
export function validateCode(rule, value, callback) {
  const codeReg = /^[a-zA-Z0-9]*$/;
  if (value && !codeReg.test(value)) {
    callback(new Error(rule.message || "编码只能由数字/英文组成"));
  } else {
    callback();
  }
}

export function validateLength(rule, value, callback) {
  let length = rule.length || 20;
  if (value && value.length > length) {
    callback(new Error(rule.message || "请输入20个字"));
  } else {
    callback();
  }
}

export function validateAcquaintance(rule, value, callback) {
  if (value < 0 || value > 10000) {
    callback(new Error("请输入0～10000范围内的数字"));
  } else {
    callback();
  }
}

export function phoneNumber(rule, value, callback) {
  if (
    value &&
    (!/^[1][345789]\d{9}$/.test(value) ||
      !/^[1-9]\d*$/.test(value) ||
      value.length !== 11)
  ) {
    callback(new Error("手机号码不符合规范"));
  } else {
    callback();
  }
}

export function validateIP(rule, value, callback) {
  if (
    value &&
    !/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/.test(
      value
    )
  ) {
    callback(new Error("IP不对，请输入正确的IP格式"));
  } else {
    callback();
  }
}

export function validatePassword(rule, value, callback) {
  const codeReg = /^[a-zA-Z0-9~!@#$%^&*()_+`\-={}:";'<>?,.\/]{6,16}$/;
  if (value && !codeReg.test(value)) {
    callback(
      new Error("请输入6-16位密码，可包含数字、英文、特殊符号，不能包含中文")
    );
  } else {
    callback();
  }
}
