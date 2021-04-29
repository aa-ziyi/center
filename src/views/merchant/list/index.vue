<template>
  <div>
    <page-header title="商户列表">
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-circle-plus"
        @click="handleJoinM"
        v-if="$hasPermission('storemange#list#addstore')"
      >
        添加线上商户
      </el-button>
    </page-header>
    <el-tabs v-model="activeName">
      <el-tab-pane label="已入驻" name="added" v-if="permission.added">
        <SettledMerchants :prestoreinfoData="prestoreinfoData" />
      </el-tab-pane>
      <el-tab-pane label="未入驻" name="adding" v-if="permission.adding">
        <UnSettledMerchants :prestoreinfoData="prestoreinfoData" />
      </el-tab-pane>
      <el-tab-pane
        label="商户初审 "
        name="aduitfirst"
        v-if="permission.aduitfirst"
      >
        <MerchantOneStep :prestoreinfoData="prestoreinfoData" />
      </el-tab-pane>
      <el-tab-pane
        label="商户终审"
        name="aduitsecond"
        v-if="permission.aduitsecond"
      >
        <MerchantTwoStep :prestoreinfoData="prestoreinfoData" />
      </el-tab-pane>
      <el-tab-pane label="协议签订" name="filesgin" v-if="permission.filesgin">
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
  beforeRouteEnter(to, from, next) {
    to.meta.keepAlive = true;
    next();
  },
  data() {
    return {
      activeName: "added",
      prestoreinfoData: {},
      permission: {},
    };
  },
  created() {
    this.getFirstActive();
    getPrestoreinfo().then((res) => {
      this.prestoreinfoData = res.data;
    });
    let { id, status } = this.$route.params;
    if (id) {
      this.getData(status, id);
    }
  },
  methods: {
    handleJoinM() {
      this.$router.push({
        name: "MerchantListJoin",
      });
    },
    getFirstActive() {
      let per = {};
      this.activeName = "";
      if (this.$hasPermission("storemange#list#added")) {
        this.activeName = "added";
        per.added = 1;
      }
      if (this.$hasPermission("storemange#list#adding")) {
        this.activeName = this.activeName || "adding";
        per.adding = 1;
      }
      if (this.$hasPermission("storemange#list#aduitfirst")) {
        this.activeName = this.activeName || "aduitfirst";
        per.aduitfirst = 1;
      }
      if (this.$hasPermission("storemange#list#aduitsecond")) {
        this.activeName = this.activeName || "aduitsecond";
        per.aduitsecond = 1;
      }
      if (this.$hasPermission("storemange#list#filesgin")) {
        this.activeName = this.activeName || "filesgin";
        per.filesgin = 1;
      }
      this.permission = per;
    },
  },
};
</script>
