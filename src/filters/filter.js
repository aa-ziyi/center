/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  return time + label;
}
/**
 * @param {number} formatTime
 */
function get_unix_time(dateStr) {
  if (dateStr) {
    let newstr = dateStr.replace(/-/g, "/");
    let date = new Date(newstr);
    let time_str = date.getTime().toString();
    return time_str.substr(0, 10);
  }
}

export function statusString(number) {
  // 2待终审3终审通过4初审驳回5复核通过6终审驳回 8.待签约 9.签约驳回10清退中
  let obj = {
    ["1"]: "待初审",
    ["2"]: "待终审",
    ["3"]: "终审通过",
    ["4"]: "初审驳回",
    ["5"]: "复核通过",
    ["6"]: "终审驳回",
    ["7"]: "--",
    ["8"]: "待签约",
    ["9"]: "签约驳回",
    ["10"]: "清退中",
  };
  return obj[String(number)];
}

export function dateFormatter(date) {
  if (date && date.length == 8) {
    return `${date.substr(0, 3)}-${date.substr(4, 5)}-${date.substr(6, 7)}`;
  } else if (date && date.length == 12) {
    return `${date.substr(0, 3)}-${date.substr(4, 5)}-${date.substr(
      6,
      7
    )} ${date.substr(6, 7)}:${date.substr(8, 9)}:${date.substr(10, 11)}`;
  }
  return date;
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(get_unix_time(time));
  if (between < 10) {
    return "刚刚";
  } else if (between < 60) {
    return pluralize(~~(between / 1), " 秒前");
  } else if (between < 3600) {
    return pluralize(~~(between / 60), " 分钟前");
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), " 小时前");
  } else if (between < 2626560) {
    return pluralize(~~(between / 86400), " 天前");
  } else {
    return time;
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1e18, symbol: "E" },
    { value: 1e15, symbol: "P" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "G" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" },
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].symbol
      );
    }
  }
  return num.toString();
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function stringFromCharCode(num) {
  return String.fromCharCode(num + 64);
}

export function transTimeSeconds(time) {
  if (time < 60) {
    return time + "秒";
  }
  if (time >= 60 && time < 3600) {
    return parseInt(time / 60) + "分" + (time % 60) + "秒";
  }
  if (time >= 3600) {
    return (
      parseInt(time / 3600) +
      "时" +
      parseInt((time % 3600) / 60) +
      "分" +
      ((time % 3600) % 60) +
      "秒"
    );
  }
}
