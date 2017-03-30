/* eslint-disable */
import Mock from 'mockjs';
import { Users } from '../resources/user';

let _Users = Users;

export default {
  // 通过filter实现数据查询
  list: params => {
    let { pageNo, pageSize, userName, age, sex, address, startTime, endTime, sortWay } = params;
    let mockUsers = _Users.filter(user => {
      if (startTime && user.date < startTime) return false;
      if (endTime && user.date > endTime) return false;
      if (userName && !user.name.includes(userName)) return false;
      if (age && user.age != age) return false;
      if (sex && user.sex.name !== sex) return false;
      if (address && !user.address.includes(address)) return false;
      return true;
    });
    if (sortWay) {
      let {order, prop} = sortWay;
      mockUsers = mockUsers.sort((u1, u2) => order === 'ascending' ? u1[prop] - u2[prop] : u2[prop] - u1[prop]);
    }
    
    // 数据总数
    const totalElements = mockUsers.length;
    // 后端传到前端当前页码数少1，减1对后台进行模拟
    const number = pageNo - 1;
    // 每页条数
    const size = pageSize;
    // 总页数
    const totalPages = Math.ceil(totalElements / size);
    if (pageNo <= 0) pageNo = 1;
    // 过滤出当前页数据
    mockUsers = mockUsers.filter((u, index) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1));
    const content = mockUsers;
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, {
          actionid: '',
          result: 1,
          errorcode: '',
          desc: '操作成功！',
          obj: {
            content,
            number,
            size,
            totalPages,
            totalElements,
          },
        } ]);
      }, 500);
    });
  },
  add: config => {
    let { name, address, age, date } = JSON.parse(config.data);
    _Users.push({
      id: Mock.Random.guid(),
      name,
      address,
      age,
      date: new Date(date).getTime(),
      modifydate: new Date().getTime()
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, {
          code: 200,
          msg: '添加成功'
        }]);
      });
    });
  },
  remove: config => {
    let { id } = JSON.parse(config.data);
    _Users = _Users.filter(u => u.id !== id);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, {
          code: 200,
          msg: '删除成功'
        }]);
      });
    });
  },
  edit: config => {
    let { id, name, address, age, date } = JSON.parse(config.data);
    _Users.some(u => {
      if (u.id === id) {
        u.name = name || u.name;
        u.address = address || u.address;
        u.age = age || u.age;
        u.date = date ? new Date(date).getTime() : u.date;
        u.modifydate = new Date().getTime();
        return true;
      }
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, {
          code: 200,
          msg: '编辑成功'
        }]);
      });
    });
  }
};
/* eslint-disable */