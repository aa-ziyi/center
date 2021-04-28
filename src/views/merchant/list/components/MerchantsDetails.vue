<template>
  <div>
    <el-card>
      <div slot="header">商户编号： 商户名称： 状态：</div>
      <div>基本信息</div>
      <el-form :model="formInline" label-width="150px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="商户编号:">
              {{ formInline.id }}
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="12"> </el-col>
          <el-col :span="12">
            <el-form-item label="商户名称:" prop="name">
              {{ formInline.name }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商户简称:" prop="shortName">
              {{ formInline.shortName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商户来源:" prop="createSource">
              {{ formInline.createSourceDesc }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商户级别:" prop="storeLevelDesc">
              {{ formInline.storeLevelDesc }}
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="支付信息编号:" prop="paymentId">
              {{ formInline.paymentId }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商户分类:" prop="storeTypeDesc">
              {{ formInline.storeTypeDesc }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务类型:" prop="serviceType">
              {{ formInline.serviceType }}
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="业务主管联系电话:" prop="bsManagerPhone">
              {{ formInline.bsManagerPhone }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务主管:" prop="bsManagerName">
              {{ formInline.bsManagerName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="财务主管联系电话:" prop="fcManagerPhone">
              {{ formInline.fcManagerPhone }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="财务主管:" prop="fcManagerName">
              {{ formInline.fcManagerName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务联系人电话:" prop="linkPhone">
              {{ formInline.linkPhone }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务联系人:" prop="linkName">
              {{ formInline.linkName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同结束时间:" prop="contractEndtime">
              {{ formInline.contractEndtime }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同开始时间:" prop="contractBegintime">
              {{ formInline.contractBegintime }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品是否支持开发票:" prop="invoiceForChanl">
              <el-radio-group v-model="formInline.invoiceForChanl" disabled>
                <el-radio :label="0">不支持</el-radio>
                <el-radio :label="1">支持</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同金额:" prop="contractAmount">
              {{ formInline.contractAmount }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否主商户:" prop="isPstore">
              <el-radio-group v-model="formInline.isPstore" disabled>
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属地市:" prop="areaCode">
              {{ formInline.areaCodeDesc }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司地址:" prop="storeAddress">
              {{ formInline.storeAddress }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮政编码:" prop="areaId">
              {{ formInline.areaId }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地市连锁:" prop="cityChain">
              {{ formInline.cityChain }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当前地市覆盖规模:" prop="cityCover">
              {{ formInline.cityCover }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总部名称:" prop="totalName">
              {{ formInline.totalName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="连锁总部地址:" prop="totalAddress">
              {{ formInline.totalAddress }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否有会员运营体系:" prop="vipSystem">
              <el-radio-group v-model="formInline.vipSystem">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="本地地市会员数:" prop="cityVipNum">
              {{ formInline.cityVipNum }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="本省会员数:" prop="provinceVipNum">
              {{ formInline.provinceVipNum }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="全国会员数:" prop="countryVipNum">
              {{ formInline.countryVipNum }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="本地市用户数:" prop="cityUserNum">
              {{ formInline.cityUserNum }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="本省覆盖:" prop="provinceUserNum">
              {{ formInline.provinceUserNum }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="全国覆盖:" prop="countryUserNum">
              {{ formInline.countryUserNum }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否有线上触点:" prop="onLineContact">
              <el-radio-group v-model="formInline.onLineContact">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="APP名称:" prop="appName">
              {{ formInline.appName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="小程序名称:" prop="appletsName">
              {{ formInline.appletsName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公众号名称:" prop="wxPublicName">
              {{ formInline.wxPublicName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称:" prop="projectName">
              {{ formInline.projectName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目规模:" prop="projectScale">
              {{ formInline.projectScale }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="立项人:" prop="projectApprovaName">
              {{ formInline.projectApprovaName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签订合作类型:" prop="cooperationType">
              {{ formInline.cooperationType }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商机类型:" prop="merchantType">
              {{ formInline.merchantType }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目介绍:" prop="projectMessage">
              {{ formInline.projectMessage }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <div>业务信息</div>
    </el-card>
    <el-card>
      <div>结算信息</div>
    </el-card>
    <el-card>
      <div>支付信息</div>
    </el-card>
    <el-card>
      {{ payMenthodInfo }}
      <div>费率</div>
    </el-card>
    <el-card>
      <div>协议信息</div>
    </el-card>
  </div>
</template>
<script>
import { storeGetStoreTempInfo, storeGetstoreinfo } from "@/api/merchant.js";
export default {
  props: {
    status: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      formInline: {},
      payMenthodInfo: {},
    };
  },
  created() {
    this.getFormData();
  },
  methods: {
    getFormData() {
      this.loading = true;
      let method =
        String(this.status) == "3" ? storeGetstoreinfo : storeGetStoreTempInfo;
      method({
        data: {
          id: this.id || this.$route.params.id,
        },
      })
        .then((res) => {
          this.formInline = res.data.storeInfo;
          this.formInline = {
            ...this.formInline,
            areaCode: this.formInline.areaCode
              ? [this.formInline.areaCode]
              : [],
          };
          this.payMenthodInfo = res.data.payMenthodInfo;
          this.$emit("change", this.formInline);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
