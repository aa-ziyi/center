<template>
  <div>
    <el-form
      ref="baseForm"
      :model="formInline"
      :rules="formRules"
      label-width="150px"
    >
      <el-form-item label="协议签订日期:" prop="contractSignTime">
        <el-date-picker
          v-model="formInline.contractSignTime"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker
      ></el-form-item>
      <el-form-item label="上传决策纪要:" prop="decision">
        <el-button @click="handleClickFile('file1')">上传文件</el-button>
        {{ formInline.file1 }}
        <input
          type="file"
          accept="image/png,image/jpeg,image/gif,image/jpg"
          @change="($event) => uploadImg($event, 'decision')"
          ref="file1"
          style="display: none"
        />
        <div class="el-upload__tip">
          支持扩展名：.rar .zip .doc .docx .pdf .jpg..
        </div>
      </el-form-item>
      <el-form-item label="上传签署协议:" prop="contract">
        <el-button @click="handleClickFile('file2')">上传文件</el-button>
        {{ formInline.file2 }}
        <input
          type="file"
          accept="image/png,image/jpeg,image/gif,image/jpg"
          @change="($event) => uploadImg($event, 'contract')"
          ref="file2"
          style="display: none"
        />
        <div class="el-upload__tip">
          支持扩展名：.rar .zip .doc .docx .pdf .jpg..
        </div>
      </el-form-item>
      <el-form-item label="商户签署协议:" prop="storedecision">
        <el-button @click="handleClickFile('file3')">上传文件</el-button>
        {{ formInline.file3 }}
        <input
          type="file"
          accept="image/png,image/jpeg,image/gif,image/jpg"
          @change="($event) => uploadImg($event, 'storedecision')"
          ref="file3"
          style="display: none"
        />
        <div class="el-upload__tip">
          支持扩展名：.rar .zip .doc .docx .pdf .jpg..
        </div>
      </el-form-item>
      <el-form-item label="移动签署协议:" prop="chinamdecision">
        <el-button @click="handleClickFile('file4')">上传文件</el-button>
        {{ formInline.file4 }}
        <input
          type="file"
          accept="image/png,image/jpeg,image/gif,image/jpg"
          @change="($event) => uploadImg($event, 'chinamdecision')"
          ref="file3"
          style="display: none"
        />
        <div class="el-upload__tip">
          支持扩展名：.rar .zip .doc .docx .pdf .jpg..
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">上一项</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button type="primary" @click="onSubmit">存为草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { scrollTo } from "@/utils/scroll-to.js";
export default {
  data() {
    return {
      formInline: {},
      formRules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "change" },
        ],
      },
    };
  },
  created() {},
  methods: {
    handleClickFile(file) {
      this.$refs[file].click(); //上传文件
    },
    uploadImg($event, fileName) {
      let file = $event.target.files;
      console.log("file", file);
      this.$set(this.formInline, fileName, file);
    },
    onSubmit() {
      this.$refs["baseForm"].validate((valid) => {
        if (valid) {
          console.log("valid", this.formInline);
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
