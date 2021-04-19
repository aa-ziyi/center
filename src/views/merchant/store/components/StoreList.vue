<template>
  <div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      label-width="75px"
    >
      <el-form-item label="门店编号:">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="门店名称:">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商户名称:">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="所属地市:">
        <area-cascader v-model="formInline.citys" />
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
      <el-table-column prop="date" label="门店编号" />
      <el-table-column prop="name" label="门店名称" />
      <el-table-column prop="address" label="商户名称" />
      <el-table-column prop="address" label="所在地" />
      <el-table-column prop="address" label="扫码付" />
      <el-table-column prop="address" label="创建时间" />
      <el-table-column prop="address" label="审核状态" />
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            @click="handleShowClick(scope.row)"
            type="text"
            size="small"
            >修改</el-button
          >
          <el-button type="text" size="small">账号管理</el-button>
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
export default {
  data() {
    return {
      formInline: {},
      tableData: [
        {
          id: 1,
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
  created() {},
  methods: {
    handleShowClick(row) {
      this.$router.push({
        name: "MerchantStoreEdit",
        params: {
          id: row.id,
        },
      });
    },
  },
};
</script>
