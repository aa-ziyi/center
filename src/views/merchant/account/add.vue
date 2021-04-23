<template>
  <div>
    <page-header title="添加商户账号"></page-header>
    <el-card class="add-store-card">
      <div slot="header" class="space-between">
        <div>添加商户账号</div>
      </div>
      {{ formInline }}
      <el-form
        ref="baseForm"
        :model="formInline"
        :rules="formRules"
        class="demo-form-inline"
        label-width="150px"
      >
        <el-form-item label="账号:" prop="code">
          <el-input
            v-model="formInline.code"
            placeholder="请输入"
            v-if="!$route.params.accountId"
          />
          <div v-else>
            {{ formInline.code }}
          </div>
        </el-form-item>
        <el-form-item label="昵称:" prop="name">
          <el-input v-model="formInline.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码:"
          v-if="!$route.params.accountId"
        >
          <el-input
            type="password"
            v-model="formInline.password"
            placeholder="6-16位密码，区分大小写"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="cofpassword"
          label="确认密码:"
          v-if="!$route.params.accountId"
        >
          <el-input
            v-model="formInline.cofpassword"
            type="password"
            placeholder="确认密码"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="phone" label="手机号:">
          <el-input v-model="formInline.phone" placeholder="11位手机号" />
        </el-form-item>
        <el-form-item prop="mail" label="注册邮箱:">
          <el-input v-model="formInline.mail" placeholder="注册邮箱" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" v-loading="loading"
            >提交</el-button
          >
          <el-button class="ml20" @click="back"> 返回 </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import {
  validateEmail,
  phoneNumber,
  validateCode,
  validatePassword,
} from "@/utils/validate";
import {
  storeAccountAdd,
  storeAcountView,
  storeAcountEdit,
} from "@/api/merchant";
import { mainCheckname } from "@/api/login";
import JSEncrypt from "jsencrypt";
let publicKey =
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjRy8pwFscUzeE9gMkoB39zxvifIKXcXIaQxvxy9KQDYQS8nKgyFyRrdFvxbDyKBZ41d1AqcY2heCJ7SGVKJKfsF97wQ8oPvnRmwBjQ1COGlXvjbjrRHzVMjRbPxXiHc6OP7VMGxm++hEEIBe8sjrMuVQFoDABNfFH5OjEgj0WfunyyP2sLuQIkwKvkOI9/We7X+eLlcACGIHH4ewqwFmyxmozcl850cYgBTWXPFpWyxDI7gTETxb6S+QRuwgy4cE5iHM9MTNqTXfJB1cIe8UlnwJkWo1Dhf5cyPyYxv0tLA4QARefbdPvmsmE237j5FzcoEh+UkpOrUTzCBiWf+PXQIDAQAB";
let jse = new JSEncrypt();
jse.setPublicKey(publicKey);
export default {
  data() {
    let checkCode = async (rule, value, callback) => {
      if (this.$route.params.accountId) {
        callback();
        return;
      }
      let res = await mainCheckname({
        data: {
          code: value,
        },
      });
      if (res && res.ret == "0") {
        callback();
      } else {
        callback(new Error("code已存在"));
      }
    };
    let validateCofPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formInline.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      formInline: {},
      formRules: {
        code: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: checkCode, trigger: "blur" },
          { validator: validateCode, trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator: validatePassword,
            trigger: "blur",
          },
        ],
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        cofpassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {
            validator: validateCofPassword,
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: phoneNumber,
          },
        ],
        mail: [
          {
            validator: validateEmail,
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    if (this.$route.params.accountId) {
      this.getData(this.$route.params.accountId);
    }
  },
  methods: {
    getData(id) {
      this.loading = true;
      storeAcountView({
        data: {
          id,
        },
      })
        .then((res) => {
          this.formInline = res.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onSubmit() {
      this.$refs["baseForm"].validate((valid) => {
        console.log(valid);
        if (valid) {
          this.saveData();
        }
      });
    },
    back() {
      this.$router.push({
        name: this.$route.query.routeName,
        params: this.$route.params,
        query: {
          activeName: this.$route.query.activeName,
        },
      });
    },
    saveData() {
      let { accountId } = this.$route.params;
      let {
        cofpassword,
        password,
        name,
        code,
        phone,
        mail,
        id,
      } = this.formInline;
      code = jse.encrypt(code);
      password = jse.encrypt(password);
      this.loading = true;
      let method = accountId ? storeAcountEdit : storeAccountAdd;
      method({
        data: accountId
          ? {
              id,
              name,
              phone,
              mail,
            }
          : {
              code,
              name,
              password,
              phone,
              mail,
              type: this.$route.query.type,
              storeId: this.$route.params.id,
            },
      })
        .then(() => {
          this.$message.success("添加成功");
          this.$router.push({
            name: this.$route.query.routeName,
            params: this.$route.params,
            query: {
              activeName: this.$route.query.activeName,
            },
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="less" scoped>
.add-store-card {
  margin: 20px;
}
</style>
