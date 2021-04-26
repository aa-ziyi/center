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
          <el-form-item label="商户性质:" prop="merQual">
            <el-select v-model="formInline.merQual" placeholder="请选择">
              <el-option
                v-for="(option, index) in prestoreinfoData.merQualMap"
                :key="index"
                :label="option[Object.keys(option)[0]]"
                :value="Object.keys(option)[0]"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册资本:" prop="regCap">
            <el-input
              v-model="formInline.regCap"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属行业:" prop="merType">
            <el-select
              v-model="formInline.industryType"
              placeholder="请选择"
              @change="storeTypePChange"
            >
              <el-option
                v-for="(option, index) in storeTypeP"
                :key="index"
                :label="option.name"
                :value="option.id"
              ></el-option>
            </el-select>
            <el-select v-model="formInline.merType" placeholder="请选择">
              <el-option
                v-for="(option, index) in storeTypeC"
                :key="index"
                :label="option.name"
                :value="option.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="法人名字:" prop="corporationname">
            <el-input
              v-model="formInline.corporationname"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工商注册号:" prop="icRegno">
            <el-input
              v-model="formInline.icRegno"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="法人证件号码:" prop="corporationidno">
            <el-row>
              <el-col :span="11">
                <el-select
                  v-model="formInline.corporationidtype"
                  placeholder="证件类型"
                >
                  <el-option
                    v-for="(
                      option, index
                    ) in prestoreinfoData.corporationIdType"
                    :key="index"
                    :label="option[Object.keys(option)[0]]"
                    :value="Object.keys(option)[0]"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-input
                  v-model="formInline.corporationidno"
                  placeholder=""
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="纳税资质:" prop="taxCertifi">
            <el-input
              v-model="formInline.taxCertifi"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经营产品:">
            <el-input
              v-model="formInline.operateProduct"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="国税税务登记号:">
            <el-input
              v-model="formInline.taxCountryNo"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商户员工数:" prop="stafNum">
            <el-input
              v-model="formInline.stafNum"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="增值税率:">
            <el-input
              v-model="formInline.taxAddedRate"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商户开业日期:">
            <el-date-picker
              v-model="formInline.opNdt"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱:" prop="email">
            <el-input
              v-model="formInline.email"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司简介:">
            <el-input
              type="textarea"
              :rows="4"
              v-model="formInline.synposis"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经营范围:">
            <el-input
              type="textarea"
              :rows="4"
              v-model="formInline.bsScope"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button class="ml20">上一项</el-button>
        <el-button type="primary" @click="validateForm()">下一项</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { scrollTo } from "@/utils/scroll-to.js";
import { getStoretype } from "@/api/merchant.js";
import {
  validatePositiveInteger,
  validateEmail,
  validateSingleBit,
} from "@/utils/validate";
export default {
  props: {
    prestoreinfoData: {
      type: Object,
      default: () => {},
    },
    editData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      storeTypeP: [],
      storeTypeC: [],
      formInline: {},
      formRules: {
        merQual: [
          { required: true, message: "请选择商户性质", trigger: "change" },
        ],
        merType: [
          { required: true, message: "请选择所属行业", trigger: "change" },
        ],
        corporationname: [
          { required: true, message: "请输入法人姓名", trigger: "blur" },
        ],
        corporationidno: [
          { required: true, message: "请输入法人证件号码", trigger: "blur" },
        ],
        stafNum: [
          {
            validator: validatePositiveInteger,
            trigger: "blur",
          },
        ],
        icRegno: [
          {
            required: true,
            message: "请输入工商注册号",
            trigger: "blur",
          },
        ],
        regCap: [
          {
            required: true,
            message: "请输入注册资本",
            trigger: "blur",
          },
          {
            validator: validateSingleBit,
            trigger: "blur",
          },
        ],
        email: [
          {
            validator: validateEmail,
            trigger: "blur",
          },
        ],
        taxCertifi: [
          {
            required: true,
            message: "请输入纳税资质",
            trigger: "blur",
          },
        ],
        operateProduct: [
          {
            required: true,
            message: "请输入国税税务登记号",
            trigger: "blur",
          },
        ],
        taxAddedRate: [
          {
            required: true,
            message: "请输入增值税率",
            trigger: "blur",
          },
          {
            validator: validateSingleBit,
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    editData(newData) {
      this.initBaseData(newData);
    },
  },
  created() {
    getStoretype({
      data: {
        pId: 0,
        type: 3,
      },
    }).then((res) => {
      this.storeTypeP = res.data;
    });
  },
  methods: {
    storeTypePChange(value, merType) {
      this.storeTypeC = [];
      this.$set(this.formInline, "merType", merType);
      if (!value) {
        return;
      }
      getStoretype({
        data: {
          pId: value,
          type: 3,
        },
      }).then((res) => {
        this.storeTypeC = res.data;
      });
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
        }
        if (callBack) {
          callBack(valid);
        }
      });
    },
    initBaseData(data) {
      let {
        merQual,
        regCap,
        merPTypeDesc,
        merType,
        corporationname,
        icRegno,
        corporationidno,
        corporationidtype,
        taxCertifi,
        operateProduct,
        taxCountryNo,
        stafNum,
        taxAddedRate,
        opNdt,
        email,
        synposis,
        bsScope,
      } = data.storeInfo;
      merPTypeDesc = merPTypeDesc ? merPTypeDesc.split(",") : [];
      this.formInline = {
        industryType: merPTypeDesc.length > 1 ? Number(merPTypeDesc[1]) : "",
        merType: merType || merType == 0 ? Number(merType) : "",
        merQual,
        regCap,
        corporationname,
        icRegno,
        corporationidno,
        corporationidtype,
        taxCertifi,
        operateProduct,
        taxCountryNo,
        stafNum,
        taxAddedRate,
        opNdt,
        email,
        synposis,
        bsScope,
      };
      if (this.formInline.industryType) {
        this.storeTypePChange(
          this.formInline.industryType,
          this.formInline.merType
        );
      }
    },
  },
};
</script>
