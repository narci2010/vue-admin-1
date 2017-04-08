import qs from 'qs';
import instance from '../axios/axios-instance';
import * as util from '../utils/util';

export default function (url, pars, options) {
  const encrypt = ('undefined' !== typeof options.encrypt) ? options.encrypt : false; // 默认不加密
  const method = ('undefined' !== typeof options.method) ? options.method : 'GET';
  // 判断参数是否加密
  let tmp = pars;
  if (encrypt) {
    tmp = util.encrypt(pars);
  }
  // 参数对象转querystring
  const params = qs.stringify(tmp, { arrayFormat: 'brackets' });
  return instance.request('/api/profile/login', { params, method })
  .then((response) => { // 请求发送成功
    console.log(response);
    const res = response.data;
    if (res.result === 1) { // 请求处理成功，直接返回数据到下一个then处理
      return res;
    }
    // 请求处理失败，根据错误码做进一步处理
    switch (res.errorcode) {
      case 'INVALID': // 请求不合法，无权限
        // TODO 跳转到登录页面
        throw new Error('请求不合法');
      default:
        throw new Error(res.desc);
    }
  });
}