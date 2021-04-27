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
      <el-menu-item
        index="merchantApplyBySelf"
        v-if="$hasPermission('merchantsenter#opreate#addbyself')"
      >
        申请入驻
      </el-menu-item>
      <!-- 角色判断 -->
      <el-menu-item index="myMerchantDetiles">我的商户</el-menu-item>
      <el-submenu index="MerchantList" v-if="$hasPermission('storemange')">
        <template slot="title">
          <span>商户管理</span>
        </template>
        <el-menu-item
          index="MerchantList"
          v-if="$hasPermission('storemange#list')"
          >商户列表</el-menu-item
        >
        <el-menu-item
          index="MerchantStore"
          v-if="$hasPermission('storemange#shopmanage')"
          >门店列表</el-menu-item
        >
      </el-submenu>
      <el-submenu index="SettingPlay" v-if="$hasPermission('sysmanage')">
        <template slot="title">
          <span>系统管理</span>
        </template>
        <el-menu-item
          index="SettingPlay"
          v-if="$hasPermission('sysmanage#paymentset')"
        >
          支付设置
        </el-menu-item>
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
