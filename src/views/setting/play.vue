<template>
  <div>
    <page-header title="支付设置">
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-circle-plus"
        @click="handleJoinM"
        >添加支付方式</el-button
      >
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
  beforeRouteEnter(to, from, next) {
    to.meta.keepAlive = true;
    next();
  },
  data() {
    return {
      activeName: "first",
    };
  },
  activated() {
    console.log("activated page");
  },
  created() {
    this.activeName = this.$route.query.activeName || "first";
    console.log("activated page created");
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
