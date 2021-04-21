<template>
  <div>
    <page-header title="支付方式详情"> </page-header>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <ShowPlay />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ShowPlay from "./components/ShowPlay";
export default {
  components: {
    ShowPlay,
  },
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {},
};
</script>
