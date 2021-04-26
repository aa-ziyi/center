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
          <el-form-item label="商户编号:" v-if="formInline.id">
            <el-input v-model="formInline.id" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="12"> </el-col>
        <el-col :span="12">
          <el-form-item label="商户名称:" prop="name">
            <el-input v-model="formInline.name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商户简称:" prop="shortName">
            <el-input
              v-model="formInline.shortName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商户来源:" prop="createSource">
            <el-select v-model="formInline.createSource" placeholder="请选择">
              <el-option
                v-for="(option, index) in prestoreinfoData.createSource"
                :key="index"
                :label="option"
                :value="Number(index)"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商户级别:" prop="storeLevel">
            <el-select v-model="formInline.storeLevel" placeholder="请选择">
              <el-option
                v-for="(option, index) in prestoreinfoData.storeLevelMap"
                :key="index"
                :label="option[Object.keys(option)[0]]"
                :value="Object.keys(option)[0]"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="支付信息编号:" prop="paymentId" v-if="isAdmin">
            <el-input
              v-model="formInline.paymentId"
              placeholder="请输入"
              style="display: none"
            ></el-input>
            {{ formInline.paymentId }}
            <a class="link-primary" @click="handleCheckPaymentId">
              {{ formInline.paymentId ? "修改" : "选择" }}支付方式
            </a>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商户分类:" prop="storeType">
            <el-select
              v-model="formInline.storeTypeP"
              placeholder="一级分类"
              clearable
              @change="storeTypePChange"
            >
              <el-option
                v-for="(option, index) in storeTypeP"
                :key="index"
                :label="option.name"
                :value="option.id"
              ></el-option>
            </el-select>
            <el-select
              v-model="formInline.storeType"
              placeholder="二级分类"
              clearable
            >
              <el-option
                v-for="(option, index) in storeTypeC"
                :key="index"
                :label="option.name"
                :value="option.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务类型:" prop="serviceType">
            <el-checkbox-group v-model="formInline.serviceType">
              <el-checkbox
                v-for="(option, index) in prestoreinfoData.serviceTypeMap"
                :key="index"
                :label="Object.keys(option)[0]"
              >
                {{ option[Object.keys(option)[0]] }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="业务主管联系电话:" prop="bsManagerPhone">
            <el-input
              v-model="formInline.bsManagerPhone"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务主管:" prop="bsManagerName">
            <el-input
              v-model="formInline.bsManagerName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="财务主管联系电话:" prop="fcManagerPhone">
            <el-input
              v-model="formInline.fcManagerPhone"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="财务主管:" prop="fcManagerName">
            <el-input
              v-model="formInline.fcManagerName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务联系人电话:" prop="linkPhone">
            <el-input
              v-model="formInline.linkPhone"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务联系人:" prop="linkName">
            <el-input
              v-model="formInline.linkName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同结束时间:" prop="contractEndtime">
            <el-date-picker
              v-model="formInline.contractEndtime"
              type="datetime"
              placeholder="请选择"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同开始时间:" prop="contractBegintime">
            <el-date-picker
              v-model="formInline.contractBegintime"
              type="datetime"
              placeholder="请选择"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品是否支持开发票:" prop="invoiceForChanl">
            <el-radio-group v-model="formInline.invoiceForChanl">
              <el-radio :label="0">不支持</el-radio>
              <el-radio :label="1">支持</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同金额:" prop="contractAmount">
            <el-row>
              <el-col :span="16">
                <el-input
                  v-model="formInline.contractAmount"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col :span="8">（单位：元） </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否主商户:" prop="isPstore">
            <el-radio-group v-model="formInline.isPstore">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="归属地市:" prop="areaCode">
            <area-cascader v-model="formInline.areaCode" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司地址:" prop="storeAddress">
            <el-row>
              <el-col :span="12">
                <area-cascader v-model="formInline.companyAreaCode" />
              </el-col>
              <el-col :span="12">
                <el-input
                  v-model="formInline.storeAddress"
                  placeholder="请输入"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮政编码:" prop="areaId">
            <el-input
              v-model="formInline.areaId"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地市连锁:" prop="cityChain">
            <el-input
              v-model="formInline.cityChain"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="当前地市覆盖规模:" prop="cityCover">
            <el-input
              v-model="formInline.cityCover"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总部名称:" prop="totalName">
            <el-input
              v-model="formInline.totalName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="连锁总部地址:" prop="totalAddress">
            <el-input
              v-model="formInline.totalAddress"
              placeholder="请输入"
            ></el-input>
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
            <el-input
              v-model="formInline.cityVipNum"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本省会员数:" prop="provinceVipNum">
            <el-input
              v-model="formInline.provinceVipNum"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="全国会员数:" prop="countryVipNum">
            <el-input
              v-model="formInline.countryVipNum"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本地市用户数:" prop="cityUserNum">
            <el-input
              v-model="formInline.cityUserNum"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本省覆盖:" prop="provinceUserNum">
            <el-input
              v-model="formInline.provinceUserNum"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="全国覆盖:" prop="countryUserNum">
            <el-input
              v-model="formInline.countryUserNum"
              placeholder="请输入"
            ></el-input>
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
            <el-input
              v-model="formInline.appName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="小程序名称:" prop="appletsName">
            <el-input
              v-model="formInline.appletsName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公众号名称:" prop="wxPublicName">
            <el-input
              v-model="formInline.wxPublicName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目名称:" prop="projectName">
            <el-input
              v-model="formInline.projectName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目规模:" prop="projectScale">
            <el-input
              v-model="formInline.projectScale"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="立项人:" prop="projectApprovaName">
            <el-input
              v-model="formInline.projectApprovaName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="签订合作类型:" prop="cooperationType">
            <el-input
              v-model="formInline.cooperationType"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商机类型:" prop="merchantType">
            <el-select v-model="formInline.merchantType" placeholder="请选择">
              <el-option
                v-for="(option, index) in prestoreinfoData.merchantType"
                :key="index"
                :label="option"
                :value="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目介绍:" prop="projectMessage">
            <el-input
              type="textarea"
              :rows="4"
              v-model="formInline.projectMessage"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateForm()">下一项</el-button>
      </el-form-item>
    </el-form>
    <paymentDialog v-model="paymentDialogVisible" @check="onCheckPaymentId" />
  </div>
</template>
<script>
import { scrollTo } from "@/utils/scroll-to.js";
import { getStoretype } from "@/api/merchant.js";
import paymentDialog from "./paymentDialog";
import {
  validateSingleBit,
  phoneNumber,
  validatePostalCode,
} from "@/utils/validate";
export default {
  components: {
    paymentDialog,
  },
  props: {
    prestoreinfoData: {
      type: Object,
      default: () => {},
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    let validateEndDate = (rule, value, callback) => {
      let startDate = this.formInline.contractBegintime;
      if (value && startDate && value <= startDate) {
        callback(new Error("合同结束时间需大于开始时间"));
      } else {
        callback();
      }
    };
    return {
      paymentDialogVisible: false,
      storeTypeP: [],
      storeTypeC: [],
      formInline: {
        isPstore: 0,
        invoiceForChanl: 0,
        vipSystem: 0,
        onLineContact: 0,
        serviceType: [],
        companyAreaCode: ["360000", "360100"],
        areaCode: ["360000", "360100"],
      },
      formRules: {
        name: [{ required: true, message: "请输入商户名称", trigger: "blur" }],
        shortName: [
          { required: true, message: "请输入商户简称", trigger: "blur" },
        ],
        createSource: [
          { required: true, message: "请选择商户来源", trigger: "change" },
        ],
        areaCode: [
          { required: true, message: "请选择归属地市", trigger: "change" },
        ],
        storeLevel: [
          { required: true, message: "请选择商户级别", trigger: "change" },
        ],
        storeType: [{ required: true, message: "请选择商户分类" }],
        serviceType: [
          { required: true, message: "请选择服务类型", trigger: "change" },
        ],
        paymentId: [
          { required: true, message: "请输入支付信息编号", trigger: "blur" },
        ],
        bsManagerPhone: [
          {
            required: true,
            message: "请输入业务主管联系电话",
            trigger: "blur",
          },
          {
            validator: phoneNumber,
          },
        ],
        fcManagerName: [
          { required: true, message: "请输入财务主管姓名", trigger: "blur" },
        ],
        fcManagerPhone: [
          {
            required: true,
            message: "请输入财务主管联系电话",
            trigger: "blur",
          },
          {
            validator: phoneNumber,
          },
        ],
        bsManagerName: [
          { required: true, message: "请输入业务主管姓名", trigger: "blur" },
        ],
        linkPhone: [
          {
            required: true,
            message: "请输入业务联系人电话",
            trigger: "blur",
          },
          {
            validator: phoneNumber,
          },
        ],
        linkName: [
          { required: true, message: "请输入业务联系人姓名", trigger: "blur" },
        ],
        contractEndtime: [
          { required: true, message: "请选择合同结束时间", trigger: "change" },
          {
            validator: validateEndDate,
          },
        ],
        contractBegintime: [
          { required: true, message: "请选择合同开始时间", trigger: "change" },
        ],
        contractAmount: [
          { required: true, message: "请输入合同金额", trigger: "blur" },
          {
            validator: validateSingleBit,
          },
        ],
        storeAddress: [
          { required: true, message: "请输入公司地址", trigger: "blur" },
        ],
        areaId: [
          { required: true, message: "请输入邮政编码", trigger: "blur" },
          {
            validator: validatePostalCode,
          },
        ],
      },
    };
  },
  watch: {
    editData(newData) {
      this.initBaseData(newData);
    },
  },
  created() {
    getStoretype({
      data: {
        pId: 0,
        type: 1,
      },
    }).then((res) => {
      this.storeTypeP = res.data;
    });
  },
  methods: {
    onCheckPaymentId(obj) {
      this.$set(this.formInline, "paymentId", obj.id);
    },
    handleCheckPaymentId() {
      this.paymentDialogVisible = true;
    },
    storeTypePChange(value, storeType) {
      this.storeTypeC = [];
      this.$set(this.formInline, "storeType", storeType);
      if (!value) {
        return;
      }
      getStoretype({
        data: {
          pId: value,
          type: 1,
        },
      }).then((res) => {
        this.storeTypeC = res.data;
      });
    },
    validateForm(callBack) {
      this.$refs["baseForm"].validate((valid) => {
        if (valid) {
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
        storePTypeDesc,
        areaCode,
        companyAreaCode,
        id,
        name,
        shortName,
        createSource,
        storeLevel,
        paymentId,
        storeType,
        serviceType,
        bsManagerPhone,
        bsManagerName,
        fcManagerPhone,
        fcManagerName,
        linkPhone,
        linkName,
        contractEndtime,
        contractBegintime,
        invoiceForChanl,
        contractAmount,
        isPstore,
        storeAddress,
        areaId,
        cityChain,
        cityCover,
        totalName,
        totalAddress,
        vipSystem,
        cityVipNum,
        provinceVipNum,
        countryVipNum,
        cityUserNum,
        provinceUserNum,
        countryUserNum,
        onLineContact,
        appName,
        appletsName,
        wxPublicName,
        projectName,
        projectScale,
        projectApprovaName,
        cooperationType,
        merchantType,
        projectMessage,
      } = data.storeInfo;
      console.log("storePTypeDesc", storePTypeDesc);
      storePTypeDesc = storePTypeDesc ? storePTypeDesc.split(",") : [];
      console.log("storePTypeDesc", storePTypeDesc);
      this.formInline = {
        storeTypeP: storePTypeDesc.length > 1 ? Number(storePTypeDesc[1]) : "",
        areaCode: areaCode ? areaCode.split(",") : [],
        serviceType: serviceType ? serviceType.split(",") : [],
        companyAreaCode: companyAreaCode ? companyAreaCode.split(",") : [],
        storeType: storeType ? Number(storeType) : "",
        isPstore: isPstore ? Number(isPstore) : 0,
        invoiceForChanl: invoiceForChanl ? Number(invoiceForChanl) : 0,
        vipSystem: vipSystem ? Number(vipSystem) : 0,
        onLineContact: onLineContact ? Number(onLineContact) : 0,
        id,
        name,
        shortName,
        createSource,
        storeLevel,
        paymentId,
        bsManagerPhone,
        bsManagerName,
        fcManagerPhone,
        fcManagerName,
        linkPhone,
        linkName,
        contractEndtime,
        contractBegintime,
        contractAmount,
        storeAddress,
        areaId,
        cityChain,
        cityCover,
        totalName,
        totalAddress,
        cityVipNum,
        provinceVipNum,
        countryVipNum,
        cityUserNum,
        provinceUserNum,
        countryUserNum,
        appName,
        appletsName,
        wxPublicName,
        projectName,
        projectScale,
        projectApprovaName,
        cooperationType,
        merchantType,
        projectMessage,
      };
      console.log("storePTypeDesc", this.formInline);
      if (this.formInline.storeTypeP) {
        this.storeTypePChange(
          this.formInline.storeTypeP,
          this.formInline.storeType
        );
      }
    },
  },
};
</script>
