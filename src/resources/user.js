/* eslint-disable */
import Mock from 'mockjs';
const LoginUsers = [{
  username: 'eason',
  password: '123213',
  avatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=261901051&spec=100'
}];

const Users = [];
const userCount = 1000;

for (let i = 0; i < userCount; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    address: Mock.mock('@county(true)'),
    'age|18-60': 1,
    'sex|1': [{
      'name': 'male',
      'value': '男'
    }, {
      'name': 'female',
      'value': '女'
    }],
    // date: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
    date: Number(Mock.Random.date('T')),
    modifydate: Number(new Date().getTime())
  }));
}

export { LoginUsers, Users };
/* eslint-disable */
