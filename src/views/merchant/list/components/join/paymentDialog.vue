<template>
  <div>
    <el-dialog title="提示" :visible.sync="value" :before-close="handleClose">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="支付方式ID:" label-width="90px">
          <el-input v-model="formInline.id" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="支付方式名称" label-width="100px">
          <el-input v-model="formInline.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border v-loading="tableLoading">
        <el-table-column label="选择" width="55">
          <template slot-scope="scope">
            <el-radio v-model="tableRadio" :label="scope.row"><i></i></el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="支付方式编号" />
        <el-table-column prop="name" label="支付方式名称" />
      </el-table>
      <el-pagination
        class="mt20"
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
  </div>
</template>

<script>
import { StoreGetPaymentList } from "@/api/setting/play";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formInline: {},
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
      if (this.tableRadio && this.tableRadio.id) {
        this.$emit("check", this.tableRadio);
        this.handleClose();
      } else {
        this.$message.warning("请选支付方式");
      }
    },
    getData() {
      this.tableLoading = true;
      StoreGetPaymentList({
        data: {
          type: "1",
          isValid: "1",
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
      this.submitForm = { ...this.formInline };
      this.tableRadio = {};
      this.getData();
    },
  },
};
</script>
