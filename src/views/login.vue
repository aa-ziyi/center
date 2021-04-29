<template>
  <div class="login-page">
    <div class="login-header">
      <img src="@/assets/logo_pic.png" /> 江西移动商盟管理平台
    </div>
    <div class="login-container">
      <div class="login-page-content">
        <div v-show="formType == 'login'" class="login-form">
          <div class="login-title">提示：多平台账号以商城管理后台密码为准</div>
          <el-form
            ref="form"
            :model="formData"
            :rules="rules"
            label-position="left"
          >
            <el-form-item prop="code">
              <el-input
                v-model="formData.code"
                placeholder="请输入账号"
                size="medium"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                size="medium"
                v-model="formData.password"
                type="password"
                placeholder="请输入密码"
              />
            </el-form-item>
            <el-form-item prop="smsCode">
              <el-col :span="12">
                <el-input
                  v-model="formData.smsCode"
                  placeholder="验证码"
                  size="medium"
                />
              </el-col>
              <el-col :span="12">
                <el-button class="ml20" @click="handleLoginCode" size="medium">
                  获取手机验证码
                </el-button>
              </el-col>
            </el-form-item>
            <el-form-item prop="verifyCode">
              <el-col :span="12">
                <el-input
                  v-model="formData.verifyCode"
                  placeholder="验证码"
                  size="medium"
                />
              </el-col>
              <el-col :span="12">
                <el-image
                  v-loading="!verifyCodeUrl"
                  @click="handleImgClick"
                  style="height: 30px"
                  :src="verifyCodeUrl"
                  class="link-primary ml20"
                >
                  <span slot="error">加载中</span>
                </el-image>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button
                class="btn-block"
                :loading="loading"
                type="primary"
                @click="onSubmit"
              >
                登陆
              </el-button>
            </el-form-item>
            <div class="space-between">
              <el-link class="login-link" @click="handleShowPassword"
                >忘记密码</el-link
              >
              <el-link class="login-link" @click="handleShowRegister">
                注册账号
              </el-link>
            </div>
          </el-form>
        </div>
        <div v-show="formType == 'register'" class="login-form">
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
                size="medium"
              />
            </el-form-item>
            <el-form-item prop="name">
              <el-input
                size="medium"
                v-model="registerFormData.name"
                placeholder="请输入昵称"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                size="medium"
                v-model="registerFormData.password"
                placeholder="6-16位密码，区分大小写"
              />
            </el-form-item>
            <el-form-item prop="cofpassword">
              <el-input
                v-model="registerFormData.cofpassword"
                type="password"
                placeholder="确认密码"
                size="medium"
              />
            </el-form-item>
            <el-form-item prop="phone">
              <el-input
                v-model="registerFormData.phone"
                placeholder="11位手机号"
                size="medium"
              />
            </el-form-item>
            <el-form-item prop="smsCode">
              <el-col :span="12">
                <el-input
                  v-model="registerFormData.smsCode"
                  placeholder="输入验证码"
                  size="medium"
                />
              </el-col>
              <el-col :span="12">
                <el-button class="ml20" @click="handleGetCode" size="medium">
                  获取手机验证码
                </el-button>
              </el-col>
            </el-form-item>
            <el-form-item prop="verifyCode">
              <el-col :span="12">
                <el-input
                  v-model="registerFormData.verifyCode"
                  placeholder="验证码"
                  size="medium"
                />
              </el-col>
              <el-col :span="12">
                <el-image
                  class="link-primary ml20"
                  v-loading="!verifyCodeUrl"
                  @click="handleImgClick"
                  style="height: 30px"
                  :src="verifyCodeUrl"
                >
                  <span slot="error">加载中</span>
                </el-image>
              </el-col>
            </el-form-item>
            <el-form-item prop="mail">
              <el-input
                v-model="registerFormData.mail"
                placeholder="注册邮箱"
                size="medium"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="loading"
                class="btn-block"
                type="primary"
                @click="onRegister()"
              >
                注册
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-link class="login-link" @click="handleShowLogin">
                使用已有账号登陆</el-link
              >
            </el-form-item>
          </el-form>
        </div>
        <div v-show="formType == 'password'" class="login-form">
          <div class="login-title">
            忘记密码了？没关系使用您绑定的手机号码找回密码吧。
          </div>
          <el-form
            ref="password-form"
            :model="passwordFormData"
            :rules="passwordFormRules"
            label-position="left"
          >
            <el-form-item prop="code">
              <el-input
                v-model="passwordFormData.code"
                placeholder="请输入账号"
                size="medium"
              />
            </el-form-item>

            <el-form-item prop="smsCode">
              <el-col :span="12">
                <el-input
                  v-model="passwordFormData.smsCode"
                  placeholder="验证码"
                  size="medium"
                  name="smsCode"
                />
              </el-col>
              <el-col :span="12">
                <el-button
                  class="ml20"
                  @click="handlePasswordCode"
                  size="medium"
                >
                  获取手机验证码
                </el-button>
              </el-col>
            </el-form-item>
            <el-form-item prop="verifyCode">
              <el-col :span="12">
                <el-input
                  name="verifyCode"
                  v-model="passwordFormData.verifyCode"
                  placeholder="验证码"
                  size="medium"
                />
              </el-col>
              <el-col :span="12">
                <el-image
                  v-loading="!verifyCodeUrl"
                  @click="handleImgClick"
                  style="height: 30px"
                  :src="verifyCodeUrl"
                  class="link-primary ml20"
                >
                  <span slot="error">加载中</span>
                </el-image>
              </el-col>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                size="medium"
                v-model="passwordFormData.password"
                type="password"
                placeholder="请输入新密码"
              />
            </el-form-item>
            <el-form-item prop="cofpassword">
              <el-input
                v-model="passwordFormData.cofpassword"
                type="password"
                placeholder="确认新密码"
                size="medium"
              />
            </el-form-item>
            <el-form-item>
              <div class="space-between">
                <el-button
                  class="btn-block"
                  :loading="loading"
                  type="warning"
                  @click="onSubmitPassword()"
                >
                  修改密码
                </el-button>
                <el-button :loading="loading" @click="handleShowLogin">
                  返回
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="login-bottom">
      Copyright 20172015 All Reserved. 中国移动通信集团江西有限公司版权所有
    </div>
  </div>
</template>

<script>
import {
  mainLogin,
  mainRegisty,
  mainResetPwd,
  getNotSendMsg,
  getNotLoginmsg,
  mainCheckname,
} from "@/api/login";
import { setToken, setCurrentUser, getRolePathName } from "@/utils/auth";
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
      let password = this.registerFormData.password;
      if (this.formType == "password") {
        password = this.passwordFormData.password;
      }
      if (value && password != value) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formData: {},
      loading: false,
      formType: this.$route.query.type || "login",
      verifyCodeUrl: this.$getVerifyCodeUrl(),
      rules: {
        code: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        smsCode: [{ required: true, message: "请输入验证码" }],
        verifyCode: [{ required: true, message: "请输入图形验证码" }],
      },
      registerFormData: {},
      registerFormRules: {
        code: [
          { required: true, message: "请输入账号", trigger: "blur" },
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
      passwordFormData: {},
      passwordFormRules: {
        code: [{ required: true, message: "请输入账号", trigger: "blur" }],
        smsCode: [{ required: true, message: "请输入验证码" }],
        verifyCode: [{ required: true, message: "请输入图形验证码" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator: validatePassword,
            trigger: "blur",
          },
        ],
        cofpassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {
            validator: validateCofPassword,
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    restForm() {
      this.registerFormData = {};
      this.formData = {};
      this.passwordFormData = {};
      this.$refs["form"].resetFields();
      this.$refs["register-form"].resetFields();
      this.$refs["password-form"].resetFields();
      this.verifyCodeUrl = this.$getVerifyCodeUrl();
    },
    handleShowPassword() {
      this.formType = "password";
      this.restForm();
    },
    handleShowLogin() {
      this.formType = "login";
      this.restForm();
    },
    handleShowRegister() {
      this.formType = "register";
      this.restForm();
    },
    handlePasswordCode() {
      if (!this.passwordFormData.code) {
        this.$message("请输先入账号");
        return;
      }
      getNotLoginmsg({
        data: {
          code: this.passwordFormData.code,
        },
      }).then((res) => {
        if (res.data) {
          this.$set(this.passwordFormData, "smsCode", res.data);
        }
      });
    },
    handleLoginCode() {
      if (!this.formData.code) {
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
      this.$nextTick(() => {
        this.verifyCodeUrl = this.$getVerifyCodeUrl();
      });
    },
    onSubmitPassword() {
      this.onRegister(true);
    },
    onRegister(resetPassword) {
      let formdata = this.registerFormData;
      let _method = mainRegisty;
      let form = "register-form";
      if (resetPassword) {
        formdata = this.passwordFormData;
        _method = mainResetPwd;
        form = "password-form";
      }
      let code = jse.encrypt(formdata.code);
      let password = jse.encrypt(formdata.password);
      console.log(code);
      this.$refs[form].validate((validate) => {
        if (validate) {
          this.loading = true;
          let { cofpassword, ...other } = formdata;
          _method({
            data: {
              ...other,
              rpid: "2012",
              code,
              password,
            },
          })
            .then(() => {
              this.formType = "login";
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
              let { token, roleId, ...other } = res;
              let roleObj = this.initRole(roleId);
              setToken(token);
              setCurrentUser({
                roleId,
                ...roleObj,
                ...other,
              });
              let name = getRolePathName(roleObj);
              this.$router.push({
                name,
              });
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    initRole(roleId) {
      // 0超级管理员  1系统管理员  2商户 3门店 4. 待入驻商户
      let _role = String(roleId);
      if (_role == "0" || _role == "1") {
        return {
          isAdmin: true,
        };
      }
      if (_role == "2") {
        return {
          isStore: true,
        };
      }
      if (_role == "3") {
        return {
          isShop: true,
        };
      }
      if (_role == "4") {
        return {
          isStoreBefore: true,
        };
      }
      return {};
    },
  },
};
</script>
<style lang="less">
.login-page {
  .el-form-item__content {
    line-height: inherit;
  }
}
.login-link.el-link.el-link--default {
  color: #fff;
}
</style>
<style lang="less" scoped>
.login-page {
  position: relative;
  height: calc(100vh - 50px);
  background: url("~@/assets/body_bg.png") no-repeat;
  background-size: contain;
  background-position: center bottom;
  background-color: #00081d;
  .login-header {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    background-color: #fff;
    padding: 0 40px;
    display: flex;
    align-items: center;
    font-size: 20px;
    img {
      height: 60px;
      margin-right: 30px;
    }
  }
  .login-bottom {
    position: absolute;
    left: 0;
    bottom: -50px;
    right: 0;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #657180;
    font-size: 13px;
  }
  .login-container {
    // #1ABC9C,#4FC1B0,#16A085,#0fce96
    // background: #4fc1b0;
    display: flex;
    align-items: center;
    height: 100vh;
    justify-content: center;
  }
  .login-page-content {
    width: 460px;
    display: flex;
    justify-content: center;
    color: #fff;
    background: rgba(255, 255, 255, 0.41);
    .login-form {
      width: 100%;
      margin: 0 auto;
      padding: 25px 30px;
      .login-title {
        font-size: 13px;
        margin-bottom: 10px;
        color: #ffa847;
      }
      .el-form {
        width: 100%;
      }
    }
  }
}
</style>
