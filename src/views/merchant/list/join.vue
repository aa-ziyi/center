<template>
  <div>
    <page-header title="商户入驻"></page-header>
    <el-tabs v-model="activeName" v-loading="loading">
      <el-tab-pane label="基本信息" name="base" v-if="!sginObj.type">
        <Base
          ref="base"
          @next="baseNext"
          :prestoreinfoData="prestoreinfoData"
          :isAdmin="isAdmin"
          :editData="editData"
        />
      </el-tab-pane>
      <el-tab-pane label="业务信息" name="business" v-if="!sginObj.type">
        <Business
          ref="business"
          @next="businessNext"
          :prestoreinfoData="prestoreinfoData"
          :editData="editData"
        />
      </el-tab-pane>
      <el-tab-pane label="结算信息" name="settlement" v-if="!sginObj.type">
        <Settlement
          ref="settlement"
          @next="settlementNext"
          :prestoreinfoData="prestoreinfoData"
          :editData="editData"
          :baseRef="baseRef"
        />
      </el-tab-pane>
      <el-tab-pane
        label="支付方式"
        name="playType"
        v-if="!isAdmin && !sginObj.type"
      >
        <PlayType
          ref="playType"
          @next="PlayTypeNext"
          :prestoreinfoData="prestoreinfoData"
          :editData="editData"
        />
      </el-tab-pane>
      <el-tab-pane
        label="费率"
        name="exchangeRate"
        v-if="isAdmin && !sginObj.type"
      >
        <ExchangeRate
          ref="exchangeRate"
          @next="exchangeRateNext"
          :prestoreinfoData="prestoreinfoData"
          :editData="editData"
        />
      </el-tab-pane>
      <el-tab-pane
        label="协议信息"
        name="agreement"
        v-if="isAdmin || sginObj.type"
      >
        <Agreement
          ref="agreement"
          @next="AgreementNext"
          :prestoreinfoData="prestoreinfoData"
          :sgin="sginObj"
          :editData="editData"
        />
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
  storetFilesign,
  storetEditUpdate,
  storetEdit,
} from "@/api/merchant.js";
import { jsToFormData } from "@/utils/tool";
import { getCurrentUser } from "@/utils/auth";
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
      loading: false,
      baseRef: null,
      sginObj: {},
    };
  },
  mounted() {
    this.baseRef = this.$refs["base"];
  },
  created() {
    this.initSginObj();
    let user = getCurrentUser();
    this.isAdmin = !!user.isAdmin;
    getPrestoreinfo().then((res) => {
      this.prestoreinfoData = res.data;
    });
    let { id, status } = this.$route.params;
    if (id) {
      this.getData(status, id);
    }
  },
  methods: {
    initSginObj() {
      let route = this.$route.name;
      if (route == "MerchantListSignAudit") {
        this.sginObj = {
          type: "signAudit",
        };
      }
      if (route == "merchantApplySign") {
        this.sginObj = {
          type: "storeSign",
        };
      }
      if (route == "MerchantListSignt") {
        this.sginObj = {
          type: "yiDongSign",
        };
      }
      if (this.sginObj.type) {
        this.activeName = "agreement";
      }
    },
    getData(status, id) {
      let method =
        String(status) == "3" ? storeGetstoreinfo : storeGetStoreTempInfo;
      this.loading = true;
      method({
        data: { id },
      })
        .then((res) => {
          this.editData = res.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    baseNext(formData) {
      let {
        storeTypeP, // storeTypeP移除
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
      // 校验前三个，校验不通过跳过去
      this.validateBaseForm(() => {
        let { id, ...other } = this.formData;
        let data = {
          sgin: {
            ...other,
            oldStoreId: id,
            payMentInfo: this.payMentInfo,
          },
        };
        let { status } = this.$route.params;
        let _data = jsToFormData(data);
        id ? this.saveEditData(_data, status) : this.saveFormData(_data);
      });
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
      //
      if (this.sginObj.type) {
        this.saveSign(contractSignTime);
        return;
      }
      if (contractSignTime) {
        this.$set(this.formData, "contractSignTime", contractSignTime);
      }
      this.validateBaseForm(() => {
        let { id, ...other } = this.formData;
        let data = {
          sgin: {
            ...other,
            oldStoreId: id,
            freeInfo: this.freeInfo,
          },
          ...this.agreementData,
        };
        let { status } = this.$route.params;
        let _data = jsToFormData(data);
        id ? this.saveEditData(_data, status) : this.saveAdminFormData(_data);
      });
    },
    saveFormData(data) {
      storetAddbyself({
        data,
      }).then(() => {
        this.back();
      });
    },
    saveAdminFormData(data) {
      storetAdd({
        data,
      }).then(() => {
        this.back();
      });
    },
    saveSign(contractSignTime) {
      let data = {
        sgin: {
          id: this.$route.params.id,
          contractSignTime,
        },
        ...this.agreementData,
      };
      console.log("saveSign", data);
      let _data = jsToFormData(data);
      storetFilesign({ data: _data }).then((res) => {
        this.back();
      });
    },
    saveEditData(data, status) {
      let method = String(status) == "3" ? storetEditUpdate : storetEdit;
      method({
        data,
      }).then(() => {
        this.back();
      });
    },
    back() {
      this.$router.push({
        name: this.$route.query.routeName || "MerchantList",
        query: {
          activeName: this.$route.query.activeName,
        },
      });
    },
    validateBaseForm(callBack) {
      this.$refs["base"].validateForm((valid) => {
        if (!valid) {
          this.activeName = "base";
        } else {
          this.validateBusinessForm(callBack);
        }
      });
    },
    validateBusinessForm(callBack) {
      this.$refs["business"].validateForm((valid) => {
        if (!valid) {
          this.activeName = "business";
        } else {
          this.validateSettlementForm(callBack);
        }
      });
    },
    validateSettlementForm(callBack) {
      this.$refs["settlement"].validateForm((valid) => {
        if (!valid) {
          this.activeName = "settlement";
        } else {
          if (this.isAdmin) {
            this.validateExchangeRateForm(callBack);
          } else {
            callBack();
          }
        }
      });
    },
    validateExchangeRateForm(callBack) {
      this.$refs["exchangeRate"].validateForm((valid) => {
        if (!valid) {
          this.activeName = "exchangeRate";
        } else {
          callBack();
        }
      });
    },
  },
};
</script>
