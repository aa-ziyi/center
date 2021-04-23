<template>
  <div>
    <page-header title="商户列表">
      <el-link type="primary" @click="handleJoinM">添加线上商户</el-link>
      <el-link type="primary" class="ml20">添加虚拟商户</el-link>
    </page-header>
    <el-tabs v-model="activeName">
      <el-tab-pane label="已入驻" name="settled">
        <SettledMerchants />
      </el-tab-pane>
      <el-tab-pane label="未入驻" name="unsettled">
        <FirstStepAudit />
      </el-tab-pane>
      <el-tab-pane label="商户初审 " name="second">
        <SecondStepAudit />
      </el-tab-pane>
      <el-tab-pane label="商户终审" name="third">
        <ThirdStepAudit />
      </el-tab-pane>
      <el-tab-pane label="协议签订" name="fifth">
        <FifthStepAudit />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SettledMerchants from "./components/SettledMerchants";
import FirstStepAudit from "./components/FirstStepAudit";
import SecondStepAudit from "./components/SecondStepAudit";
import ThirdStepAudit from "./components/ThirdStepAudit";
import FifthStepAudit from "./components/FifthStepAudit";
export default {
  components: {
    SettledMerchants,
    FirstStepAudit,
    SecondStepAudit,
    ThirdStepAudit,
    FifthStepAudit,
  },
  data() {
    return {
      activeName: "settled",
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
