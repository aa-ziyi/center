<template>
  <div>
    <page-header title="新增支付方式"> </page-header>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <AddPlay />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AddPlay from "./components/AddPlay";
export default {
  components: {
    AddPlay,
  },
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {},
};
</script>
