/* eslint-disable */ 
import { hex_hmac_sha256 } from './HmacSHA256Utils.js';

export {
  encrypt,
  getState,
  setState,
  createState
};
/**
 * 格式化时间
 */
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
``
/**
 * jquery2.extend
 * 实现对对象的复制
 */
function extend() {
  var options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  if (typeof target === "boolean") {
    deep = target;

    target = arguments[i] || {};
    i++;
  }

  if (typeof target !== "object" && !$.isFunction(target)) {
    target = {};
  }

  if (i === length) {
    target = this;
    i--;
  }

  for (; i < length; i++) {
    if ((options = arguments[i]) != null) {
      for (name in options) {
        src = target[name];
        copy = options[name];

        if (target === copy) {
          continue;
        }

        if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && $.isArray(src) ? src : [];

          } else {
            clone = src && $.isPlainObject(src) ? src : {};
          }

          target[name] = $.extend(deep, clone, copy);

        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  return target;
};

/**
 * 参数加密
 */
function encrypt(params) {
  // clone对象避免更改params
  var tmp = {};
  extend(tmp, params || {});
  var state = getState();
  var token = state.token;
  var secret = state.secret;
  var sequence = getTimeStamp().toString();
  var key = secret + '-' + sequence;
  // 将token,secret,sequence设置到参数中
  tmp.sequence = sequence;
  tmp.token = token;
  // 生成摘要设置到参数中
  tmp.digest = digest(key, tmp);
  return tmp;
}

/**
 * 根据密钥和参数对象生成摘要
 */
function digest(encryptKey, params) {
  // 参数按照key排序
  var sortedkeys = Object.keys(params).sort();
  // 根据key拼接value
  var content = '';
  for (var i = 0; i < sortedkeys.length; i++) {
    var key = sortedkeys[i];
    content += params[key];
  }

  // 生成摘要并返回
  return hex_hmac_sha256(encryptKey, content);
};

/**
 * 获取当前用户状态
 */
function getState() {
  var stateText = sessionStorage.getItem('$state') || '{}';
  return JSON.parse(stateText);
};

/**
 * 设置当前用户状态
 */
function setState(state) {
  state = state || {};
  sessionStorage.setItem('$state', JSON.stringify(state));
};

/**
 * 新建当前用户状态
 */
function createState(token, secret, userId, mobile) {
  var state = getState();
  state.token = token;
  state.secret = secret;
  state.userId = userId;
  state.mobile = mobile;
  setState(state);
}

/**
 * 获取时间戳
 */
function getTimeStamp() {
  return new Date().getTime();
}
/* eslint-disable */ 