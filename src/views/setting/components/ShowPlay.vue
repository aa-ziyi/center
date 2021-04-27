<template>
  <div v-loading="loading">
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
          <el-form-item label="支付渠道ID:" prop="id" v-if="formInline.id">
            {{ formInline.id }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付渠道名称:" prop="name">
            {{ formInline.name }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="和包支付编号:" prop="hebaoStoreId">
            {{ formInline.hebaoStoreId }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信应用ID:" prop="wechatAppId">
            {{ formInline.wechatAppId }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="和包费率:" prop="hebaoFee">
            {{ formInline.hebaoFee }}%
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信支付商户号:" prop="wechatMerId">
            {{ formInline.wechatMerId }}%
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="和包支付" prop="hebaoStatus">
            <el-radio-group v-model="formInline.hebaoStatus" disabled>
              <el-radio :label="1">支持</el-radio>
              <el-radio :label="0">不支持</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信费率:" prop="wechatPayFee">
            {{ formInline.wechatPayFee }}%
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付宝应用ID:" prop="aliAppId">
            {{ formInline.aliAppId }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信APP支付:" prop="wechatPayApp">
            <el-radio-group v-model="formInline.wechatPayApp" disabled>
              <el-radio :label="1">支持</el-radio>
              <el-radio :label="0">不支持</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付宝费率:" prop="aliPayFee">
            {{ formInline.aliPayFee }}%
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信H5支付:" prop="wechatPayH5">
            <el-radio-group v-model="formInline.wechatPayH5" disabled>
              <el-radio :label="1">支持</el-radio>
              <el-radio :label="0">不支持</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付宝APP支付:" prop="aliPayApp">
            <el-radio-group v-model="formInline.aliPayApp" disabled>
              <el-radio :label="1">支持</el-radio>
              <el-radio :label="0">不支持</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信公众号支付:" prop="wechatPayMp">
            <el-radio-group v-model="formInline.wechatPayMp" disabled>
              <el-radio :label="1">支持</el-radio>
              <el-radio :label="0">不支持</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付宝H5支付:" prop="aliPayH5">
            <el-radio-group v-model="formInline.aliPayH5" disabled>
              <el-radio :label="1">支持</el-radio>
              <el-radio :label="0">不支持</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit('1')"
          v-if="$route.query.type == 'audit'"
          >审核通过</el-button
        >
        <el-button
          class="ml20"
          type="primary"
          @click="onSubmit('2')"
          v-if="$route.query.type == 'audit'"
          >审核驳回</el-button
        >
        <el-button class="ml20" type="primary" @click="onBack">返回</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="审核" :visible.sync="dialogFormVisible">
      <el-form
        ref="audit-form"
        v-if="dialogFormVisible"
        :model="auditForm"
        :rules="auditFormRules"
      >
        <el-form-item label="输入原因" prop="remark">
          <el-input
            v-model="auditForm.remark"
            type="textarea"
            :rows="6"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleAudit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  storeGetpaymenttempinfo,
  StoreGetPaymentAduit,
} from "@/api/setting/play";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formInline: {},
      auditForm: {},
      loading: false,
      auditFormRules: {
        remark: [
          {
            required: true,
            message: "请输入原因",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getFormData();
  },
  methods: {
    handleAudit() {
      this.$refs["audit-form"].validate((valid) => {
        if (valid) {
          StoreGetPaymentAduit({
            data: {
              id: this.formInline.id,
              step: this.$route.query.step,
              ...this.auditForm,
            },
          }).then(() => {
            this.$message.success("操作成功");
            this.dialogFormVisible = false;
            this.$router.push({
              name: "SettingPlay",
              query: {
                activeName: this.$route.query.activeName,
              },
            });
          });
        }
      });
    },
    handleClose() {
      this.dialogFormVisible = false;
    },

    getFormData() {
      this.loading = true;
      storeGetpaymenttempinfo({
        data: {
          id: this.$route.params.id,
        },
      })
        .then((res) => {
          this.formInline = res.data.paymentInfo;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onSubmit(status) {
      this.auditForm = {
        status,
      };
      this.dialogFormVisible = true;
    },
    onBack() {
      this.$router.push({
        name: "SettingPlay",
        query: {
          activeName: this.$route.query.activeName,
        },
      });
    },
  },
};
</script>
