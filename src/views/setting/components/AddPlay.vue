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
          <el-form-item label="支付渠道ID:" prop="id" v-if="formInline.id">
            <el-input v-model="formInline.id" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付渠道名称:" prop="name">
            <el-input v-model="formInline.name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
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
              <el-col :span="18">
                <el-input
                  v-model="formInline.hebaoFee"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col :span="6">（%） </el-col>
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
          <el-form-item label="和包支付" prop="hebaoStatus">
            <el-radio-group v-model="formInline.hebaoStatus">
              <el-radio :label="1">支持</el-radio>
              <el-radio :label="0">不支持</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信费率:" prop="wechatPayFee">
            <el-row>
              <el-col :span="18">
                <el-input
                  v-model="formInline.wechatPayFee"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col :span="6">（%） </el-col>
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
              <el-col :span="18">
                <el-input
                  v-model="formInline.aliPayFee"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col :span="6">（%） </el-col>
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
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button class="ml20" @click="onBack">返回</el-button>
        <!-- <el-button @click="onReset" class="ml20">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { scrollTo } from "@/utils/scroll-to.js";
import { validateSingleBit } from "@/utils/validate";
import {
  setStorePaymentAdd,
  storeGetpaymentinfo,
  storeGetpaymenttempinfo,
  setStorePaymentEdit,
  setStorePaymentEditUpdate,
} from "@/api/setting/play";
export default {
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
        hebaoFee: [
          {
            validator: validateSingleBit,
            trigger: "blur",
          },
        ],
        wechatPayFee: [
          {
            validator: validateSingleBit,
            trigger: "blur",
          },
        ],
        aliPayFee: [
          {
            validator: validateSingleBit,
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    let { id } = this.$route.params;
    if (id) {
      this.getFormData(id);
    } else {
      this.initFormData();
    }
  },
  methods: {
    getFormData(id) {
      let { status } = this.$route.query;
      let method =
        String(status) === "3" ? storeGetpaymentinfo : storeGetpaymenttempinfo;
      method({
        data: {
          id,
        },
      }).then((res) => {
        this.formInline = res.data.paymentInfo;
      });
    },
    initFormData() {
      this.formInline = {
        hebaoStatus: 1,
        wechatPayApp: 1,
        wechatPayH5: 1,
        aliPayApp: 1,
        wechatPayMp: 1,
        aliPayH5: 1,
      };
    },
    onSubmit() {
      this.$refs["baseForm"].validate((valid) => {
        if (valid) {
          this.saveData();
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
    onBack() {
      this.$router.push({
        name: "SettingPlay",
        query: {
          activeName: this.$route.query.activeName,
        },
      });
    },
    saveData() {
      let method = setStorePaymentAdd;
      if (this.formInline.id) {
        method =
          String(this.formInline.status) == "3"
            ? setStorePaymentEditUpdate
            : setStorePaymentEdit;
      }
      let {
        createTime,
        isValid,
        createUser,
        status,
        updateStatus,
        ...form
      } = this.formInline;
      method({ data: { ...form } }).then((res) => {
        this.$message({
          type: "success",
          message: res.msg,
        });
        this.$router.push({
          name: "SettingPlay",
          query: {
            activeName: this.$route.query.activeName,
          },
        });
      });
    },
    onReset() {
      this.initFormData();
    },
  },
};
</script>
