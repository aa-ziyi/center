<template>
  <div class="audit-content">
    <MerchantsDetails :status="$route.params.status" />
    <el-button type="primary" @click="onSubmit('1')">审核通过</el-button>
    <el-button class="ml20" type="primary" @click="onSubmit('2')"
      >审核驳回</el-button
    >
    <el-button class="ml20" @click="onBack">返回</el-button>
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
    };
  },
  computed: {
    auditFormRules() {
      return {
        remark: [
          {
            required: this.auditForm.status == "2",
            message: "请输入商户名称",
            trigger: "blur",
          },
        ],
      };
    },
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
<style lang="less" scoped>
.audit-content {
  padding: 20px;
}
</style>
