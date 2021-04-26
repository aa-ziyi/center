<template>
  <div>
    <page-header title="商户入驻"></page-header>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="base" v-if="!isSign">
        <Base
          ref="base"
          @valid="baseNext"
          :prestoreinfoData="prestoreinfoData"
          :isAdmin="isAdmin"
          :editData="editData"
        />
      </el-tab-pane>
      <el-tab-pane label="业务信息" name="business" v-if="!isSign">
        <Business
          ref="business"
          @next="businessNext"
          :prestoreinfoData="prestoreinfoData"
          :editData="editData"
        />
      </el-tab-pane>
      <el-tab-pane label="结算信息" name="settlement" v-if="!isSign">
        <Settlement
          @next="settlementNext"
          :prestoreinfoData="prestoreinfoData"
          :editData="editData"
        />
      </el-tab-pane>
      <el-tab-pane label="支付方式" name="playType" v-if="!isAdmin && !isSign">
        <PlayType
          @next="PlayTypeNext"
          :prestoreinfoData="prestoreinfoData"
          :editData="editData"
        />
      </el-tab-pane>
      <el-tab-pane label="费率" name="exchangeRate" v-if="isAdmin && !isSign">
        <ExchangeRate
          @next="exchangeRateNext"
          :prestoreinfoData="prestoreinfoData"
          :editData="editData"
        />
      </el-tab-pane>
      <el-tab-pane label="协议信息" name="agreement" v-if="isAdmin">
        <Agreement
          @next="AgreementNext"
          :prestoreinfoData="prestoreinfoData"
          :isSign="isSign"
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
      isSign: false,
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
    this.isSign = this.$route.name == "MerchantListSign";
    if (this.isSign) {
      this.activeName = "agreement";
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
      this.validateBaseForm((valid) => {
        if (valid) {
          this.saveFormData();
        }
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
      if (this.isSign) {
        this.saveSign();
        return;
      }
      let { contractSignTime, ...other } = formData;
      this.agreementData = {
        ...other,
      };
      if (contractSignTime) {
        this.$set(this.formData, "contractSignTime", contractSignTime);
      }
      this.validateBaseForm((valid) => {
        if (valid) {
          this.saveAdminFormData();
        }
      });
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
    saveSign() {
      storetFilesign().then((res) => {
        console.log(res);
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
          this.validateBaseForm(callBack);
        }
      });
    },
    validateSettlementForm(callBack) {
      this.$refs["settlement"].validateForm((valid) => {
        if (!valid) {
          this.activeName = "settlement";
        } else {
          if (this.isAdmin) {
            callBack();
          } else {
            this.validateExchangeRateForm(callBack);
          }
        }
      });
    },
    validateExchangeRateForm(callBack) {
      this.$refs["exchangeRate"].validateForm((valid) => {
        if (!valid) {
          this.activeName = "exchangeRate";
        } else {
          this.validateBaseForm(callBack);
        }
      });
    },
  },
};
</script>
