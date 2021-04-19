<template>
  <div>
    <el-form
      ref="baseForm"
      :model="formInline"
      :rules="formRules"
      label-width="150px"
    >
      <el-form-item label="协议签订日期:">
        <el-date-picker
          v-model="formInline.value1"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker
      ></el-form-item>
      <el-form-item label="协议截止日期:" prop="name">
        <el-date-picker
          v-model="formInline.value1"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="生效日期:" prop="name">
        <el-date-picker
          v-model="formInline.value1"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="上传决策纪要:" prop="name">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          accept
        >
          <el-button size="small">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            支持扩展名：.rar .zip .doc .docx .pdf .jpg..
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传签署协议:" prop="name">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          accept
        >
          <el-button size="small">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            支持扩展名：.rar .zip .doc .docx .pdf .jpg...
          </div>
        </el-upload>
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
        name: [
          { required: true, message: "请输入活动名称", trigger: "change" },
        ],
      },
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
