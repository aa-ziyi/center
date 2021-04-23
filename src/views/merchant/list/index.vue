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
      <el-tab-pane label="未入驻" name="unSettledMerchants">
        <UnSettledMerchants />
      </el-tab-pane>
      <el-tab-pane label="商户初审 " name="merchantOneStep">
        <MerchantOneStep />
      </el-tab-pane>
      <el-tab-pane label="商户终审" name="merchantTwoStep">
        <MerchantTwoStep />
      </el-tab-pane>
      <el-tab-pane label="协议签订" name="merchantThreeStep">
        <MerchantThreeStep />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SettledMerchants from "./components/index/SettledMerchants";
import UnSettledMerchants from "./components/index/UnSettledMerchants";
import MerchantOneStep from "./components/index/MerchantOneStep";
import MerchantTwoStep from "./components/index/MerchantTwoStep";
import MerchantThreeStep from "./components/index/MerchantThreeStep";
export default {
  components: {
    SettledMerchants,
    UnSettledMerchants,
    MerchantOneStep,
    MerchantTwoStep,
    MerchantThreeStep,
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
