<template>
  <div>
    <el-form
      ref="baseForm"
      :model="formInline"
      :rules="formRules"
      class="demo-form-inline"
      label-width="150px"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="结算账号类型:">
            <el-select v-model="formInline.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开户行联行号:" prop="name">
            <el-input v-model="formInline.name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算银行名称:" prop="name">
            <el-input v-model="formInline.name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资金结算账号:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开户行详细信息:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算类型:">
            <el-radio-group v-model="formInline.radio">
              <el-radio :label="3">系统结算</el-radio>
              <el-radio :label="6">手工结算</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算方式:">
            <el-row>
              <el-col :span="10">
                <el-select v-model="formInline.region" placeholder="">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-col>
              <el-col :span="13" :offset="1">
                <el-checkbox v-model="formInline.checked">
                  与渠道商结算信息一致
                </el-checkbox>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算比例:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算周期:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算划款天数:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="起始金额:">
            <el-row>
              <el-col :span="16">
                <el-input
                  v-model="formInline.user"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col :span="8">（单位：元） </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最低收费金额:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发票开具方式:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付宝应用ID:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="税务证明:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信应用ID:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="ICP资质编号:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="是否现金结算:">
            <el-radio-group v-model="formInline.radio">
              <el-radio :label="3">否</el-radio>
              <el-radio :label="6">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="费用类型:">
            <el-select
              v-model="formInline.region"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否商场币结算:">
            <el-radio-group v-model="formInline.radio">
              <el-radio :label="3">否</el-radio>
              <el-radio :label="6">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="清结算类别:">
            <el-select
              v-model="formInline.region"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="费用方向:">
            <el-select
              v-model="formInline.region"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收费周期:">
            <el-select
              v-model="formInline.region"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收费周期数量:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收费方式:">
            <el-select v-model="formInline.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计费方法:">
            <el-select
              v-model="formInline.region"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="支付方式:">
            <el-row>
              <el-col :span="24">
                <el-checkbox-group v-model="formInline.checkList">
                  <el-checkbox label="和包支付"></el-checkbox>
                  <el-checkbox label="微信公众号支付"></el-checkbox>
                  <el-checkbox label="微信APP支付"></el-checkbox>
                </el-checkbox-group>
              </el-col>
              <el-col :span="24">
                <el-checkbox-group v-model="formInline.checkList">
                  <el-checkbox label="微信H5支付"></el-checkbox>
                  <el-checkbox label="支付宝APP支付"></el-checkbox>
                  <el-checkbox label="支付宝H5支付"></el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="发票邮寄地址:">
            <el-row>
              <el-col :span="8">
                <el-select
                  v-model="formInline.region"
                  placeholder=""
                  style="width: 100%"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-input
                  v-model="formInline.user"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col :span="3" :offset="1">
                <el-checkbox v-model="formInline.checked">
                  与渠道商结算信息一致
                </el-checkbox>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">下一项</el-button>
        <el-button @click="onReset" class="ml20">重置</el-button>
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
      cites: ["上海", "北京", "广州", "深圳"],
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
