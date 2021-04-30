<template>
  <div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      label-width="90px"
    >
      <el-form-item label="商户编号:">
        <el-input v-model="formInline.id" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商户名称:">
        <el-input v-model="formInline.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="是否新商户:">
        <el-select
          v-model="formInline.updateStatus"
          placeholder="请选择"
          clearable
        >
          <el-option label="是" value="0"></el-option>
          <el-option label="否" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商户分类:" prop="storeType">
        <el-col :span="12">
          <el-select
            v-model="formInline.storePtype"
            placeholder="一级分类"
            clearable
            @change="storeTypePChange"
          >
            <el-option
              v-for="(option, index) in storeTypeP"
              :key="index"
              :label="option.name"
              :value="option.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select
            v-model="formInline.storeType"
            placeholder="二级分类"
            clearable
          >
            <el-option
              v-for="(option, index) in storeTypeC"
              :key="index"
              :label="option.name"
              :value="option.id"
            ></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="商户级别:" prop="storeLevel">
        <el-select
          v-model="formInline.storeLevel"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="(option, index) in prestoreinfoData.storeLevelMap"
            :key="index"
            :label="option[Object.keys(option)[0]]"
            :value="Object.keys(option)[0]"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在城市:">
        <area-cascader v-model="formInline.areaCode" />
      </el-form-item>
      <el-form-item label="申请日期:">
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
        <el-button @click="onReset" class="ml20">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="storeId" label="商户编号" />
      <el-table-column prop="name" label="商户名称">
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
      <el-table-column prop="createSource" label="商户来源" />
      <el-table-column prop="storeLevel" label="商户级别" />
      <el-table-column prop="storeType" label="分类" />
      <el-table-column prop="fixfee" label="费率" />
      <el-table-column prop="createTime" label="创建时间" min-width="130">
        <template slot-scope="scope">
          {{ scope.row.createTime | dateFormatter }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="审核状态">
        <template slot-scope="scope">
          {{ scope.row.status | statusString }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row)" type="text" size="small"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="handleAudit(scope.row)"
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
import { getStoretList, getStoretype } from "@/api/merchant";
export default {
  props: {
    prestoreinfoData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      storeTypeP: [],
      storeTypeC: [],
      formInline: {
        areaCode: [],
        date: [],
      },
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
    getStoretype({
      data: {
        pId: 0,
        type: 1,
      },
    }).then((res) => {
      this.storeTypeP = res.data;
    });
  },
  methods: {
    storeTypePChange(value) {
      this.storeTypeC = [];
      this.$set(this.formInline, "storeType", "");
      if (!value) {
        return;
      }
      getStoretype({
        data: {
          pId: value,
          type: 1,
        },
      }).then((res) => {
        this.storeTypeC = res.data;
      });
    },
    handleGoDetails(row) {
      this.$router.push({
        name: "MerchantListDetails",
        params: {
          id: row.storeId,
          status: row.status,
        },
        query: {
          activeName: "merchantOneStep",
        },
      });
    },
    handleAudit(row) {
      this.$router.push({
        name: "MerchantListAudit",
        params: {
          id: row.storeId,
          status: row.status,
        },
        query: {
          activeName: "merchantOneStep",
          step: "1",
        },
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
          activeName: "merchantOneStep",
        },
      });
    },
    getData() {
      this.tableLoading = true;
      getStoretList({
        data: {
          type: "2",
          status: "1",
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
      let { areaCode = [], date = [], ...other } = this.formInline;
      this.submitForm = {
        areaCode:
          areaCode && areaCode.length ? areaCode[areaCode.length - 1] : "",
        startTime: date && date.length ? date[0] : "",
        endTime: date && date.length ? date[1] : "",
        ...other,
      };
      this.getData();
    },
    onReset() {
      this.formInline = {
        areaCode: [],
        date: [],
      };
      this.submitForm = {};
      this.getData();
    },
  },
};
</script>
