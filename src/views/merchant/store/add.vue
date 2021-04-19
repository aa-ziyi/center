<template>
  <div>
    <page-header title="添加门店"></page-header>
    <el-card class="add-store-card">
      <div slot="header" class="space-between">
        <div>门店录入</div>
      </div>
      <el-form
        ref="baseForm"
        :model="formInline"
        :rules="formRules"
        class="demo-form-inline"
        label-width="150px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="门店名称:">
              <el-input
                v-model="formInline.user"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="12"> </el-col>
          <el-col :span="12">
            <el-form-item label="门店名称:" prop="name">
              <el-input
                v-model="formInline.name"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="门店分类:">
              <el-select v-model="formInline.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属城市:">
              <el-input
                v-model="formInline.user"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地图坐标经度:">
              <el-input
                v-model="formInline.user"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商户级别:">
              <el-select v-model="formInline.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地图坐标维度:">
              <el-input
                v-model="formInline.user"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效开始时间:">
              <el-input
                v-model="formInline.user"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效结束时间:">
              <el-input
                v-model="formInline.user"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业时间:">
              <el-input
                v-model="formInline.user"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人均消费:">
              <el-input
                v-model="formInline.user"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="门店手机号码:">
              <el-input
                v-model="formInline.user"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="包间数:">
              <el-input
                v-model="formInline.user"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公交线路:">
              <el-input
                v-model="formInline.user"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="停车位:">
              <el-input
                v-model="formInline.user"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="面积:">
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
          <el-col :span="24">
            <el-form-item label="门店地址:"> 搜索 </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="门店备注:">
              <el-input
                type="textarea"
                :rows="4"
                v-model="formInline.user"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="门店logo:"> </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">下一项</el-button>
          <el-button @click="onReset" class="ml20">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { scrollTo } from "@/utils/scroll-to.js";
export default {
  data() {
    return {
      formInline: {},
      formRules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
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
<style lang="less" scoped>
.add-store-card {
  margin: 20px;
}
</style>
