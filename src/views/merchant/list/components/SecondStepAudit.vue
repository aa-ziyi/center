<template>
  <div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      label-width="90px"
    >
      <el-form-item label="商户编号:">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商户名称:">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="是否新商户:">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商户分类:">
        <el-select v-model="formInline.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商户级别:">
        <el-select v-model="formInline.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在城市:">
        <area-cascader v-model="formInline.citys" />
      </el-form-item>
      <el-form-item label="申请日期:">
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
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleShowClick(scope.row)"
            type="text"
            size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">审核</el-button>
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
        name: "MerchantListDetails",
        params: {
          id: row.id,
        },
      });
    },
  },
};
</script>
