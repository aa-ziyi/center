<template>
  <div>
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
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="id" label="支付渠道ID" width="80px" />
      <el-table-column prop="name" label="支付渠道名称">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleGoDetails(scope.row)"
          >
            {{ scope.row.name }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否有效">
        <template slot-scope="scope">
          {{ String(scope.row.isValid) == "0" ? "否" : "是" }}
        </template>
      </el-table-column>
      <el-table-column prop="createUserName" label="审核状态">
        <template slot-scope="scope">
          <div>{{ scope.row.status | statusPlayString }}<br /></div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="130">
        <template slot-scope="scope">
          {{ scope.row.createTime | dateFormatter }}
        </template>
      </el-table-column>
      <el-table-column prop="createUserName" label="创建人" />
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleAudit(scope.row, 'audit')"
            >审核</el-button
          >
        </template>
      </el-table-column>
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
  </div>
</template>

<script>
import { StoreGetPaymentList } from "@/api/setting/play";
export default {
  data() {
    return {
      formInline: {},
      tableData: [],
      pageSize: 10,
      curPage: 1,
      totalCount: 0,
      submitForm: {},
    };
  },
  activated() {
    this.getData();
  },
  created() {
    this.getData();
  },
  methods: {
    handleAudit(row, type) {
      this.$router.push({
        name: "SettingPlayShow",
        params: {
          id: row.id,
        },
        query: {
          type,
          step: "1",
        },
      });
    },
    handleGoDetails(row) {
      this.$router.push({
        name: "SettingPlayShow",
        params: {
          id: row.id,
        },
        query: {
          type: "show",
        },
      });
    },
    getData() {
      StoreGetPaymentList({
        data: {
          type: "2",
          status: "1",
          page: this.curPage,
          pageSize: this.pageSize,
          ...this.submitForm,
        },
      }).then((res) => {
        console.log("res", res);
        let { list, curPage, pageSize, totalCount } = res.data;
        this.tableData = list;
        this.pageSize = pageSize;
        this.curPage = curPage;
        this.totalCount = totalCount;
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
      this.getData();
    },
  },
};
</script>
