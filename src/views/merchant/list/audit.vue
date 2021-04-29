<template>
  <div>
    <page-header title="商户审核"> </page-header>
    <el-tabs value="first" class="details-el-tabs">
      <el-tab-pane label="商户审核" name="first">
        <MerchantsDetails :status="$route.params.status" />
        <div class="text-center mt20 mb20">
          <el-button type="primary" @click="onSubmit('1')">审核通过</el-button>
          <el-button class="ml20" type="primary" @click="onSubmit('2')"
            >审核驳回</el-button
          >
          <el-button class="ml20" @click="onBack">返回</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
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
import MerchantsDetails from "./components/MerchantsDetails";
import { storeAduit } from "@/api/merchant.js";
export default {
  components: {
    MerchantsDetails,
  },
  data() {
    return {
      dialogFormVisible: false,
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
  methods: {
    handleAudit() {
      this.$refs["audit-form"].validate((valid) => {
        if (valid) {
          storeAduit({
            data: {
              storeId: this.$route.params.id,
              step: this.$route.query.step,
              ...this.auditForm,
            },
          }).then(() => {
            this.$message.success("操作成功");
            this.dialogFormVisible = false;
            this.$router.push({
              name: "MerchantListIndex",
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
    onSubmit(status) {
      this.auditForm = {
        status,
      };
      this.dialogFormVisible = true;
    },
    onBack() {
      this.$router.push({
        name: "MerchantListIndex",
        query: {
          activeName: this.$route.query.activeName,
        },
      });
    },
  },
};
</script>
