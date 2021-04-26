<template>
  <div>
    <page-header title="我的商户"> </page-header>
    <el-tabs v-model="activeName" class="details-el-tabs">
      <el-tab-pane label="商户资料" name="first">
        <MerchantsDetails :status="3" :id="47" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import MerchantsDetails from "@/views/merchant/list/components/MerchantsDetails";
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
