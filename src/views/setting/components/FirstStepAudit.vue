<template>
  <div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      label-width="80px"
    >
      <el-form-item label="支付方式:">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="onSubmit" class="ml20">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="date" label="支付渠道ID" />
      <el-table-column prop="name" label="支付渠道名称" />
      <el-table-column prop="address" label="费率（%）" />
      <el-table-column prop="address" label="是否有效" />
      <el-table-column prop="address" label="审核状态" />
      <el-table-column prop="address" label="创建时间" />
      <el-table-column prop="address" label="创建人" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleShowClick(scope.row)"
            type="text"
            size="small"
            >审核</el-button
          >
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
      tableData: [],
    };
  },
};
</script>
