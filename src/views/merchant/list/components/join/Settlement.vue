<template>
  <div>
    <el-form
      ref="baseForm"
      :model="formInline"
      :rules="formRules"
      class="demo-form-inline"
      label-width="150px"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="结算账号类型:" prop="settleAcType">
            <el-select
              v-model="formInline.settleAcType"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="(option, index) in prestoreinfoData.settleAcTypeMap"
                :key="index"
                :label="option[Object.keys(option)[0]]"
                :value="Object.keys(option)[0]"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开户行联行号:" prop="merOpBk">
            <el-input
              v-model="formInline.merOpBk"
              placeholder="请输入"
              style="display: none"
            ></el-input>
            {{ formInline.merOpBk }}
            <a class="link-primary" @click="handleCheckPaymentId">
              {{ formInline.merOpBk ? "修改" : "选择" }}支付方式
            </a>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算银行名称:" prop="withdrawBankid">
            <el-input
              v-model="formInline.withdrawBankid"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资金结算账号:" prop="settleAc">
            <el-input
              v-model="formInline.settleAc"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开户行详细信息:" prop="openbankDesc">
            <el-input
              v-model="formInline.openbankDesc"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算方式:" prop="stlMode">
            <el-select
              v-model="formInline.stlMode"
              placeholder=""
              style="width: 100%"
            >
              <el-option
                v-for="(option, index) in prestoreinfoData.stlModeMap"
                :key="index"
                :label="option[Object.keys(option)[0]]"
                :value="Object.keys(option)[0]"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算比例:" prop="settleRate">
            <el-row>
              <el-col :span="16">
                <el-input
                  v-model="formInline.settleRate"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col :span="8">（%） </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算周期:" prop="settlePeriod">
            <el-select
              v-model="formInline.settlePeriod"
              placeholder=""
              style="width: 100%"
            >
              <el-option
                v-for="(option, index) in prestoreinfoData.settlePeriod"
                :key="index"
                :label="option"
                :value="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算划款天数:" prop="settleTrfdays">
            <el-input
              v-model="formInline.settleTrfdays"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="起始金额:" prop="settleBeginamt">
            <el-row>
              <el-col :span="16">
                <el-input
                  v-model="formInline.settleBeginamt"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col :span="8">（单位：元） </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最低收费金额:" prop="minRetainedamt">
            <el-row>
              <el-col :span="16">
                <el-input
                  v-model="formInline.minRetainedamt"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col :span="8">（单位：元） </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发票开具方式" prop="settleBillType">
            <el-radio-group v-model="formInline.settleBillType">
              <el-radio label="wechatPayH5">按季度开</el-radio>
              <el-radio label="aliPayApp">按季度月开</el-radio>
              <el-radio label="aliPayH5">按月开</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="税务证明:" prop="revPrv">
            <el-input
              v-model="formInline.revPrv"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="ICP资质编号:" prop="icpNo">
            <el-input
              v-model="formInline.icpNo"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="发票邮寄地址:" prop="postAddress">
            <el-checkbox @change="handleCheckChange">
              与商户地址一致
            </el-checkbox>
            <el-row>
              <el-col :span="8">
                <area-cascader v-model="formInline.billAraeCode" />
              </el-col>
              <el-col :span="16">
                <el-input v-model="formInline.postAddress" placeholder="请输入">
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button @click="onReset">重置</el-button>
        <el-button type="primary" class="ml20" @click="validateForm()">
          下一项
        </el-button>
      </el-form-item>
    </el-form>
    <merOpBkDialog v-model="bkialogVisible" @check="onCheckBkId" />
  </div>
</template>
<script>
import { scrollTo } from "@/utils/scroll-to.js";
import { validatePositiveInteger, validateSingleBit } from "@/utils/validate";
import merOpBkDialog from "./merOpBkDialog";
export default {
  components: { merOpBkDialog },
  props: {
    prestoreinfoData: {
      type: Object,
      default: () => {},
    },
    editData: {
      type: Object,
      default: () => {},
    },
    baseRef: {
      type: [Object, null],
      default: null,
    },
  },
  data() {
    return {
      bkialogVisible: false,
      formInline: {
        billAraeCode: ["360000", "360100"],
      },
      formRules: {
        settleAcType: [
          { required: true, message: "请选择结算账号类型", trigger: "change" },
        ],
        merOpBk: [
          { required: true, message: "请输入开户行联行号", trigger: "blur" },
        ],
        withdrawBankid: [
          { required: true, message: "请输入结算银行名称", trigger: "blur" },
        ],
        openbankDesc: [
          { required: true, message: "请输入开户行详细信息", trigger: "blur" },
        ],
        stlMode: [
          { required: true, message: "请选择结算方式", trigger: "change" },
        ],
        settlePeriod: [
          { required: true, message: "请选择结算周期", trigger: "change" },
        ],
        settleRate: [
          { required: true, message: "请输入结算比例", trigger: "blur" },
          {
            validator: validateSingleBit,
          },
        ],
        settleTrfdays: [
          { required: true, message: "请输入结算划款天数", trigger: "blur" },
          {
            validator: validatePositiveInteger,
          },
        ],
        revPrv: [
          { required: true, message: "请输入税务证明", trigger: "blur" },
        ],
        icpNo: [
          { required: true, message: "请输入ICP资质编号", trigger: "blur" },
        ],
        minRetainedamt: [{ validator: validateSingleBit }],
        settleBeginamt: [{ validator: validateSingleBit }],
      },
    };
  },
  watch: {
    editData(newData) {
      this.initBaseData(newData);
    },
  },
  created() {},
  methods: {
    handleCheckChange(value) {
      if (value && this.baseRef) {
        console.log(this.baseRef);
        this.$set(
          this.formInline,
          "billAraeCode",
          this.baseRef.formInline.companyAreaCode
        );
        this.$set(
          this.formInline,
          "postAddress",
          this.baseRef.formInline.storeAddress
        );
      }
    },
    onCheckBkId(obj) {
      this.$set(this.formInline, "merOpBk", obj.opBankCode);
    },
    handleCheckPaymentId() {
      this.bkialogVisible = true;
    },
    validateForm(callBack) {
      this.$refs["baseForm"].validate((valid) => {
        if (valid) {
          console.log("valid");
          this.$emit("next", this.formInline);
        } else {
          this.$nextTick(() => {
            var isError = document.getElementsByClassName("is-error");
            if (isError && isError.length) {
              scrollTo(isError[0].offsetTop - 130, 500);
            }
          });
          return false;
        }
        if (callBack) {
          callBack(valid);
        }
      });
    },
    initBaseData(data) {
      let {
        settleAcType,
        merOpBk,
        withdrawBankid,
        settleAc,
        openbankDesc,
        stlMode,
        settleRate,
        settlePeriod,
        settleTrfdays,
        settleBeginamt,
        minRetainedamt,
        settleBillType,
        revPrv,
        icpNo,
        postAddress,
        billAraeCode,
      } = data.storeInfo;
      this.formInline = {
        billAraeCode: billAraeCode ? billAraeCode.split(",") : [],
        settlePeriod:
          settlePeriod || settlePeriod == 0 ? String(settlePeriod) : "",
        settleAcType,
        merOpBk,
        withdrawBankid,
        settleAc,
        openbankDesc,
        stlMode,
        settleRate,
        settleTrfdays,
        settleBeginamt,
        minRetainedamt,
        settleBillType,
        revPrv,
        icpNo,
        postAddress,
      };
    },
  },
};
</script>
