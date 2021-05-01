<template>
  <div>
    <page-header title="我的商户">
      <el-button
        icon="el-icon-back"
        circle
        size="mini"
        type="primary"
        @click="handleBack"
      ></el-button>
    </page-header>
    <el-tabs v-model="activeName" class="details-el-tabs">
      <el-tab-pane label="商户资料" name="first">
        <MerchantsDetails
          v-if="$route.params.id"
          :id="$route.params.id"
          :status="$route.params.status"
        />
        <el-button type="primary" @click="handleBack"> 返回 </el-button>
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
      user: {},
    };
  },
  methods: {
    handleBack() {
      this.$router.push({
        name: "merchantApplyBySelfIndex",
      });
    },
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
