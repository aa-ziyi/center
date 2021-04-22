<template>
  <div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      label-width="80px"
    >
      <el-form-item label="商户编号:">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商户名称:">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商户来源:">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="所在城市:">
        <area-cascader v-model="formInline.citys" />
      </el-form-item>
      <el-form-item label="商户状态:">
        <el-select v-model="formInline.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入驻日期:">
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
      <el-table-column prop="date" label="商户编号" />
      <el-table-column prop="name" label="商户名称" />
      <el-table-column prop="address" label="商户来源" />
      <el-table-column prop="address" label="商户级别" />
      <el-table-column prop="address" label="分类" />
      <el-table-column prop="address" label="费率" />
      <el-table-column prop="address" label="创建时间" />
      <el-table-column prop="address" label="审核状态" />
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <div v-if="String(scope.row.updateStatus) == '1'">
            <el-button type="text" size="small" @click="handleShow(scope.row)">
              查看
            </el-button>
          </div>
          <div v-else>
            <el-button
              type="text"
              size="small"
              @click="handleUpdate(scope.row)"
            >
              修改
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handleChangeView(scope.row)"
            >
              {{
                String(scope.row.isValid) == "0" ? "启用" : "停用"
              }}</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt20"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getStoretList } from "@/api/merchant";
export default {
  data() {
    return {
      formInline: {
        citys: [],
      },
      tableData: [
        {
          date: "7991171313",
          name: "萍乡权益商户",
          address: "萍乡大商户",
        },
        {
          date: "7991171313",
          name: "萍乡权益商户",
          address: "萍乡大商户",
        },
        {
          date: "7991171313",
          name: "萍乡权益商户",
          address: "萍乡大商户",
        },
        {
          date: "7991171313",
          name: "萍乡权益商户",
          address: "萍乡大商户",
        },
        {
          date: "7991171313",
          name: "萍乡权益商户",
          address: "萍乡大商户",
        },
        {
          date: "7991171313",
          name: "萍乡权益商户",
          address: "萍乡大商户",
        },
      ],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleShow(row) {
      this.$router.push({
        name: "SettingPlayShow",
        params: {
          id: row.id,
        },
        query: {
          type: "show",
          activeName: "first",
        },
      });
    },
    handleChangeView(row) {
      // StoreGetPaymentChangeview({
      //   data: {
      //     id: row.id,
      //     isValid: String(row.isValid) === "1" ? "0" : "1",
      //   },
      // }).then(() => {
      //   this.$message.success("操作成功");
      //   this.getData();
      // });
    },
    handleUpdate(row) {
      this.$router.push({
        name: "SettingPlayUpdate",
        params: {
          id: row.id,
        },
        query: {
          status: row.status,
          activeName: "first",
        },
      });
    },
    getData() {
      this.tableLoading = true;
      getStoretList({
        data: {
          type: "1",
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
