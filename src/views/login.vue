<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-page-content">
        <div v-show="showLogin" class="login-form">
          <el-form
            ref="form"
            :model="formData"
            :rules="rules"
            label-position="left"
          >
            <el-form-item prop="code">
              <el-input v-model="formData.code" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="formData.password"
                type="password"
                placeholder="请输入密码"
              />
            </el-form-item>
            <el-form-item prop="smsCode">
              <el-col :span="12">
                <el-input v-model="formData.smsCode" placeholder="验证码" />
              </el-col>
              <el-col :span="12">
                <el-button
                  class="ml20"
                  :loading="loading"
                  @click="handleLoginCode"
                >
                  获取手机验证码
                </el-button>
              </el-col>
            </el-form-item>
            <el-form-item prop="verifyCode">
              <el-col :span="12">
                <el-input v-model="formData.verifyCode" placeholder="验证码" />
              </el-col>
              <el-col :span="12">
                <el-image
                  class="ml20"
                  v-loading="!verifyCodeUrl"
                  @click="handleImgClick"
                  style="height: 40px"
                  :src="verifyCodeUrl"
                />
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" type="primary" @click="onSubmit">
                登陆
              </el-button>
            </el-form-item>
            <div class="space-between">
              <el-link type="primary">忘记密码</el-link>
              <el-link type="primary" @click="handleShowRegister">
                注册账号
              </el-link>
            </div>
          </el-form>
        </div>
        <div v-show="!showLogin" class="login-form">
          <el-form
            ref="register-form"
            :model="registerFormData"
            :rules="registerFormRules"
            label-position="left"
          >
            <el-form-item prop="code">
              <el-input
                v-model="registerFormData.code"
                placeholder="请输入账号"
              />
            </el-form-item>
            <el-form-item prop="name">
              <el-input
                v-model="registerFormData.name"
                placeholder="请输入昵称"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="registerFormData.password"
                placeholder="6-16位密码，区分大小写"
              />
            </el-form-item>
            <el-form-item prop="cofpassword">
              <el-input
                v-model="registerFormData.cofpassword"
                type="password"
                placeholder="确认密码"
              />
            </el-form-item>
            <el-form-item prop="phone">
              <el-input
                v-model="registerFormData.phone"
                placeholder="11位手机号"
              />
            </el-form-item>
            <el-form-item prop="smsCode">
              <el-col :span="12">
                <el-input
                  v-model="registerFormData.smsCode"
                  placeholder="输入验证码"
                />
              </el-col>
              <el-col :span="12">
                <el-button
                  class="ml20"
                  :loading="loading"
                  @click="handleGetCode"
                >
                  获取手机验证码
                </el-button>
              </el-col>
            </el-form-item>
            <el-form-item prop="verifyCode">
              <el-col :span="12">
                <el-input
                  v-model="registerFormData.verifyCode"
                  placeholder="验证码"
                />
              </el-col>
              <el-col :span="12">
                <el-image
                  class="ml20"
                  v-loading="!verifyCodeUrl"
                  @click="handleImgClick"
                  style="height: 40px"
                  :src="verifyCodeUrl"
                />
              </el-col>
            </el-form-item>
            <el-form-item prop="mail">
              <el-input
                v-model="registerFormData.mail"
                placeholder="注册邮箱"
              />
            </el-form-item>
            <div class="space-between">
              <el-button :loading="loading" type="primary" @click="onRegister">
                注册
              </el-button>
              <el-link type="primary" @click="handleShowRegister">
                使用已有账号登陆</el-link
              >
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mainLogin,
  mainRegisty,
  getNotSendMsg,
  getNotLoginmsg,
  mainCheckname,
} from "@/api/login";
import { setToken } from "@/utils/auth";
import {
  validateEmail,
  phoneNumber,
  validateCode,
  validatePassword,
} from "@/utils/validate";
import JSEncrypt from "jsencrypt";
let publicKey =
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjRy8pwFscUzeE9gMkoB39zxvifIKXcXIaQxvxy9KQDYQS8nKgyFyRrdFvxbDyKBZ41d1AqcY2heCJ7SGVKJKfsF97wQ8oPvnRmwBjQ1COGlXvjbjrRHzVMjRbPxXiHc6OP7VMGxm++hEEIBe8sjrMuVQFoDABNfFH5OjEgj0WfunyyP2sLuQIkwKvkOI9/We7X+eLlcACGIHH4ewqwFmyxmozcl850cYgBTWXPFpWyxDI7gTETxb6S+QRuwgy4cE5iHM9MTNqTXfJB1cIe8UlnwJkWo1Dhf5cyPyYxv0tLA4QARefbdPvmsmE237j5FzcoEh+UkpOrUTzCBiWf+PXQIDAQAB";
let jse = new JSEncrypt();
jse.setPublicKey(publicKey);
export default {
  data() {
    let checkCode = async (rule, value, callback) => {
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
      } else if (value !== this.registerFormData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        code: "wuli",
        password: "123456",
      },
      loading: false,
      showLogin: true,
      verifyCodeUrl:
        "http://118.24.122.189:8009/store-center/image/code?rpid=2012",
      rules: {
        code: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        smsCode: [{ required: true, message: "请输入验证码" }],
        verifyCode: [{ required: true, message: "请输入图形验证码" }],
      },
      registerFormData: {
        code: "wulitest",
        name: "wuli",
        password: "123456",
        cofpassword: "123456",
        phone: "17682314600",
        mail: "2298606212@qq.com",
      },
      registerFormRules: {
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
        smsCode: [{ required: true, message: "请输入验证码" }],
        verifyCode: [{ required: true, message: "请输入图形验证码" }],
        mail: [
          {
            validator: validateEmail,
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    handleShowRegister() {
      this.showLogin = !this.showLogin;
      this.registerFormData = {
        code: "wulitest123",
        name: "wulitest123",
        password: "123456",
        cofpassword: "123456",
        phone: "17682314600",
        mail: "2298606212@qq.com",
      };
      this.formData = {
        code: "wuli",
        password: "123456",
      };
      this.$refs["form"].resetFields();
      this.$refs["register-form"].resetFields();
    },
    handleLoginCode() {
      if (!this.registerFormData.code) {
        this.$message("请输先入账号");
        return;
      }
      getNotLoginmsg({
        data: {
          code: this.formData.code,
        },
      }).then((res) => {
        if (res.data) {
          this.$set(this.formData, "smsCode", res.data);
        }
      });
    },
    handleGetCode() {
      if (!this.registerFormData.phone) {
        this.$message("请输入手机号");
        return;
      }
      getNotSendMsg({
        data: {
          phone: this.registerFormData.phone,
        },
      }).then((res) => {
        if (res.data) {
          this.$set(this.registerFormData, "smsCode", res.data);
        }
      });
    },
    handleImgClick() {
      this.verifyCodeUrl = "";
      setTimeout(() => {
        this.verifyCodeUrl =
          "http://118.24.122.189:8009/store-center/image/code?rpid=2012";
      }, 500);
    },
    onRegister() {
      let code = jse.encrypt(this.registerFormData.code);
      let password = jse.encrypt(this.registerFormData.password);
      console.log(code);
      this.$refs["register-form"].validate((validate) => {
        if (validate) {
          this.loading = true;
          let { cofpassword, ...other } = this.registerFormData;
          mainRegisty({
            data: {
              ...other,
              rpid: "2012",
              code,
              password,
            },
          })
            .then(() => {
              this.showLogin = !this.showLogin;
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    onSubmit() {
      this.$refs["form"].validate((validate) => {
        if (validate) {
          this.loading = true;
          let code = jse.encrypt(this.formData.code);
          let password = jse.encrypt(this.formData.password);
          mainLogin({
            data: {
              ...this.formData,
              code,
              password,
              rpid: "2012",
            },
          })
            .then((res) => {
              setToken(res.token);
              this.$router.push("/");
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login-page {
  height: 100vh;
  // background: url("~@/assets/login.png") no-repeat;
  background-size: cover;
  background-position: center center;
  .login-container {
    // #1ABC9C,#4FC1B0,#16A085,#0fce96
    background: #4fc1b0;
    display: flex;
    align-items: center;
    height: 100vh;
    justify-content: center;
  }
  .login-page-content {
    width: 70%;
    display: flex;
    justify-content: flex-end;
    color: #fff;
    .login-form {
      width: 470px;
      background-color: #fff;
      padding: 67px;
      .login-form-title {
        font-size: 30px;
        font-weight: 400;
        color: #397cf1;
        line-height: 54px;
        margin-bottom: 50px;
      }
      .el-form {
        width: 100%;
      }
    }
  }
}
</style>
