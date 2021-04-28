<template>
  <div>
    <el-card class="mb20">
      <div slot="header">商户编号： 商户名称： 状态：</div>
      <div>基本信息</div>
      <el-form :model="formInline" label-width="150px" class="el-form-static">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="商户编号:">
              {{ formInline.id }}
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="12"> </el-col>
          <el-col :span="8">
            <el-form-item label="商户名称:" prop="name">
              {{ formInline.name }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户简称:" prop="shortName">
              {{ formInline.shortName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户来源:" prop="createSource">
              {{ formInline.createSourceDesc }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户级别:" prop="storeLevelDesc">
              {{ formInline.storeLevelDesc }}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="支付信息编号:" prop="paymentId">
              {{ formInline.paymentId }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户分类:" prop="storeTypeDesc">
              {{ formInline.storeTypeDesc }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务类型:" prop="serviceType">
              {{ formInline.serviceType }}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="业务主管联系电话:" prop="bsManagerPhone">
              {{ formInline.bsManagerPhone }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务主管:" prop="bsManagerName">
              {{ formInline.bsManagerName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="财务主管联系电话:" prop="fcManagerPhone">
              {{ formInline.fcManagerPhone }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="财务主管:" prop="fcManagerName">
              {{ formInline.fcManagerName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务联系人电话:" prop="linkPhone">
              {{ formInline.linkPhone }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务联系人:" prop="linkName">
              {{ formInline.linkName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同结束时间:" prop="contractEndtime">
              {{ formInline.contractEndtime }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同开始时间:" prop="contractBegintime">
              {{ formInline.contractBegintime }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品是否支持开发票:" prop="invoiceForChanl">
              <el-radio-group v-model="formInline.invoiceForChanl" disabled>
                <el-radio :label="0">不支持</el-radio>
                <el-radio :label="1">支持</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同金额:" prop="contractAmount">
              {{ formInline.contractAmount || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否主商户:" prop="isPstore">
              <el-radio-group v-model="formInline.isPstore" disabled>
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="归属地市:" prop="areaCode">
              {{ formInline.areaCodeDesc || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司地址:" prop="storeAddress">
              {{ formInline.companyAreaCodeDesc }}{{ formInline.storeAddress }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮政编码:" prop="areaId">
              {{ formInline.areaId || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地市连锁:" prop="cityChain">
              {{ formInline.cityChain || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当前地市覆盖规模:" prop="cityCover">
              {{ formInline.cityCover || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总部名称:" prop="totalName">
              {{ formInline.totalName || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="连锁总部地址:" prop="totalAddress">
              {{ formInline.totalAddress || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否有会员运营体系:" prop="vipSystem">
              <el-radio-group v-model="formInline.vipSystem">
                <el-radio label="0">否</el-radio>
                <el-radio label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本地地市会员数:" prop="cityVipNum">
              {{ formInline.cityVipNum || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本省会员数:" prop="provinceVipNum">
              {{ formInline.provinceVipNum || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="全国会员数:" prop="countryVipNum">
              {{ formInline.countryVipNum || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本地市用户数:" prop="cityUserNum">
              {{ formInline.cityUserNum || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本省覆盖:" prop="provinceUserNum">
              {{ formInline.provinceUserNum || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="全国覆盖:" prop="countryUserNum">
              {{ formInline.countryUserNum || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否有线上触点:" prop="onLineContact">
              <el-radio-group v-model="formInline.onLineContact">
                <el-radio label="0">否</el-radio>
                <el-radio label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="APP名称:" prop="appName">
              {{ formInline.appName || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="小程序名称:" prop="appletsName">
              {{ formInline.appletsName || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公众号名称:" prop="wxPublicName">
              {{ formInline.wxPublicName || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称:" prop="projectName">
              {{ formInline.projectName || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目规模:" prop="projectScale">
              {{ formInline.projectScale || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="立项人:" prop="projectApprovaName">
              {{ formInline.projectApprovaName || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签订合作类型:" prop="cooperationType">
              {{ formInline.cooperationType || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商机类型:" prop="merchantType">
              {{ formInline.merchantTypeDesc || "--" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目介绍:" prop="projectMessage">
              {{ formInline.projectMessage || "--" }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="mb20">
      <div>业务信息</div>
      <el-form :model="formInline" label-width="150px" class="el-form-static">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="商户性质:" prop="merQual">
              {{ formInline.merQualDesc }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册资本:" prop="regCap">
              {{ formInline.regCap }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属行业:" prop="merType">
              {{ formInline.merTypeDesc }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法人名字:" prop="corporationname">
              {{ formInline.corporationname }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工商注册号:" prop="icRegno">
              {{ formInline.icRegno }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法人证件号码:" prop="corporationidno">
              {{ formInline.corporationidno }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纳税资质:" prop="taxCertifi">
              {{ formInline.taxCertifi }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经营产品:">
              {{ formInline.operateProduct }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="国税税务登记号:">
              {{ formInline.taxCountryNo }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户员工数:" prop="stafNum">
              {{ formInline.stafNum }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="增值税率:">
              {{ formInline.taxAddedRate }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户开业日期:">
              {{ formInline.opNdt }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱:" prop="email">
              {{ formInline.email }}
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="12"></el-col>
          <el-col :span="8">
            <el-form-item label="公司简介:">
              {{ formInline.synposis }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经营范围:">
              {{ formInline.bsScope }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="mb20">
      <div>结算信息</div>
      <el-form :model="formInline" label-width="150px" class="el-form-static">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="结算账号类型:" prop="settleAcType">
              {{ formInline.settleAcTypeDesc }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户行联行号:" prop="merOpBk">
              {{ formInline.merOpBk }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算银行名称:" prop="withdrawBankid">
              {{ formInline.withdrawBankid }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资金结算账号:" prop="settleAc">
              {{ formInline.settleAc }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户行详细信息:" prop="openbankDesc">
              {{ formInline.openbankDesc }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算方式:" prop="stlMode">
              {{ formInline.stlModeDesc }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算比例:" prop="settleRate">
              {{ formInline.settleRate }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算周期:" prop="settlePeriod">
              {{ formInline.settlePeriodDesc }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算划款天数:" prop="settleTrfdays">
              {{ formInline.settleTrfdays }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="起始金额:" prop="settleBeginamt">
              {{ formInline.settleBeginamt }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最低收费金额:" prop="minRetainedamt">
              {{ formInline.minRetainedamt }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票开具方式" prop="settleBillType">
              {{ formInline.settleBillTypeDesc }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="税务证明:" prop="revPrv">
              {{ formInline.revPrv }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="ICP资质编号:" prop="icpNo">
              {{ formInline.icpNo }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="发票邮寄地址:" prop="postAddress">
              {{ formInline.billAreaCodeDesc }} {{ formInline.postAddress }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="mb20">
      <div>支付信息</div>
      <el-form
        :model="payMenthodInfo"
        label-width="150px"
        class="el-form-static"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="支付渠道名称:" prop="name">
              {{ payMenthodInfo.name }}
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="12"> </el-col>
          <el-col :span="8">
            <el-form-item label="和包支付编号:" prop="hebaoStoreId">
              {{ payMenthodInfo.hebaoStoreId }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="微信应用ID:" prop="wechatAppId">
              {{ payMenthodInfo.wechatAppId }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="和包费率:" prop="hebaoFee">
              {{ payMenthodInfo.hebaoFee }}%
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="微信支付商户号:" prop="wechatMerId">
              {{ payMenthodInfo.wechatMerId }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="和包支付:" prop="hebaoStatus">
              <el-radio-group v-model="payMenthodInfo.hebaoStatus" disabled>
                <el-radio :label="1">支持</el-radio>
                <el-radio :label="0">不支持</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="微信费率:" prop="wechatPayFee">
              {{ payMenthodInfo.wechatPayFee }}%
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="支付宝应用ID:" prop="aliAppId">
              {{ payMenthodInfo.aliAppId }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="微信APP支付:" prop="wechatPayApp">
              <el-radio-group v-model="payMenthodInfo.wechatPayApp" disabled>
                <el-radio :label="1">支持</el-radio>
                <el-radio :label="0">不支持</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="支付宝费率:" prop="aliPayFee">
              {{ payMenthodInfo.aliPayFee }}%
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="微信H5支付:" prop="wechatPayH5">
              <el-radio-group v-model="payMenthodInfo.wechatPayH5" disabled>
                <el-radio :label="1">支持</el-radio>
                <el-radio :label="0">不支持</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="支付宝APP支付:" prop="aliPayApp">
              <el-radio-group v-model="payMenthodInfo.aliPayApp" disabled>
                <el-radio :label="1">支持</el-radio>
                <el-radio :label="0">不支持</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="微信公众号支付:" prop="wechatPayMp">
              <el-radio-group v-model="payMenthodInfo.wechatPayMp" disabled>
                <el-radio :label="1">支持</el-radio>
                <el-radio :label="0">不支持</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="支付宝H5支付:" prop="aliPayH5">
              <el-radio-group v-model="payMenthodInfo.aliPayH5" disabled>
                <el-radio :label="1">支持</el-radio>
                <el-radio :label="0">不支持</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="mb20">
      <div>费率</div>
      <el-table :data="formInline.storeFreeList" style="width: 100%" border>
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column label="费率类型">
          <template slot-scope="scope">
            <span>现金</span>
          </template>
        </el-table-column>
        <el-table-column prop="feemothod" label="费率（%）" />
        <el-table-column prop="effortdate" label="生效日期" />
        <el-table-column prop="expirydate" label="失效日期" />
        <el-table-column prop="beganamount" label="计费起始金额（元）" />
        <el-table-column prop="minfeeamount" label="最低收费金额（元）" />
      </el-table>
    </el-card>
    <el-card>
      <div>协议信息</div>
      <el-form :model="formInline" label-width="150px" class="el-form-static">
        <el-form-item label="协议签订日期:" prop="contractSignTime">
          {{ formInline.contractSignTime }}
        </el-form-item>
        <el-form-item label="上传决策纪要:" prop="decision">
          <a
            class="link-primary"
            v-if="formInline.decision && formInline.decision.fileName"
            :download="formInline.decision.fileName"
            :href="$getDownFileUrl(formInline.decision.id)"
            target="_blank"
            >{{ formInline.decision.fileName }}</a
          >
        </el-form-item>
        <el-form-item label="上传签署协议:" prop="contract">
          <a
            class="link-primary"
            v-if="formInline.contract && formInline.contract.fileName"
            :download="formInline.contract.fileName"
            :href="$getDownFileUrl(formInline.contract.id)"
            target="_blank"
            >{{ formInline.contract.fileName }}</a
          >
        </el-form-item>
        <el-form-item label="商户签署协议:" prop="storedecision">
          <a
            class="link-primary"
            v-if="formInline.storedecision && formInline.storedecision.fileName"
            :download="formInline.storedecision.fileName"
            :href="$getDownFileUrl(formInline.storedecision.id)"
            target="_blank"
            >{{ formInline.storedecision.fileName }}</a
          >
        </el-form-item>
        <el-form-item label="移动签署协议:" prop="chinamdecision">
          <a
            class="link-primary"
            v-if="
              formInline.chinamdecision && formInline.chinamdecision.fileName
            "
            :download="formInline.chinamdecision.fileName"
            :href="$getDownFileUrl(formInline.chinamdecision.id)"
            target="_blank"
            >{{ formInline.chinamdecision.fileName }}</a
          >
        </el-form-item>
      </el-form>
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
