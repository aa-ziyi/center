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
        <el-button @click="handleClickFile('file1')" type="medium">
          {{
            formInline.decision && formInline.decision.length
              ? "重新选择"
              : "选择文件"
          }}
        </el-button>
        <div>
          {{
            formInline.decision && formInline.decision.length
              ? formInline.decision[0].name || formInline.decision[0].fileName
              : ""
          }}
        </div>
        <input
          type="file"
          :accept="accept"
          @change="($event) => uploadImg($event, 'decision')"
          ref="file1"
          style="display: none"
        />
        <div class="el-form-tip">
          支持扩展名：.rar .zip .doc .docx .pdf .jpg..
        </div>
      </el-form-item>
      <el-form-item label="上传签署协议:" prop="contract">
        <el-button @click="handleClickFile('file2')" type="medium">
          {{
            formInline.contract && formInline.contract.length
              ? "重新选择"
              : "选择文件"
          }}
        </el-button>
        <div>
          {{
            formInline.contract && formInline.contract.length
              ? formInline.contract[0].name
              : ""
          }}
        </div>
        <input
          type="file"
          :accept="accept"
          @change="($event) => uploadImg($event, 'contract')"
          ref="file2"
          style="display: none"
        />
        <div class="el-form-tip">
          支持扩展名：.rar .zip .doc .docx .pdf .jpg..
        </div>
      </el-form-item>
      <el-form-item label="商户签署协议:" prop="storedecision">
        <el-button @click="handleClickFile('file3')" type="medium">
          {{
            formInline.contract && formInline.contract.length
              ? "重新选择"
              : "选择文件"
          }}
        </el-button>
        <div>
          {{
            formInline.storedecision && formInline.storedecision.length
              ? formInline.storedecision[0].name
              : ""
          }}
        </div>
        <input
          type="file"
          :accept="accept"
          @change="($event) => uploadImg($event, 'storedecision')"
          ref="file3"
          style="display: none"
        />
        <div class="el-form-tip">
          支持扩展名：.rar .zip .doc .docx .pdf .jpg..
        </div>
      </el-form-item>
      <el-form-item label="移动签署协议:" prop="chinamdecision">
        <el-button @click="handleClickFile('file4')" type="medium">
          {{
            formInline.chinamdecision && formInline.chinamdecision.length
              ? "重新选择"
              : "选择文件"
          }}
        </el-button>
        <div>
          {{
            formInline.chinamdecision && formInline.chinamdecision.length
              ? formInline.chinamdecision[0].name
              : ""
          }}
        </div>
        <input
          type="file"
          :accept="accept"
          @change="($event) => uploadImg($event, 'chinamdecision')"
          ref="file4"
          style="display: none"
        />
        <div class="el-form-tip">
          支持扩展名：.rar .zip .doc .docx .pdf .jpg..
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-if="!isSign">上一项</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { scrollTo } from "@/utils/scroll-to.js";
export default {
  props: {
    isSign: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      // .rar .zip .doc .docx .pdf .jpg..
      accept:
        "application/x-rar-compressed,application/zip,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/png,image/jpeg,image/jpg",
      formInline: {},
      formRules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "change" },
        ],
      },
    };
  },
  watch: {
    editData(newData) {
      this.initBaseData(newData);
    },
  },
  created() {},
  methods: {
    handleClickFile(file) {
      this.$refs[file].click(); //上传文件
    },
    uploadImg($event, fileName) {
      let file = $event.target.files;
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
    initBaseData(data) {
      let {
        contractSignTime,
        decision,
        contract,
        storedecision,
        chinamdecision,
      } = data.storeInfo;
      this.formInline = {
        contractSignTime,
        decision: decision && decision.id ? [decision] : [],
        contract: contract && contract.id ? [contract] : [],
        storedecision: storedecision && storedecision.id ? [storedecision] : [],
        chinamdecision:
          chinamdecision && chinamdecision.id ? [chinamdecision] : [],
      };
    },
  },
};
</script>
