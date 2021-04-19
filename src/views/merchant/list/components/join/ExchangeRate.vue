<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="date" label="费率类型" />
      <el-table-column prop="name" label="费率（%）" />
      <el-table-column prop="address" label="生效日期" />
      <el-table-column prop="address" label="失效日期" />
      <el-table-column prop="address" label="计费起始金额（元）" />
      <el-table-column prop="address" label="最低收费金额（元）" />
      <el-table-column prop="address" label="最高收费金额（元）" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form
      ref="baseForm"
      :model="formInline"
      :rules="formRules"
      class="demo-form-inline"
      label-width="150px"
    >
      <el-form-item label="支付方式:">
        <el-checkbox-group v-model="formInline.checkList">
          <el-checkbox label="现金"></el-checkbox>
          <el-checkbox label="电子卷"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="费率有效期:" prop="name">
        <el-input
          v-model="formInline.name"
          placeholder="请输入"
          style="width: 40%"
        ></el-input>
      </el-form-item>
      <el-form-item label="费率:" prop="name">
        <el-input
          v-model="formInline.name"
          placeholder="请输入"
          style="width: 40%"
        ></el-input>
        （单位：%）
      </el-form-item>
      <el-form-item label="计费起始金额:" prop="name">
        <el-input
          v-model="formInline.name"
          placeholder="请输入"
          style="width: 40%"
        ></el-input>
        （单位：元）
      </el-form-item>
      <el-form-item label="最低收费金额:" prop="name">
        <el-input
          v-model="formInline.name"
          placeholder="请输入"
          style="width: 40%"
        ></el-input>
        （单位：元）
      </el-form-item>
      <el-form-item label="最低收费金额:" prop="name">
        <el-input
          v-model="formInline.name"
          placeholder="请输入"
          style="width: 40%"
        ></el-input>
        （单位：元）
      </el-form-item>
      <el-form-item label="生效日期:" prop="name">
        <el-input
          v-model="formInline.name"
          placeholder="请输入"
          style="width: 40%"
        ></el-input>
      </el-form-item>
      <el-form-item label="失效日期:" prop="name">
        <el-input
          v-model="formInline.name"
          placeholder="请输入"
          style="width: 40%"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存费率</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { scrollTo } from "@/utils/scroll-to.js";
export default {
  data() {
    return {
      formInline: {
        checkList: [],
      },
      formRules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      },
      tableData: [],
    };
  },
  created() {},
  methods: {
    onSubmit() {
      this.$refs["baseForm"].validate((valid) => {
        if (valid) {
          console.log("valid");
          this.$emit("next");
        } else {
          this.$nextTick(() => {
            var isError = document.getElementsByClassName("is-error");
            if (isError && isError.length) {
              scrollTo(isError[0].offsetTop - 130, 500);
            }
          });
          return false;
        }
      });
    },
    onReset() {},
  },
};
</script>
