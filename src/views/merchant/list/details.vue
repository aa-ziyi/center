<template>
  <div>
    <page-header title="商户列表"> </page-header>
    <el-tabs v-model="activeName" class="details-el-tabs">
      <el-tab-pane label="商户资料" name="first"> <Base /></el-tab-pane>
      <el-tab-pane label="门店管理" name="second"> <Store /></el-tab-pane>
      <el-tab-pane label="账户管理" name="third"><Account /></el-tab-pane>
      <el-tab-pane label="子商户管理" name="fourth">
        <ChildrenStore />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Base from "./components/details/Base";
import Store from "./components/details/Store";
import Account from "./components/details/Account";
import ChildrenStore from "./components/details/ChildrenStore";
export default {
  components: {
    Base,
    Store,
    Account,
    ChildrenStore,
  },
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {},
};
</script>

<style lang="less">
.details-el-tabs {
  .el-tabs__content {
    background-color: transparent;
    padding: 0;
  }
}
</style>
