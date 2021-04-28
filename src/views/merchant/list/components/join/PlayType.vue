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
          <el-form-item label="支付渠道名称:" prop="name">
            <el-input v-model="formInline.name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="12"> </el-col>
        <el-col :span="12">
          <el-form-item label="和包支付编号:" prop="hebaoStoreId">
            <el-input
              v-model="formInline.hebaoStoreId"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信应用ID:" prop="wechatAppId">
            <el-input
              v-model="formInline.wechatAppId"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="和包费率:" prop="hebaoFee">
            <el-row>
              <el-col :span="16">
                <el-input
                  v-model="formInline.hebaoFee"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col :span="8">（%） </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信支付商户号:" prop="wechatMerId">
            <el-input
              v-model="formInline.wechatMerId"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="和包支付:" prop="hebaoStatus">
            <el-radio-group v-model="formInline.hebaoStatus">
              <el-radio :label="1">支持</el-radio>
              <el-radio :label="0">不支持</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信费率:" prop="wechatPayFee">
            <el-row>
              <el-col :span="16">
                <el-input
                  v-model="formInline.wechatPayFee"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col :span="8">（%） </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付宝应用ID:" prop="aliAppId">
            <el-input
              v-model="formInline.aliAppId"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信APP支付:" prop="wechatPayApp">
            <el-radio-group v-model="formInline.wechatPayApp">
              <el-radio :label="1">支持</el-radio>
              <el-radio :label="0">不支持</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付宝费率:" prop="aliPayFee">
            <el-row>
              <el-col :span="16">
                <el-input
                  v-model="formInline.aliPayFee"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col :span="8">（%） </el-col>
            </el-row>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="微信H5支付:" prop="wechatPayH5">
            <el-radio-group v-model="formInline.wechatPayH5">
              <el-radio :label="1">支持</el-radio>
              <el-radio :label="0">不支持</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付宝APP支付:" prop="aliPayApp">
            <el-radio-group v-model="formInline.aliPayApp">
              <el-radio :label="1">支持</el-radio>
              <el-radio :label="0">不支持</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信公众号支付:" prop="wechatPayMp">
            <el-radio-group v-model="formInline.wechatPayMp">
              <el-radio :label="1">支持</el-radio>
              <el-radio :label="0">不支持</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付宝H5支付:" prop="aliPayH5">
            <el-radio-group v-model="formInline.aliPayH5">
              <el-radio :label="1">支持</el-radio>
              <el-radio :label="0">不支持</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button @click="$emit('prev', 'settlement')">上一项</el-button>
        <el-button class="ml20" type="primary" @click="validateForm()"
          >提交</el-button
        >
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
    editData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formInline: {
        hebaoStatus: 1,
        wechatPayApp: 1,
        wechatPayH5: 1,
        aliPayApp: 1,
        wechatPayMp: 1,
        aliPayH5: 1,
      },
      formRules: {
        name: [
          { required: true, message: "请输入支付渠道名称", trigger: "blur" },
        ],
        wechatAppId: [
          { required: true, message: "请输入微信应用ID", trigger: "blur" },
        ],
        wechatMerId: [
          { required: true, message: "请输入微信支付商户号", trigger: "blur" },
        ],
        wechatPayFee: [
          { required: true, message: "请输入微信费率", trigger: "blur" },
        ],
        aliAppId: [
          { required: true, message: "请输入支付宝应用ID", trigger: "blur" },
        ],
        aliPayFee: [
          { required: true, message: "请输入支付宝费率", trigger: "blur" },
        ],
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
    validateForm(callBack) {
      this.$refs["baseForm"].validate((valid) => {
        if (valid) {
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
      // let {
      //   contractSignTime,
      //   decision,
      //   contract,
      //   storedecision,
      //   chinamdecision,
      // } = data.payMenthodInfo;
      this.formInline = data.payMenthodInfo || {
        hebaoStatus: 1,
        wechatPayApp: 1,
        wechatPayH5: 1,
        aliPayApp: 1,
        wechatPayMp: 1,
        aliPayH5: 1,
      };
    },
  },
};
</script>
