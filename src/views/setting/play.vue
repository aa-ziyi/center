<template>
  <div>
    <page-header title="支付设置">
      <el-link type="primary" @click="handleJoinM">添加支付方式</el-link>
    </page-header>
    <el-tabs v-model="activeName">
      <el-tab-pane label="已添加支付" name="first">
        <FirstList />
      </el-tab-pane>
      <el-tab-pane label="未添加支付" name="second">
        <List />
      </el-tab-pane>
      <el-tab-pane label="支付初审" name="third">
        <FirstStepAudit />
      </el-tab-pane>
      <el-tab-pane label="支付终审" name="fourth">
        <SecondStepAudit />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import List from "./components/List";
import FirstList from "./components/FirstList";
import FirstStepAudit from "./components/FirstStepAudit";
import SecondStepAudit from "./components/SecondStepAudit";
export default {
  components: {
    FirstList,
    List,
    FirstStepAudit,
    SecondStepAudit,
  },
  data() {
    return {
      activeName: "first",
    };
  },
  created() {
    this.activeName = this.$route.query.activeName || "first";
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
