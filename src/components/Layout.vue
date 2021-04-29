<template>
  <el-container>
    <el-aside style="width: 200px">
      <LeftMenu />
    </el-aside>
    <el-container>
      <el-header>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="route in currentMatched"
            :key="route.name"
            :to="{
              name: route.name,
            }"
          >
            {{ route.meta && route.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="header-right">
          {{ $route.meta && $route.meta.keepAlive }}
          欢迎您， {{ user.userName }}！
          <a class="login-out" @click="loginOut">退出登陆</a>
        </div>
      </el-header>
      <el-main class="main">
        <keep-alive>
          <router-view v-if="$route.meta && $route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LeftMenu from "@/components/LeftMenu";
import { getCurrentUser, removeToken, removeCurrentUser } from "@/utils/auth";
export default {
  components: {
    LeftMenu,
  },
  data() {
    return {
      currentMatched: [],
      user: {},
    };
  },
  watch: {
    $route(newRoute) {
      let matched = newRoute.matched;
      this.initMatched(matched);
    },
  },
  created() {
    let matched = this.$route.matched;
    this.initMatched(matched);
    this.user = getCurrentUser() || {};
  },
  methods: {
    initMatched(matched) {
      this.currentMatched = matched.filter((route) => {
        return route.meta && !route.meta.hiddenBreadcrumb;
      });
    },
    loginOut() {
      removeToken();
      removeCurrentUser();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less">
.el-header {
  color: #333;
  line-height: 50px;
  height: 50px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  left: 200px;
  right: 0;
  top: 0;
  z-index: 10;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-right {
    color: #7e8fa0;
    text-align: right;
    .login-out {
      padding-left: 5px;
      margin-left: 20px;
      cursor: pointer;
    }
  }
}
.el-aside {
  color: #333;
  height: 100vh;
  background-color: #16a085;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 10;
}
.el-main.main {
  background-color: #f4f4f4;
  min-height: 100vh;
  padding: 0;
  margin-top: 45px + 40px + 40px;
  padding-top: 25px;
  .el-tabs__header {
    background-color: #fff;
    padding: 0 20px;
    &.is-top {
      position: fixed;
      left: 200px;
      top: 45px + 40px;
      right: 0;
      z-index: 10;
      box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.1);
    }
  }
  .el-tabs__content {
    margin: 0 25px;
    background-color: #fff;
    padding: 20px;
    .el-card {
      box-shadow: none;
      border-radius: 0;
    }
    .el-form--inline {
      margin-bottom: 20px;
    }
  }
}
.el-container.is-vertical {
  margin-left: 200px;
  overflow: hidden;
}
</style>
