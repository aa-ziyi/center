<template>
  <div>
    <page-header title="商户列表"> </page-header>
    <el-tabs
      v-model="activeName"
      class="details-el-tabs"
      @tab-click="tableClick"
    >
      <el-tab-pane label="商户资料" name="first">
        <MerchantsDetails
          :status="$route.params.childrenStatus"
          :id="$route.params.childrenId"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import MerchantsDetails from "./components/MerchantsDetails";
export default {
  components: {
    MerchantsDetails,
  },
  data() {
    return {
      activeName: "first",
    };
  },
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
