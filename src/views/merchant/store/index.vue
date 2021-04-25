<template>
  <div>
    <page-header title="门店列表"> </page-header>
    <el-tabs v-model="activeName">
      <el-tab-pane label="门店列表" name="first">
        <StoreList />
      </el-tab-pane>
      <el-tab-pane label="门店审核" name="second">
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
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleJoinM() {
      this.$router.push({
        name: "MerchantListJoin",
      });
    },
  },
};
</script>
