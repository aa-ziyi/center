<template>
  <el-card class="box-card">
    <div slot="header" class="space-between">
      <div>
        商户名称：九江权益商户<span class="ml20"> 商户编号： 1171309</span>
      </div>
      <el-button type="primary" plain>添加账号</el-button>
    </div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      label-width="90px"
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
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="date" label="子商户编号" />
      <el-table-column prop="name" label="子商户名称" />
      <el-table-column prop="address" label="所在地" />
      <el-table-column prop="address" label="审核状态" />
      <el-table-column prop="address" label="是否生效" />
      <el-table-column prop="address" label="创建时间" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleShowClick(scope.row)"
            type="text"
            size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">修改</el-button>
          <!-- 或 -->
          <el-button type="text" size="small">下架</el-button>
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
  </el-card>
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
