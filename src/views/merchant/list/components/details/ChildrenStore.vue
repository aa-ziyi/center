<template>
  <el-card class="box-card">
    <div slot="header" class="space-between">
      <div>
        商户编号：{{ baseData.id }}
        <span class="ml10">商户名称：{{ baseData.name }}</span>
        <span class="ml10"> 状态：{{ baseData.status | statusString }}</span>
      </div>
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-circle-plus"
        @click="handleAddStore"
      >
        添加子商户
      </el-button>
    </div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      label-width="80px"
    >
      <el-form-item label="子商户编号:">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="子商户名称:">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="创建时间:">
        <el-date-picker
          v-model="formInline.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="onSubmit" class="ml20">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" v-loading="tableLoading" border>
      <el-table-column prop="storeId" label="子商户编号">
        <template slot-scope="scope">
          <div class="link-primary" @click="handleGoDetails(scope.row)">
            {{ scope.row.storeId }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="子商户名称">
        <template slot-scope="scope">
          <div class="link-primary" @click="handleGoDetails(scope.row)">
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="所在地" />
      <el-table-column prop="address" label="审核状态" />
      <el-table-column prop="address" label="是否生效" />
      <el-table-column prop="address" label="创建时间" />
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleGoDetails(scope.row)"
          >
            查看
          </el-button>
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
  </el-card>
</template>

<script>
import { getStoretList } from "@/api/merchant";
export default {
  props: {
    baseData: {
      type: Object,
      default: () => {},
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
    };
  },
  activated() {
    this.getData();
  },
  created() {
    this.getData();
  },
  methods: {
    handleGoDetails(row) {
      this.$router.push({
        name: "MerchantListDetailsChildrenStoreDetail",
        params: {
          ...this.$router.params,
          childrenId: row.storeId,
          childrenStatus: row.status,
        },
        query: {
          activeName: "second",
        },
      });
    },
    handleAddStore() {
      this.$router.push({
        name: "MerchantListDetailsChildrenStoreAdd",
        query: {
          activeName: "third",
        },
      });
    },
    getData() {
      this.tableLoading = true;
      getStoretList({
        data: {
          pStoreId: this.$route.params.id,
          type: "2",
          page: this.curPage,
          pageSize: this.pageSize,
          ...this.submitForm,
        },
      })
        .then((res) => {
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
      this.getData();
    },
  },
};
</script>
