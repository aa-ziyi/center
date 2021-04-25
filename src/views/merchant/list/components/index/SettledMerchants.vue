<template>
  <div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      label-width="80px"
    >
      <el-form-item label="商户编号:">
        <el-input v-model="formInline.id" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商户名称:">
        <el-input v-model="formInline.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商户来源:" prop="createSoruce">
        <el-select v-model="formInline.createSoruce" placeholder="请选择">
          <el-option
            v-for="(option, index) in prestoreinfoData.createSrouce"
            :key="index"
            :label="option"
            :value="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在城市:">
        <area-cascader v-model="formInline.areaCode" />
      </el-form-item>
      <el-form-item label="入驻日期:">
        <el-date-picker
          v-model="formInline.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="商户状态:">
        <!-- 1待初审2待终审3终审通过4初审驳回6终审驳回 -->
        <el-checkbox-group v-model="formInline.status">
          <el-checkbox label="3">审核通过</el-checkbox>
          <el-checkbox label="11">已下架</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="onReset" class="ml20">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="storeId" label="商户编号" />
      <el-table-column prop="name" label="商户名称">
        <template slot-scope="scope">
          <div class="link-primary" @click="handleGoDetails(scope.row)">
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createSource" label="商户来源" />
      <el-table-column prop="storeLevel" label="商户级别" />
      <el-table-column prop="storeType" label="分类" />
      <el-table-column prop="fixfee" label="费率" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="status" label="审核状态" />
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <div>
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
              {{ String(scope.row.isValid) == "0" ? "上架" : "下架" }}
            </el-button>
          </div>
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
import { getStoretList, storeChangeView } from "@/api/merchant";
export default {
  props: {
    prestoreinfoData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formInline: {
        areaCode: [],
        date: [],
        status: [],
      },
      tableData: [],
      pageSize: 10,
      curPage: 1,
      totalCount: 0,
      submitForm: {},
      tableLoading: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleGoDetails(row) {
      this.$router.push({
        name: "MerchantListDetails",
        params: {
          id: row.storeId,
          status: row.status,
        },
        query: {
          activeName: "settled",
        },
      });
    },
    handleChangeView(row) {
      this.$confirm(
        `此操作将${
          String(row.isValid) === "1" ? "下架" : "上架"
        }该商户，是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        storeChangeView({
          data: {
            id: row.storeId,
            isValid: String(row.isValid) === "1" ? "0" : "1",
          },
        }).then(() => {
          this.$message.success("操作成功");
          this.getData();
        });
      });
    },
    handleUpdate(row) {
      this.$router.push({
        name: "MerchantListUpdate",
        params: {
          id: row.storeId,
          status: row.status,
        },
        query: {
          activeName: "settled",
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
      let { areaCode = [], date = [], status = [], ...other } = this.formInline;
      this.submitForm = {
        areaCode: areaCode.length ? areaCode[areaCode.length - 1] : "",
        startTime: date.length ? date[0] : "",
        endTime: date.length ? date[1] : "",
        status: status.length ? status.join(",") : "",
        ...other,
      };
      this.getData();
    },
    onReset() {
      this.formInline = {
        areaCode: [],
        date: [],
        status: [],
      };
      this.submitForm = {};
      this.getData();
    },
  },
};
</script>
