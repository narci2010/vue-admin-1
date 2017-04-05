<template lang="html">
  <div id="login-page" @keyup.enter="login">
    <div class="login-form">
      <div class="input-group">
        <div class="title">后台管理系统</div>
        <el-input
          :autofocus="true"
          placeholder="请输入用户名"
          icon="time"
          v-model="username">
        </el-input>
      </div>
      <div class="input-group">
        <el-input
          placeholder="请输入密码"
          type="password"
          icon="time"
          v-model="password">
        </el-input>
      </div>
      <div class="input-group">
        <label>记住我？</label>
        <el-switch
          v-model="rememberMe"
          on-text=""
          off-text="">
        </el-switch>
      </div>
      <div class="input-group">
        <el-button @click.native="login" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import { requestLogin } from '../../api/api';
import axios from 'axios';
import qs from 'qs';

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
  data() {
    return {
      username: '',
      password: '',
      rememberMe: false,
      isBtnLoading: false
    };
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登录中...';
      return '登录';
    }
  },
  methods: {
    login() {
      if (!this.username) {
        this.$message.error('请填写用户名！！！');
        return;
      }
      if (!this.password) {
        this.$message.error('请填写密码');
        return;
      }
      const loginParams = { loginName: this.username, loginPwd: this.password };
      console.log(qs.stringify(loginParams));
      // Optionally the request above could also be done as
      const url = 'http://localhost:8080/jmore-serve/api/profile/login';
      // axios.post(`${url}?${qs.stringify(loginParams)}`, {})
      axios.post(url, qs.stringify(loginParams))
      .then((response) => {
        console.log(response);
        this.isBtnLoading = false;
      })
      .catch((error) => {
        console.log(error);
      });

      // const loginParams = new URLSearchParams();
      // loginParams.append('loginName', this.username);
      // loginParams.append('loginPwd', this.password);
      this.isBtnLoading = true;
      // requestLogin(loginParams).then((data) => {
      //   console.log(data);
      //   this.isBtnLoading = false;
      //   this.$message.error('哇，这波请求很伤');
        // const { msg, code, user } = data;
        // if (code !== 200) {
        //   this.$message.error(msg);
        // } else {
        //   localStorage.setItem('user', JSON.stringify(user));
        //   if (this.$route.query.redirect) {
        //     this.$router.push({ path: this.$route.query.redirect });
        //   } else {
        //     this.$router.push({ path: '/list' });
        //   }
        // }
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
  #login-page {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #efeeee;

    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 500px;
      height: 400px;
      border-radius: 10px;
      background: white;
      border: 1px #eaeaea solid;
      box-shadow: 0px 0px 25px #cac6c6;

      .title {
        color: #20a0ff;
        font-weight: bold;
        font-size: 40px;
        text-align: center;
        line-height: 2.2;
        font-family: sans-serif;
      }

      .input-group {
        margin-top: 30px;
        width: 80%;
        button {
          width: 100%;
        }
      }
    }
  }
</style>
