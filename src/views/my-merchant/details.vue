<template>
  <div>
    <page-header title="我的商户"> </page-header>
    <el-tabs v-model="activeName" class="details-el-tabs">
      <el-tab-pane label="商户资料" name="first">
        <MerchantsDetails v-if="user.storeId" status="3" :id="user.storeId" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getCurrentUser } from "@/utils/auth";
import MerchantsDetails from "@/views/merchant/list/components/MerchantsDetails";
export default {
  components: {
    MerchantsDetails,
  },
  data() {
    return {
      activeName: "first",
      user: {},
    };
  },
  created() {
    this.user = getCurrentUser() || {};
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
