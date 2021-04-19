<template>
  <div>
    <page-header title="商户入驻"></page-header>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="base">
        <Base @next="baseNext" />
      </el-tab-pane>
      <el-tab-pane label="业务信息" name="business">
        <Business />
      </el-tab-pane>
      <el-tab-pane label="结算信息" name="settlement">
        <Settlement />
      </el-tab-pane>
      <el-tab-pane label="费率" name="exchangeRate">
        <ExchangeRate />
      </el-tab-pane>
      <el-tab-pane label="协议信息" name="agreement">
        <Agreement />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Base from "./components/join/Base";
import Business from "./components/join/Business";
import Settlement from "./components/join/Settlement";
import ExchangeRate from "./components/join/ExchangeRate";
import Agreement from "./components/join/Agreement";
export default {
  components: {
    Base,
    Business,
    Settlement,
    ExchangeRate,
    Agreement,
  },
  data() {
    return {
      activeName: "base",
    };
  },
  methods: {
    baseNext() {
      this.activeName = "business";
    },
  },
};
</script>
