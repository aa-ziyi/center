<template>
  <div>
    <page-header title="门店列表"> </page-header>
    <el-tabs v-model="activeName">
      <el-tab-pane label="门店列表" name="first" v-if="permission.first">
        <StoreList />
      </el-tab-pane>
      <el-tab-pane label="门店审核" name="second" v-if="permission.second">
        <StoreAudit />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import StoreList from "./components/StoreList";
import StoreAudit from "./components/StoreAudit";
export default {
  components: {
    StoreList,
    StoreAudit,
  },
  beforeRouteEnter(to, from, next) {
    to.meta.keepAlive = true;
    next();
  },
  data() {
    return {
      activeName: "first",
      permission: [],
    };
  },
  created() {
    this.getFirstActive();
  },
  methods: {
    handleJoinM() {
      this.$router.push({
        name: "MerchantListJoin",
      });
    },
    getFirstActive() {
      let per = {};
      this.activeName = "";
      if (this.$hasPermission("storemange#shopmanage")) {
        this.activeName = "first";
        per.first = 1;
      }
      if (this.$hasPermission("storemange#shopmanage#aduit")) {
        this.activeName = this.activeName || "second";
        per.second = 1;
      }
      this.permission = per;
    },
  },
};
</script>
