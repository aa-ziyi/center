<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>卡片名称</span>
    </div>
    <div class="title">基本信息</div>
    <el-form
      ref="baseForm"
      :model="formInline"
      class="demo-form-inline"
      label-width="150px"
    >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="商户编号:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商户名称:" prop="name"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商户简称:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商户来源:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="来源渠道:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商户级别:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="父级商户:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="支付信息编号:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="服务类型:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商户状态:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商户分类:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业务主管联系电话:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="财务主管:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业务主管:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业务联系人:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="财务主管联系电话:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同开始时间:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同结束时间:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业务联系电话:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品是否支持开发票:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否主商户:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同金额:"> </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="公司地址:"> 搜索 </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否连锁:"> </el-form-item>
        </el-col>
        <el-form-item label="当前地市覆盖规模:"> </el-form-item>
        <el-col :span="8">
          <el-form-item label="地市连锁:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="当前覆盖城市:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="本省连锁:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="连锁总部地址:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总部名称:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="本地地市会员数:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否有会员运营体系:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="本省会员数:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="全国会员数:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否有线上触点:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="本地市用户数:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="本身覆盖:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="全国覆盖:"> </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="APP名称:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="小程序名称:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公众号名称:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目规模:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="立项人:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签订合作类型:"> </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="商机类型:"> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目介绍:"> </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">下一项</el-button>
        <el-button @click="onReset" class="ml20">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      formInline: {},
    };
  },
};
</script>
