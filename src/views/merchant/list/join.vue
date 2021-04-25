<template>
  <div>
    <page-header title="商户入驻"></page-header>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="base">
        <Base
          @next="baseNext"
          :prestoreinfoData="prestoreinfoData"
          :isAdmin="isAdmin"
        />
      </el-tab-pane>
      <el-tab-pane label="业务信息" name="business">
        <Business @next="businessNext" :prestoreinfoData="prestoreinfoData" />
      </el-tab-pane>
      <el-tab-pane label="结算信息" name="settlement">
        <Settlement
          @next="settlementNext"
          :prestoreinfoData="prestoreinfoData"
        />
      </el-tab-pane>
      <el-tab-pane label="支付方式" name="playType" v-if="!isAdmin">
        <PlayType @next="PlayTypeNext" :prestoreinfoData="prestoreinfoData" />
      </el-tab-pane>
      <el-tab-pane label="费率" name="exchangeRate" v-if="isAdmin">
        <ExchangeRate
          @next="exchangeRateNext"
          :prestoreinfoData="prestoreinfoData"
        />
      </el-tab-pane>
      <el-tab-pane label="协议信息" name="agreement" v-if="isAdmin">
        <Agreement @next="AgreementNext" :prestoreinfoData="prestoreinfoData" />
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
import PlayType from "./components/join/PlayType";
import {
  getPrestoreinfo,
  storetAddbyself,
  storetAdd,
  storeGetStoreTempInfo,
  storeGetstoreinfo,
} from "@/api/merchant.js";
import { jsToFormData } from "@/utils/tool";
export default {
  components: {
    Base,
    Business,
    Settlement,
    ExchangeRate,
    Agreement,
    PlayType,
  },
  data() {
    return {
      prestoreinfoData: {},
      activeName: "base",
      formData: {},
      freeInfo: {},
      payMentInfo: {},
      agreementData: {},
      isAdmin: true,
      editData: {},
    };
  },
  created() {
    getPrestoreinfo().then((res) => {
      this.prestoreinfoData = res.data;
    });
    let { id, status } = this.$route.params;
    if (id) {
      this.getData(status, id);
    }
  },
  methods: {
    getData(status, id) {
      let method =
        String(status) == "3" ? storeGetstoreinfo : storeGetStoreTempInfo;
      method({
        data: { id },
      }).then((res) => {
        this.editData = res.data;
      });
    },
    baseNext(formData) {
      this.activeName = "base";
      // storeTypeP移除
      let {
        storeTypeP,
        serviceType = [],
        companyAreaCode = [],
        areaCode = [],
        ...other
      } = formData;
      this.formData = {
        ...this.formData,
        ...other,
        serviceType: serviceType.join(","),
        companyAreaCode: companyAreaCode.length
          ? companyAreaCode[companyAreaCode.length - 1]
          : "",
        areaCode: areaCode.length ? areaCode[areaCode.length - 1] : "",
      };
      this.activeName = "business";
    },
    businessNext(formData) {
      this.activeName = "settlement";
      // industryType移除
      let { industryType, ...other } = formData;
      this.formData = {
        ...this.formData,
        ...other,
      };
    },
    settlementNext(formData) {
      this.activeName = this.isAdmin ? "exchangeRate" : "playType";

      let { billAraeCode = [], ...other } = formData;
      this.formData = {
        ...this.formData,
        ...other,
        billAraeCode: billAraeCode.length
          ? billAraeCode[billAraeCode.length - 1]
          : "",
      };
    },
    PlayTypeNext(formData) {
      this.payMentInfo = {
        ...this.payMentInfo,
        ...formData,
      };
      this.saveFormData();
    },
    exchangeRateNext(arryForm) {
      this.activeName = "agreement";
      this.freeInfo = arryForm.map((formData) => {
        let { capitalTypeList = [], ...other } = formData;
        let capitalType = {};
        capitalTypeList.forEach((element) => {
          capitalType[element] = "1";
        });
        return {
          ...other,
          ...capitalType,
        };
      });
    },
    AgreementNext(formData) {
      let { contractSignTime, ...other } = formData;
      this.agreementData = {
        ...other,
      };
      if (contractSignTime) {
        this.$set(this.formData, "contractSignTime", contractSignTime);
      }
      this.saveAdminFormData();
    },
    saveFormData() {
      let data = {
        sgin: {
          ...this.formData,
          payMentInfo: this.payMentInfo,
        },
      };
      let _data = jsToFormData(data);
      storetAddbyself({
        data: _data,
      }).then(() => {});
    },
    saveAdminFormData() {
      let data = {
        sgin: {
          ...this.formData,
          freeInfo: this.freeInfo,
        },
        ...this.agreementData,
      };
      let _data = jsToFormData(data);
      storetAdd({
        data: _data,
      }).then(() => {});
    },
  },
};
</script>
