<template>
  <div>
    <el-form
      ref="baseForm"
      :model="formInline"
      :rules="formRules"
      class="demo-form-inline"
      label-width="150px"
    >
      {{ formInline }}
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="结算账号类型:">
            <el-select v-model="formInline.settleAcType" placeholder="请选择">
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
            ></el-input>
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
          <el-form-item label="资金结算账号:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开户行详细信息:">
            <el-input
              v-model="formInline.openbankDesc"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算方式:">
            <el-select v-model="formInline.stlMode" placeholder="">
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
          <el-form-item label="结算比例:">
            <el-input
              v-model="formInline.settleRate"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算周期:">
            <el-select v-model="formInline.settlePeriod" placeholder="">
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
          <el-form-item label="结算划款天数:">
            <el-input
              v-model="formInline.settleTrfdays"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="起始金额:">
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
          <el-form-item label="最低收费金额:">
            <el-input
              v-model="formInline.minRetainedamt"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发票开具方式(未知)">
            <el-input v-model="formInline.test" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付宝应用ID:">
            <el-input
              v-model="formInline.aliAppId"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="税务证明:">
            <el-input
              v-model="formInline.revPrv"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信应用ID:">
            <el-input
              v-model="formInline.wechatAppId"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="ICP资质编号:">
            <el-input
              v-model="formInline.icpNo"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="支付方式:">
            <el-row>
              <el-col :span="24">
                <el-checkbox-group v-model="formInline.checkList">
                  <el-checkbox label="hebaoStatus">和包支付</el-checkbox>
                  <el-checkbox label="wechatPayMp">
                    微信公众号支付
                  </el-checkbox>
                  <el-checkbox label="wechatPayApp">微信APP支付</el-checkbox>
                </el-checkbox-group>
              </el-col>
              <el-col :span="24">
                <el-checkbox-group v-model="formInline.checkList">
                  <el-checkbox label="wechatPayH5">微信H5支付</el-checkbox>
                  <el-checkbox label="aliPayApp">支付宝APP支付</el-checkbox>
                  <el-checkbox label="aliPayH5">支付宝H5支付</el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="发票邮寄地址:">
            <el-row>
              <el-col :span="8">
                <el-select
                  v-model="formInline.region"
                  placeholder=""
                  style="width: 100%"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-input v-model="formInline.postAddress" placeholder="请输入">
                </el-input>
              </el-col>
              <el-col :span="3" :offset="1">
                <el-checkbox v-model="formInline.checked">
                  与商户地址一致 （未知）
                </el-checkbox>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">下一项</el-button>
        <el-button @click="onReset" class="ml20">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { scrollTo } from "@/utils/scroll-to.js";
export default {
  props: {
    prestoreinfoData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formInline: {
        checkList: [],
      },
      formRules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      },
      cites: ["上海", "北京", "广州", "深圳"],
    };
  },
  created() {},
  methods: {
    onSubmit() {
      this.$refs["baseForm"].validate((valid) => {
        if (valid) {
          console.log("valid");
          this.$emit("next");
        } else {
          this.$nextTick(() => {
            var isError = document.getElementsByClassName("is-error");
            if (isError && isError.length) {
              scrollTo(isError[0].offsetTop - 130, 500);
            }
          });
          return false;
        }
      });
    },
    onReset() {},
  },
};
</script>
