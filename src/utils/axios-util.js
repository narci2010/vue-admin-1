/* eslint-disable */ 
import axios from 'axios';
import qs from 'qs';
import { hex_hmac_sha256 } from './HmacSHA256Utils.js';

const CancelToken = axios.CancelToken;

// export default axios.create({
//   baseURL: 'http://127.0.0.1:8080/jmore-serve'
// });

export default axios.create({

  // `method` is the request method to be used when making the request
  method: 'get', // default

  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  baseURL: 'http://localhost:8080/jmore-serve',

  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // The last function in the array must return a string, an ArrayBuffer, FormData, or a Stream
  transformRequest: [function (data) {
    // Do whatever you want to transform the data
    console.log('[transformRequest]');
    console.log(data);
    return data;
  }],

  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    console.log('[transformResponse]');
    return data;
  }],

  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {},

  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    // console.log('[paramsSerializer]');
    // console.log(params);
    // // TODO 这里做params的加密
    // // 1.引入
    // // HmacSHA256Utils.hex_hmac_sha256(params)
    // // 根据this中的参数来判断是否执行encrypt方法
    // console.log(this);
    const encrypted = encrypt(params);
    console.log(encrypted);
    return qs.stringify(params, {arrayFormat: 'brackets'});
  },

  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream
  data: {},

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 5000,

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default

  // // `adapter` allows custom handling of requests which makes testing easier.
  // // Return a promise and supply a valid response (see lib/adapters/README.md).
  // adapter: function (config) {
  //   /* ... */
  // },

  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // This will set an `Authorization` header, overwriting any existing
  // `Authorization` custom headers you have set using `headers`.
  // Request header field Authorization is not allowed by Access-Control-Allow-Headers in preflight response.
  // auth: {
  //   // username: 'janedoe',
  //   // password: 's00pers3cret'
  // },

  // `responseType` indicates the type of data that the server will respond with
  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `onUploadProgress` allows handling of progress events for uploads
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` allows handling of progress events for downloads
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `maxContentLength` defines the max size of the http response content allowed
  maxContentLength: 2000,

  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  maxRedirects: 5, // default

  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // and https requests, respectively, in node.js. This allows to configure options like
  // `keepAlive` that are not enabled by default.
  // httpAgent: new http.Agent({ keepAlive: true }),
  // httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' defines the hostname and port of the proxy server
  // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and supplies credentials.
  // This will set an `Proxy-Authorization` header, overwriting any existing `Proxy-Authorization` custom headers you have set using `headers`.
  proxy: {
    // host: '127.0.0.1',
    // port: 9000,
    // auth: {
    //   username: 'mikeymike',
    //   password: 'rapunz3l'
    // }
  },

  // `cancelToken` specifies a cancel token that can be used to cancel the request
  // (see Cancellation section below for details)
  cancelToken: new CancelToken(function (cancel) {
  })
});

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
  // var stateText = wx.getStorageSync('$state') || "{}";
  var stateText = sessionStorage.getItem('$state') || '{}'; 
  return JSON.parse(stateText);
};

/**
 * 设置当前用户状态
 */
function setState(state) {
  state = state || {};
  sessionStorage.setItem('$state', JSON.stringify(state));
  // wx.setStorageSync('$state', JSON.stringify(state));
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
