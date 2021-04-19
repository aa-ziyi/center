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
          <el-form-item label="商户编号:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="12"> </el-col>
        <el-col :span="12">
          <el-form-item label="商户名称:" prop="name">
            <el-input v-model="formInline.name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商户简称:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商户来源:">
            <el-select v-model="formInline.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地区编码:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付信息编号:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
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
          <el-form-item label="父级商户:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商户分类:">
            <el-row>
              <el-col :span="11">
                <el-input
                  v-model="formInline.user"
                  placeholder="一级分类"
                ></el-input>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-input
                  v-model="formInline.user"
                  placeholder="二级分类"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务类型:">
            <el-radio-group v-model="formInline.radio">
              <el-radio :label="3">实物商品</el-radio>
              <el-radio :label="6">虚拟商品</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务状态:">
            <el-radio-group v-model="formInline.radio">
              <el-radio :label="3">有效</el-radio>
              <el-radio :label="6">无效</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务主管:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务主管联系电话:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="财务主管:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="财务主管联系电话:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务联系人:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务联系人电话:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同开始时间:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同结束时间:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同金额:">
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
          <el-form-item label="商品是否支持开发票:">
            <el-radio-group v-model="formInline.radio">
              <el-radio :label="3">不支持</el-radio>
              <el-radio :label="6">支持</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否主商户:">
            <el-radio-group v-model="formInline.radio">
              <el-radio :label="3">否</el-radio>
              <el-radio :label="6">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否连锁:">
            <el-radio-group v-model="formInline.radio">
              <el-radio :label="3">否</el-radio>
              <el-radio :label="6">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="公司地址:"> 搜索 </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="地市连锁:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="当前地市覆盖规模:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本省连锁:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="当前覆盖城市:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总部名称:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="连锁总部地址:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否有会员运营体系:">
            <el-radio-group v-model="formInline.radio">
              <el-radio :label="3">否</el-radio>
              <el-radio :label="6">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="本地地市会员数:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本省会员数:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="全国会员数:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本地市用户数:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本身覆盖:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="全国覆盖:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否有线上触点:">
            <el-radio-group v-model="formInline.radio">
              <el-radio :label="3">否</el-radio>
              <el-radio :label="6">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="APP名称:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="小程序名称:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公众号名称:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目名称:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目规模:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="立项人:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="签订合作类型:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商机类型:">
            <el-select v-model="formInline.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目介绍:">
            <el-input
              type="textarea"
              :rows="4"
              v-model="formInline.user"
              placeholder="请输入"
            ></el-input>
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
