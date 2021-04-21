<template>
  <div>
    <el-form
      ref="baseForm"
      :model="formInline"
      :rules="formRules"
      class="demo-form-inline"
      label-width="150px"
    >
      {{ formInline }}
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
          <el-form-item label="商户来源:" prop="createSoruce">
            <el-select v-model="formInline.createSoruce" placeholder="请选择">
              <el-option
                v-for="(option, index) in prestoreinfoData.createSrouce"
                :key="index"
                :label="option"
                :value="index"
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
          <el-form-item
            label="支付信息编号:"
            prop="user"
            v-if="formInline.user"
          >
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商户分类:" prop="storeType">
            <el-select
              v-model="formInline.storeType1"
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
              v-model="formInline.storeType2"
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
            <el-radio-group v-model="formInline.serviceType">
              <el-radio label="1">实物商品</el-radio>
              <el-radio label="2">虚拟商品</el-radio>
            </el-radio-group>
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
              <el-radio label="0">不支持</el-radio>
              <el-radio label="1">支持</el-radio>
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
          <el-form-item label="是否主商户:" prop="pStoreId">
            <el-radio-group v-model="formInline.pStoreId">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司地址:" prop="storeAddress">
            {{ formInline.city }}
            <el-row>
              <el-col :span="12">
                <area-cascader v-model="formInline.city" />
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
import { getStoretype } from "@/api/merchant.js";
import {
  validateSingleBit,
  phoneNumber,
  validatePostalCode,
} from "@/utils/validate";
export default {
  props: {
    prestoreinfoData: {
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
      storeTypeP: [],
      storeTypeC: [],
      formInline: {
        id: 1,
        user: 1,
        pStoreId: "0",
        invoiceForChanl: "0",
      },
      formRules: {
        name: [{ required: true, message: "请输入商户名称", trigger: "blur" }],
        createSoruce: [
          { required: true, message: "请选择商户来源", trigger: "change" },
        ],
        storeLevel: [
          { required: true, message: "请选择商户级别", trigger: "change" },
        ],
        storeType: [{ required: true, message: "请选择商户分类" }],
        serviceType: [
          { required: true, message: "请选择服务类型", trigger: "change" },
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
    storeTypePChange(value) {
      this.storeTypeC = [];
      this.$set(this.formInline, "storeType2", "");
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
    onSubmit() {
      this.$refs["baseForm"].validate((valid) => {
        if (valid) {
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
