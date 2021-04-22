<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="index" label="序号" />
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
    {{ formInline }}
    <el-form
      ref="baseForm"
      :model="formInline"
      :rules="formRules"
      class="demo-form-inline"
      label-width="150px"
    >
      <el-form-item label="支付方式:" prop="capitalTypeList">
        <el-checkbox-group v-model="formInline.capitalTypeList">
          <el-checkbox label="capitalType1">现金</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="费率:" prop="feemothod">
        <el-input
          v-model="formInline.feemothod"
          placeholder="请输入"
          style="width: 40%"
        ></el-input>
        （单位：%）
      </el-form-item>
      <el-form-item label="计费起始金额:" prop="beganamount">
        <el-input
          v-model="formInline.beganamount"
          placeholder="请输入"
          style="width: 40%"
        ></el-input>
        （单位：元）
      </el-form-item>
      <el-form-item label="最低收费金额:" prop="minfeeamount">
        <el-input
          v-model="formInline.minfeeamount"
          placeholder="请输入"
          style="width: 40%"
        ></el-input>
        （单位：元）
      </el-form-item>
      <el-form-item label="生效日期:" prop="effortdate">
        <el-date-picker
          v-model="formInline.effortdate"
          type="datetime"
          placeholder="选择生效日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="失效日期:" prop="expirydate">
        <el-date-picker
          v-model="formInline.expirydate"
          type="datetime"
          placeholder="选择失效日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存费率</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { scrollTo } from "@/utils/scroll-to.js";
import { validateSingleBit } from "@/utils/validate";
export default {
  data() {
    return {
      formInline: {
        capitalTypeList: [],
      },
      formRules: {
        capitalTypeList: [
          { required: true, message: "请选择支付方式", trigger: "change" },
        ],
        feemothod: [
          {
            validator: validateSingleBit,
          },
        ],
        beganamount: [
          { required: true, message: "请输入计费起始金额", trigger: "blur" },
          {
            validator: validateSingleBit,
          },
        ],
        minfeeamount: [
          { required: true, message: "请输入最低收费金额", trigger: "blur" },
          {
            validator: validateSingleBit,
          },
        ],
        effortdate: [
          { required: true, message: "请输入生效日期", trigger: "blur" },
        ],
        expirydate: [
          { required: true, message: "请输入失效日期", trigger: "blur" },
        ],
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
          this.$emit("next", this.formInline);
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
