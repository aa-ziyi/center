<template>
  <div>
    <el-form
      ref="baseForm"
      :model="formInline"
      :rules="formRules"
      label-width="150px"
    >
      <div v-if="sgin.type == 'yiDongSign'">
        <el-form-item label="协议签订日期:">
          <el-date-picker
            v-model="formInline.contractSignTime"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :disabled="sgin.type == 'signAudit'"
          >
          </el-date-picker>
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
            <a
              class="link-primary"
              v-if="
                formInline.chinamdecision &&
                formInline.chinamdecision.length &&
                formInline.chinamdecision[0].id
              "
              :download="formInline.chinamdecision[0].fileName"
              :href="$getDownFileUrl(formInline.chinamdecision[0].id)"
              target="_blank"
              >{{ formInline.chinamdecision[0].fileName }}</a
            >
            <span
              v-else-if="
                formInline.chinamdecision &&
                formInline.chinamdecision.length &&
                formInline.chinamdecision[0].name
              "
            >
              {{ formInline.chinamdecision[0].name }}
            </span>
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
        <el-form-item label="商户签署协议:" prop="storedecision">
          <a
            class="link-primary"
            v-if="formInline.storedecision && formInline.storedecision.length"
            :download="formInline.storedecision[0].fileName"
            :href="$getDownFileUrl(formInline.storedecision[0].id)"
            target="_blank"
            >{{ formInline.storedecision[0].fileName }}</a
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary">上一项</el-button>
          <el-button type="primary" @click="validateForm()">提交</el-button>
        </el-form-item>
      </div>
      <div v-else-if="sgin.type == 'storeSign'">
        <el-form-item label="协议签订日期:">
          <el-date-picker
            v-model="formInline.contractSignTime"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :disabled="sgin.type == 'signAudit'"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="移动签署协议:" prop="chinamdecision">
          <a
            class="link-primary"
            v-if="formInline.chinamdecision && formInline.chinamdecision.length"
            :download="formInline.chinamdecision[0].fileName"
            :href="$getDownFileUrl(formInline.chinamdecision[0].id)"
            target="_blank"
            >{{ formInline.chinamdecision[0].fileName }}</a
          >
        </el-form-item>
        <el-form-item label="商户签署协议:" prop="storedecision">
          <el-button @click="handleClickFile('file3')" type="medium">
            {{
              formInline.chinamdecision && formInline.chinamdecision.length
                ? "重新选择"
                : "选择文件"
            }}
          </el-button>
          <div>
            <a
              class="link-primary"
              v-if="
                formInline.storedecision &&
                formInline.storedecision.length &&
                formInline.storedecision[0].id
              "
              :download="formInline.storedecision[0].fileName"
              :href="$getDownFileUrl(formInline.storedecision[0].id)"
              target="_blank"
              >{{ formInline.storedecision[0].fileName }}</a
            >
            <span
              v-else-if="
                formInline.storedecision &&
                formInline.storedecision.length &&
                formInline.storedecision[0].name
              "
            >
              {{ formInline.storedecision[0].name }}
            </span>
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
        <el-form-item>
          <el-button type="primary">上一项</el-button>
          <el-button type="primary" @click="validateForm()">提交</el-button>
        </el-form-item>
      </div>
      <div v-else-if="sgin.type == 'signAudit'">
        <el-form-item label="协议签订日期:">
          {{ formInline.contractSignTime }}
        </el-form-item>
        <el-form-item label="移动签署协议:" prop="chinamdecision">
          <a
            class="link-primary"
            v-if="formInline.chinamdecision && formInline.chinamdecision.length"
            :download="formInline.chinamdecision[0].fileName"
            :href="$getDownFileUrl(formInline.chinamdecision[0].id)"
            target="_blank"
            >{{ formInline.chinamdecision[0].fileName }}</a
          >
        </el-form-item>
        <el-form-item label="商户签署协议:" prop="storedecision">
          <a
            class="link-primary"
            v-if="formInline.storedecision && formInline.storedecision.length"
            :download="formInline.storedecision[0].fileName"
            :href="$getDownFileUrl(formInline.storedecision[0].id)"
            target="_blank"
            >{{ formInline.storedecision[0].fileName }}</a
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleShowAudit('1')">
            确认签约
          </el-button>
          <el-button type="primary" @click="handleShowAudit('0')">
            驳回签约
          </el-button>
          <el-button type="primary" @click="back"> 返回 </el-button>
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item label="协议签订日期:" prop="contractSignTime">
          <el-date-picker
            v-model="formInline.contractSignTime"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :disabled="sgin.type == 'signAudit'"
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
                ? formInline.contract[0].name || formInline.contract[0].fileName
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
                ? formInline.storedecision[0].name ||
                  formInline.contract[0].fileName
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
                ? formInline.chinamdecision[0].name ||
                  formInline.contract[0].fileName
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
          <el-button type="primary">上一项</el-button>
          <el-button type="primary" @click="validateForm()">提交</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-dialog
      :title="`${auditForm.status == '1' ? '确认' : '驳回'}签约`"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="audit-form"
        v-if="dialogFormVisible"
        :model="auditForm"
        :rules="auditFormRules"
      >
        <el-form-item label="输入原因" prop="remark">
          <el-input
            v-model="auditForm.remark"
            type="textarea"
            :rows="6"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleAudit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { scrollTo } from "@/utils/scroll-to.js";
import { manageStoreSuresgin } from "@/api/merchant.js";
export default {
  props: {
    sgin: {
      type: Object,
      default: () => {},
    },
    editData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      auditForm: {},
      loading: false,
      // .rar .zip .doc .docx .pdf .jpg..
      accept:
        "application/x-rar-compressed,application/zip,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/png,image/jpeg,image/jpg",
      formInline: {},
      auditFormRules: {
        remark: [
          {
            required: true,
            message: "请输入原因",
            trigger: "blur",
          },
        ],
      },
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
    handleShowAudit(status) {
      this.auditForm = {
        status,
      };
      this.dialogFormVisible = true;
    },
    handleAudit() {
      this.$refs["audit-form"].validate((valid) => {
        if (valid) {
          manageStoreSuresgin({
            data: {
              id: this.$route.params.id,
              ...this.auditForm,
            },
          }).then(() => {
            this.$message.success("操作成功");
            this.dialogFormVisible = false;
            this.back();
          });
        }
      });
    },
    handleClose() {
      this.dialogFormVisible = false;
    },
    handleClickFile(file) {
      this.$refs[file].click(); //上传文件
    },
    uploadImg($event, fileName) {
      let file = $event.target.files;
      this.$set(this.formInline, fileName, file);
    },
    validateForm(callBack) {
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
        }
        if (callBack) {
          callBack(valid);
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
    back() {
      let { routeName, activeName } = this.$route.query;
      this.$router.push({
        name: routeName || "MerchantList",
        query: {
          activeName: activeName,
        },
      });
    },
  },
};
</script>
