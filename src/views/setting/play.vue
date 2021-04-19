<template>
  <div>
    <page-header title="支付设置">
      <el-link type="primary" @click="handleJoinM">添加支付方式</el-link>
    </page-header>
    <el-tabs v-model="activeName">
      <el-tab-pane label="支付列表" name="first">
        <List />
      </el-tab-pane>
      <el-tab-pane label="支付初审" name="second">
        <FirstStepAudit />
      </el-tab-pane>
      <el-tab-pane label="支付终审" name="third">
        <SecondStepAudit />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import List from "./components/List";
import FirstStepAudit from "./components/FirstStepAudit";
import SecondStepAudit from "./components/SecondStepAudit";
export default {
  components: {
    List,
    FirstStepAudit,
    SecondStepAudit,
  },
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleJoinM() {
      this.$router.push({
        name: "SettingPlayAdd",
      });
    },
  },
};
</script>
