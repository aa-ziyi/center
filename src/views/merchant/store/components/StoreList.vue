<template>
  <div>
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
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="onRest" class="ml20">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="id" label="门店编号" width="80px" />
      <el-table-column prop="name" label="门店名称">
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
      <el-table-column prop="address" label="商户名称" />
      <el-table-column prop="areaCodeDesc" label="所在地" />
      <!-- <el-table-column prop="address" label="扫码付" /> -->
      <el-table-column label="是否生效">
        <template slot-scope="scope">
          {{ String(scope.row.status) === "1" ? "是" : "否" }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="审核状态">
        <template slot-scope="scope">
          {{ scope.row.status | statusStoreString }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160">
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
            class="ml20"
          >
            修改
          </el-button>
          <span v-if="String(scope.row.status) === '3'">
            <el-button
              class="ml20"
              type="text"
              size="small"
              @click="handleChangeView(scope.row)"
              >{{
                String(scope.row.isValid) === "1" ? "冻结" : "启用"
              }}</el-button
            >
          </span>
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
import { shopManageList, shopManageChangeview } from "@/api/shop";
export default {
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
        name: "MerchantStoreAudit",
        params: {
          storeId: row.id,
        },
        query: {
          type: "show",
        },
      });
    },
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
    handleUpdate(row) {
      console.log();
      this.$router.push({
        name: "MerchantStoreEdit",
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
      let { date = [], ...other } = this.formInline;
      this.submitForm = {
        startTime: date && date.length > 1 ? date[0] : "",
        endTime: date && date.length > 1 ? date[1] : "",
        ...other,
      };
      this.getData();
    },
    onRest() {
      this.formInline = {};
      this.submitForm = {};
      this.getData();
    },
  },
};
</script>
