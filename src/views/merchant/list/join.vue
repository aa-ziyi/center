<template>
  <div>
    <page-header title="商户入驻"></page-header>
    {{ formData }}
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
import { getPrestoreinfo, storetAddbyself, storetAdd } from "@/api/merchant.js";
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
      isAdmin: false,
    };
  },
  created() {
    console.log("created");
    getPrestoreinfo().then((res) => {
      this.prestoreinfoData = res.data;
    });
  },
  methods: {
    baseNext(formData) {
      this.activeName = "base";
      // storeTypeP移除
      let {
        storeTypeP,
        serviceType = [],
        companyAreaCode = [],
        ...other
      } = formData;
      this.formData = {
        ...this.formData,
        ...other,
        serviceType: serviceType.join(","),
        companyAreaCode: companyAreaCode.length
          ? companyAreaCode[companyAreaCode.length - 1]
          : "",
      };
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
      this.activeName = "playType";
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
    exchangeRateNext(formData) {
      this.activeName = "agreement";
      let { capitalTypeList = [], ...other } = formData;
      let capitalType = {};
      capitalTypeList.forEach((element) => {
        capitalType[element] = "1";
      });
      this.freeInfo = {
        ...other,
        ...capitalType,
      };
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
          freeInfo: [{ ...this.freeInfo }],
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
function jsToFormData(obj) {
  //对象转formdata格式
  let formData = new FormData();
  for (var i in obj) {
    if (isArray(obj[i])) {
      obj[i].map((item) => {
        formData.append(i, item);
      });
      console.log("isArray");
    } else if (obj[i] instanceof FileList) {
      //filelist 文件类型的处理
      console.log("FileList");
      for (var fileItem = 0; fileItem < obj[i].length; fileItem++) {
        formData.append(i, obj[i].item(fileItem));
        console.log("FileList", obj[i].item(fileItem));
      }
    } else {
      if (obj[i]) {
        formData.append(i, isObject(obj[i]) ? JSON.stringify(obj[i]) : obj[i]);
      }
    }
  }
  return formData;
}
function isArray(arg) {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
</script>
