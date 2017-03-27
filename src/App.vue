<template>
  <section class="db">
    <template v-if="!$route.meta.hidden">
      <!-- header start  -->
      <header class="db-header">
        <router-link class="logo" :to="{path: '/list/filters'}">后台管理系统</router-link>
        <div class="user-info">
          <span v-text="user.name"></span>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <img :src="user.avatar">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </header>
      <!-- header end  -->

      <!-- body start  -->
      <div class="db-body">
        <aside class="db-menu-wrapper">
          <el-menu :default-active="activeMenu" class="db-menu-bar" router>
            <el-menu-item index="/list">
              <i class="el-icon-document"></i>管理
            </el-menu-item>
            <el-menu-item index="/form">
              <i class="el-icon-document"></i>表单
            </el-menu-item>
            <el-menu-item index="/chart">
              <i class="el-icon-picture"></i>图表
            </el-menu-item>
            <el-submenu>
              <template slot="title"><i class="el-icon-setting"></i>用户管理</template>
              <el-menu-item index="/manage/detail">详情</el-menu-item>
              <el-menu-item index="/manage/list">列表</el-menu-item>
            </el-submenu>
          </el-menu>
        </aside>

        <!-- content start -->
        <div class="db-content-wrapper">
          <section class="db-content">
            <router-view></router-view>
          </section>
        </div>
        <!-- content end -->
      </div>
      <!-- body end  -->
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </section>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      user: {
        name: '张大圣',
        avatar: require('./assets/avatar.jpg')
      },
      activeMenu: ''
    };
  }
};
</script>

<style lang="scss">
@import './styles/_variables.scss';

.db {
  // header
  .db-header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 60px;
    z-index: 99;
    padding: 13px 20px;
    box-sizing: border-box;
    background: #20A0FF;
    color: #ffffff;
    .logo{
      font-size: 2.4rem;
    }
    .user-info {
      float: right;
      img {
        vertical-align: -7px;
        margin: 0 0 0 10px;
        width: 25px;
        height: 25px;
        cursor: pointer;
        border-radius: 50%;
      }
    }
  }

  // body
  .db-body {
    // menu
    .db-menu-wrapper {
      position: fixed;
      left: 0;
      top: 60px;
      height: 100%;
      overflow: auto;
      z-index: 98;
      background: red;
      .db-menu-bar {
        flex-grow: 0;
        width: 200px;
        height: 100%;
        border-radius: 0;
      }
    }

    // content
    .db-content-wrapper {
      padding: 60px 0px 0px 200px;
      width: 100%;
      z-index: 97;
      box-sizing: border-box;
      .db-content {
        padding: 25px;
        .db-content-inner {
          padding: 30px 0px;
        }
      }
    }
  }
}
</style>

