<template>
  <div>
    <page-header
      :title="`${$route.params.storeId ? '修改' : '编辑'}子商户`"
    ></page-header>
    <el-tabs value="first" class="details-el-tabs">
      <el-tab-pane
        :label="`${$route.params.storeId ? '修改' : '编辑'}子商户`"
        name="first"
      >
        <el-form
          ref="baseForm"
          :model="formInline"
          :rules="formRules"
          class="demo-form-inline"
          label-width="150px"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="商户名称:" prop="storeName">
                <el-input
                  v-model="formInline.storeName"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商户简称:" prop="storeShortName">
                <el-input
                  v-model="formInline.storeShortName"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="归属地市:" prop="areaCode">
                <area-cascader v-model="formInline.areaCode" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="业务联系人电话:" prop="linkPhone">
                <el-input
                  v-model="formInline.linkPhone"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="业务联系人:" prop="linkName">
                <el-input
                  v-model="formInline.linkName"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="财务主管联系电话:" prop="bsManagePhone">
                <el-input
                  v-model="formInline.bsManagePhone"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="财务主管:" prop="bsManageName">
                <el-input
                  v-model="formInline.bsManageName"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司地址:" prop="storeAddress">
                <el-row>
                  <el-col :span="12">
                    <area-cascader v-model="formInline.companyAreaCode" />
                  </el-col>
                  <el-col :span="12">
                    <el-input
                      v-model="formInline.storeAddress"
                      placeholder="请输入"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" v-loading="loading">
              提交
            </el-button>
            <el-button class="ml20" @click="back"> 返回 </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { phoneNumber } from "@/utils/validate";
import { storeManageChlidAdd } from "@/api/merchant.js";

export default {
  data() {
    return {
      loading: false,
      storeTypeP: [],
      storeTypeC: [],
      formInline: {
        companyAreaCode: ["360000", "360100"],
        areaCode: ["360000", "360100"],
      },
      formRules: {
        storeName: [
          { required: true, message: "请输入商户名称", trigger: "blur" },
        ],
        storeShortName: [
          { required: true, message: "请输入商户简称", trigger: "blur" },
        ],
        areaCode: [
          { required: true, message: "请选择归属地市", trigger: "change" },
        ],
        fcManagerName: [
          { required: true, message: "请输入财务主管姓名", trigger: "blur" },
        ],
        fcManagerPhone: [
          {
            required: true,
            message: "请输入财务主管联系电话",
            trigger: "blur",
          },
          {
            validator: phoneNumber,
          },
        ],
        linkPhone: [
          {
            required: true,
            message: "请输入业务联系人电话",
            trigger: "blur",
          },
          {
            validator: phoneNumber,
          },
        ],
        linkName: [
          { required: true, message: "请输入业务联系人姓名", trigger: "blur" },
        ],
        storeAddress: [
          { required: true, message: "请输入公司地址", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
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
    back() {
      this.$router.push({
        name: "MerchantListDetailsIndex",
      });
    },
    saveData() {
      let { companyAreaCode = [], areaCode = [], ...other } = this.formInline;
      let data = {
        ...other,
        companyAreaCode: companyAreaCode.length
          ? companyAreaCode[companyAreaCode.length - 1]
          : "",
        areaCode: areaCode.length ? areaCode[areaCode.length - 1] : "",
        pStoreId: this.$route.params.id,
      };
      storeManageChlidAdd({
        data,
      }).then(() => {
        this.$message.success("提交成功");
        this.back();
      });
    },
  },
};
</script>
