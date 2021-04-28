<template>
  <el-dialog
    title="提示"
    :visible.sync="value"
    :before-close="handleClose"
    width="80%"
    top="20px"
  >
    <el-form :inline="true" :model="formInline">
      <el-form-item label="银行名称">
        <el-input v-model="formInline.bankName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="省市区:">
        <area-cascader v-model="formInline.regionCode" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="table-content">
      <el-table :data="tableData" border v-loading="tableLoading">
        <el-table-column label="选择" width="55">
          <template slot-scope="scope">
            <el-radio v-model="tableRadio" :label="scope.row"><i></i></el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="opBankName" label="开户银行名称" />
        <el-table-column prop="opBankCode" label="开户银行联号" />
      </el-table>
    </div>
    <el-pagination
      class="mt10"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="curPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    >
    </el-pagination>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { storeBanklist } from "@/api/setting/play";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formInline: { regionCode: ["360000", "360100"] },
      tableData: [],
      pageSize: 10,
      curPage: 1,
      totalCount: 0,
      submitForm: {},
      tableLoading: false,
      tableRadio: {},
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleClose() {
      this.$emit("input", false);
    },
    handleOk() {
      if (this.tableRadio && this.tableRadio.opBankCode) {
        this.$emit("check", this.tableRadio);
        this.handleClose();
      } else {
        this.$message.warning("请选支付方式");
      }
    },
    getData() {
      this.tableLoading = true;
      storeBanklist({
        data: {
          page: this.curPage,
          pageSize: this.pageSize,
          ...this.submitForm,
        },
      })
        .then((res) => {
          console.log("res", res);
          let { list, curPage, pageSize, totalCount } = res.data;
          this.tableData = list;
          this.pageSize = pageSize;
          this.curPage = curPage;
          this.totalCount = totalCount;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    handleSizeChange(value) {
      this.pageSize = value;
      this.getData();
    },
    handleCurrentChange(value) {
      this.curPage = value;
      this.getData();
    },
    onSubmit() {
      this.submitForm = {
        ...this.formInline,
        regionCode: this.formInline.regionCode.join(","),
      };
      this.tableRadio = {};
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.table-content {
  max-height: 50vh;
  overflow: scroll;
}
</style>
