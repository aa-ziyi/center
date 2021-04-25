<template>
  <div>
    <page-header title="商户列表">
      <el-link type="primary" @click="handleJoinM"> 添加线上商户 </el-link>
    </page-header>
    <el-tabs v-model="activeName" @tab-click="tableClick">
      <el-tab-pane label="已入驻" name="settled">
        <SettledMerchants :prestoreinfoData="prestoreinfoData" />
      </el-tab-pane>
      <el-tab-pane label="未入驻" name="unSettledMerchants">
        <UnSettledMerchants :prestoreinfoData="prestoreinfoData" />
      </el-tab-pane>
      <el-tab-pane label="商户初审 " name="merchantOneStep">
        <MerchantOneStep :prestoreinfoData="prestoreinfoData" />
      </el-tab-pane>
      <el-tab-pane label="商户终审" name="merchantTwoStep">
        <MerchantTwoStep :prestoreinfoData="prestoreinfoData" />
      </el-tab-pane>
      <el-tab-pane label="协议签订" name="merchantThreeStep">
        <MerchantThreeStep :prestoreinfoData="prestoreinfoData" />
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
import { getPrestoreinfo } from "@/api/merchant.js";
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
      prestoreinfoData: {},
      currentTabs: [
        "settled",
        "unSettledMerchants",
        "merchantOneStep",
        "merchantTwoStep",
        "merchantThreeStep",
      ],
    };
  },
  created() {
    let { activeName } = this.$route.query;
    this.activeName =
      activeName && this.currentTabs.indexOf(activeName) > -1
        ? activeName
        : "settled";
    getPrestoreinfo().then((res) => {
      this.prestoreinfoData = res.data;
    });
    let { id, status } = this.$route.params;
    if (id) {
      this.getData(status, id);
    }
  },
  methods: {
    tableClick() {
      // 避免刷新没有到第一个tab
      let { activeName } = this.$route.query;
      if (activeName && this.currentTabs.indexOf(activeName) > -1) {
        this.$router.push({
          name: this.$route.name,
          params: this.$route.params,
        });
      }
    },
    handleJoinM() {
      this.$router.push({
        name: "MerchantListJoin",
      });
    },
  },
};
</script>
