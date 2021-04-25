<template>
  <div>
    <div class="logo">商盟电商中心管理平台</div>
    <el-menu
      class="left-menu"
      :default-active="defaultActive"
      @select="handleSelect"
      background-color="#16A085"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-submenu index="MerchantList">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商户管理</span>
        </template>
        <el-menu-item index="MerchantList">商户列表</el-menu-item>
        <el-menu-item index="MerchantStore">门店列表</el-menu-item>
      </el-submenu>
      <el-submenu index="SettingPlay">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="SettingPlay">支付设置</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultActive: "MerchantList",
    };
  },
  watch: {
    $route(route) {
      console.log("route", route.meta.activeName);
      this.defaultActive = route.meta.activeName || route.name;
    },
  },
  created() {
    this.defaultActive = this.$route.meta.activeName || this.$route.name;
  },
  methods: {
    handleSelect(key) {
      console.log("key");
      this.$router.push({
        name: key,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.logo {
  color: #fff;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
</style>
<style lang="less">
.left-menu.el-menu {
  border: none;
  .el-submenu__title i {
    color: #fff;
  }
  .el-menu-item.is-active {
    background-color: darken(#16a085, 5%) !important;
  }
}
</style>
