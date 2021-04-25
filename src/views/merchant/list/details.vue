<template>
  <div v-loading="!baseData.id">
    <page-header title="商户列表">
      <el-button
        icon="el-icon-back"
        circle
        size="mini"
        type="primary"
        @click="handleBack"
      ></el-button>
    </page-header>
    <el-tabs
      v-model="activeName"
      class="details-el-tabs"
      @tab-click="tableClick"
    >
      <el-tab-pane label="商户资料" name="first">
        <MerchantsDetails
          :status="$route.params.status"
          @change="onDataChange"
        />
      </el-tab-pane>
      <el-tab-pane label="门店管理" name="second" v-if="showOp">
        <Store />
      </el-tab-pane>
      <el-tab-pane label="账户管理" name="third" v-if="showOp">
        <Account />
      </el-tab-pane>
      <el-tab-pane
        label="子商户管理"
        name="fourth"
        v-if="showOp && baseData && String(baseData.isPstore) == '1'"
      >
        <ChildrenStore />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Store from "./components/details/Store";
import Account from "./components/details/Account";
import ChildrenStore from "./components/details/ChildrenStore";
import MerchantsDetails from "./components/MerchantsDetails";
export default {
  components: {
    MerchantsDetails,
    Store,
    Account,
    ChildrenStore,
  },
  data() {
    return {
      activeName: "first",
      baseData: {},
      currentTabs: ["first", "second", "third", "fourth"],
      showOp: false,
    };
  },
  created() {
    let { activeName } = this.$route.query;
    this.activeName =
      activeName && this.currentTabs.indexOf(activeName) > -1
        ? activeName
        : "first";
    this.showOp = String(this.$route.params.status) == "3";
  },
  methods: {
    tableClick() {
      // 避免刷新没有到第一个tab
      let { activeName } = this.$route.query;
      if (activeName && this.currentTabs.indexOf(activeName) > -1) {
        this.$router.push({
          name: this.$route.name,
          params: this.$route.params,
        });
      }
    },
    onDataChange(data) {
      this.baseData = data;
    },
    handleBack() {
      this.$router.push({
        name: "MerchantList",
        query: {
          activeName: this.$route.query.activeName,
        },
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
