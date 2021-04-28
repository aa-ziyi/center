<template>
  <el-card class="box-card">
    <div slot="header" class="space-between">
      <div>
        商户编号：{{ baseData.id }}
        <span class="ml10">商户名称：{{ baseData.name }}</span>
        <span class="ml10"> 状态：{{ baseData.status | statusString }}</span>
      </div>
      <el-button type="text" plain @click="handleAddStore" icon="el-icon-plus">
        添加门店
      </el-button>
    </div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      label-width="75px"
    >
      <el-form-item label="门店编号:">
        <el-input v-model="formInline.id" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="门店名称:">
        <el-input v-model="formInline.name" placeholder="请输入"></el-input>
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
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="id" label="门店编号" />
      <el-table-column prop="name" label="门店名称" />
      <el-table-column prop="areaCodeDesc" label="所在地" />
      <el-table-column prop="status" label="审核状态">
        <template slot-scope="scope">
          {{ scope.row.status | statusStoreString }}
        </template>
      </el-table-column>
      <el-table-column label="是否生效">
        <template slot-scope="scope">
          {{ String(scope.row.status) === "1" ? "是" : "否" }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="130">
        <template slot-scope="scope">
          {{ scope.row.createTime | dateFormatter }}
        </template>
      </el-table-column>
      <el-table-column prop="createUserName" label="创建人" />
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            v-if="
              !(
                String(scope.row.status) === '3' &&
                String(scope.row.isValid) === '1'
              )
            "
            type="text"
            size="small"
            @click="handleUpdate(scope.row)"
          >
            修改
          </el-button>
          <el-button
            v-if="String(scope.row.status) === '3'"
            type="text"
            size="small"
            @click="handleChangeView(scope.row)"
            >{{
              String(scope.row.isValid) === "1" ? "冻结" : "启用"
            }}</el-button
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
  </el-card>
</template>

<script>
import { shopManageList, shopManageChangeview } from "@/api/shop";
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
    handleChangeView(row) {
      this.$confirm(
        `此操作将${
          String(row.isValid) === "1" ? "冻结" : "启用"
        }该商户，是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        shopManageChangeview({
          data: {
            id: row.id,
            status: String(row.isValid) === "1" ? "0" : "1",
          },
        }).then(() => {
          this.$message.success("操作成功");
          this.getData();
        });
      });
    },
    handleAddStore() {
      this.$router.push({
        name: "MerchantListDetailsStoreAdd",
        query: {
          type: "2", //(2商户 3 门店)
          routeName: this.$route.name,
          activeName: "second",
        },
      });
    },
    handleUpdate(row) {
      this.$router.push({
        name: "MerchantListDetailsStoreEdit",
        params: {
          storeId: row.id,
        },
        query: {
          routeName: this.$route.name,
          activeName: "second",
        },
      });
    },
    getData() {
      this.tableLoading = true;
      shopManageList({
        data: {
          page: this.curPage,
          pageSize: this.pageSize,
          storeId: this.$route.params.id,
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
