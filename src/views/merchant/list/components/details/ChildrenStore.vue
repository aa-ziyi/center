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
      label-width="100px"
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
          :unlink-panels="false"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="onReset" class="ml20">重置</el-button>
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
      <el-table-column prop="areaCodeDesc" label="所在地" />
      <el-table-column prop="isValid" label="是否生效">
        <template slot-scope="scope">
          {{ String(scope.row.isValid) === "1" ? "是" : "否" }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="130">
        <template slot-scope="scope">
          {{ scope.row.createTime | dateFormatter }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="审核状态">
        <template slot-scope="scope">
          <div>
            <div v-if="String(scope.row.olderId) == '1'" class="color-danger">
              有变更
            </div>
            {{ scope.row.status | statusString }}
          </div>
        </template>
      </el-table-column>
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
    // 页面第一次触发activated时该组件可能还未初始化（在父组件中需等到获取商户详情后才会初始化），所以需在created也调用
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
      let { date, ...other } = this.formInline;
      this.submitForm = {
        startTime: date && date.length ? date[0] : "",
        endTime: date && date.length ? date[1] : "",
        ...other,
      };
      this.getData();
    },
    onReset() {
      this.formInline = {
        date: [],
      };
      this.submitForm = {};
      this.getData();
    },
  },
};
</script>
