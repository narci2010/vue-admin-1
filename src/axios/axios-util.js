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
  .then((response) => {
    // 判断status是1还是0，为1则return response的data回去
    // 为0则读取状态码进行处理
    console.log(response);
    // return response.data;
    throw new Error('test');
    // 这里new一个新的promise，使得后续的then对接的是此promise的then?
  })
  .catch((error) => {
    console.log(error);
  });
}