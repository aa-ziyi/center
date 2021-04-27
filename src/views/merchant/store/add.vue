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
        {{ formInline }}
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="门店编号:" prop="id" v-if="formInline.id">
              {{ formInline.id }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="门店名称:" prop="name">
              <el-input
                v-model="formInline.name"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="门店简称:" prop="shortName">
              <el-input
                v-model="formInline.shortName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="门店分类:" prop="type">
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
                v-model="formInline.type"
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
            <el-form-item label="归属城市:" prop="areaCode">
              <area-cascader v-model="formInline.areaCode" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地图坐标经度:" prop="mapLong">
              <el-input
                v-model="formInline.mapLong"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地图坐标纬度:" prop="mapDim">
              <el-input
                v-model="formInline.mapDim"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效开始时间:" prop="startTime">
              <el-date-picker
                v-model="formInline.startTime"
                type="datetime"
                placeholder="请选择"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效结束时间:" prop="stopTime">
              <el-date-picker
                v-model="formInline.stopTime"
                type="datetime"
                placeholder="请选择"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业时间:" prop="openTime">
              <el-date-picker
                v-model="formInline.openTime"
                type="datetime"
                placeholder="请选择"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人均消费:" prop="avgSpend">
              <el-input
                v-model="formInline.avgSpend"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="门店手机号码:" prop="phone">
              <el-input
                v-model="formInline.phone"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="包间数:" prop="roomNum">
              <el-input
                v-model="formInline.roomNum"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公交线路:" prop="busLine">
              <el-input
                v-model="formInline.busLine"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="停车位:" prop="parkPlace">
              <el-input
                v-model="formInline.parkPlace"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="面积:" prop="area">
              <el-row>
                <el-col :span="24">
                  <el-input
                    v-model="formInline.area"
                    placeholder="请输入"
                  ></el-input>
                </el-col>
                <!-- <el-col :span="8">（单位：） </el-col> -->
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="门店地址:" prop="address ">
              <el-row>
                <el-col :span="12">
                  <area-cascader v-model="formInline.areaCode" />
                </el-col>
                <el-col :span="12">
                  <el-input
                    v-model="formInline.address"
                    placeholder="请输入"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="10"></el-col>
          <el-col :span="12">
            <el-form-item label="门店logo:" prop="log">
              <div><img :src="prewiewUrl" style="width: 100px" /></div>
              <el-button @click="handleClickFile('log')">上传文件</el-button>
              <input
                type="file"
                @change="($event) => uploadImg($event, 'log')"
                ref="log"
                style="display: none"
                accept="image/png,image/jpeg,image/jpg,image/gif"
              />
              <div class="el-form-tip">支持扩展名：png、jpeg、jpg、gif</div>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
          <el-col :span="12">
            <el-form-item label="门店备注:" prop="remark">
              <el-input
                type="textarea"
                :rows="4"
                v-model="formInline.remark"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="back" class="ml20">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { scrollTo } from "@/utils/scroll-to.js";
import {
  validateSingleBit,
  phoneNumber,
  validatePositiveInteger,
} from "@/utils/validate";
import { getStoretype } from "@/api/merchant.js";
import { shopManageAdd, shopManageView, shopManageEdit } from "@/api/shop";
import { jsToFormData } from "@/utils/tool";
export default {
  data() {
    return {
      prewiewUrl: "",
      storeTypeP: [],
      storeTypeC: [],
      formInline: {
        companyAreaCode: ["360000", "360100"],
        areaCode: ["360000", "360100"],
      },
    };
  },
  computed: {
    formRules() {
      return {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        shortName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择活动分类", trigger: "change" },
        ],
        areaCode: [
          { required: true, message: "请选择归属城市", trigger: "change" },
        ],
        mapLong: [
          { required: true, message: "请选择地图坐标经度", trigger: "blur" },
        ],
        mapDim: [
          { required: true, message: "请选择地图坐标纬度", trigger: "blur" },
        ],
        startTime: [
          { required: true, message: "请选择有效开始时间", trigger: "change" },
        ],
        stopTime: [
          { required: true, message: "请选择有效结束时间", trigger: "change" },
        ],
        address: [
          { required: true, message: "请输入门店地址", trigger: "blur" },
        ],
        openTime: [
          { required: true, message: "请选择营业时间", trigger: "change" },
        ],
        phone: [
          { required: true, message: "请选择门店手机号码", trigger: "change" },
          {
            validator: phoneNumber,
          },
        ],
        roomNum: [
          {
            validator: validatePositiveInteger,
            trigger: "blur",
          },
        ],
        avgSpend: [
          {
            validator: validateSingleBit,
          },
        ],
        area: [
          {
            validator: validateSingleBit,
          },
        ],
        parkPlace: [
          {
            validator: validatePositiveInteger,
          },
        ],
        log: [
          {
            required: !this.formInline.logPath,
            message: "请上传门店logo",
            trigger: "change",
          },
        ],
      };
    },
  },
  created() {
    getStoretype({
      data: {
        pId: "0",
        type: "4",
      },
    }).then((res) => {
      this.storeTypeP = res.data;
    });
    if (this.$route.params.storeId) {
      this.getData(this.$route.params.storeId);
    }
  },
  methods: {
    getData(id) {
      this.loading = true;
      shopManageView({
        data: {
          id,
        },
      })
        .then((res) => {
          let data = res.data.shopInfo;
          let {
            createTime,
            createUserName,
            isValid,
            status,
            updateTime,
            updateUserid,
            areaCode,
            ...other
          } = data;
          this.formInline = {
            ...other,
            areaCode: areaCode ? areaCode.split(",") : [],
          };
        })
        .finally(() => {
          this.loading = false;
        });
    },
    storeTypePChange(value) {
      this.storeTypeC = [];
      this.$set(this.formInline, "storeType", "");
      if (!value) {
        return;
      }
      getStoretype({
        data: {
          pId: value,
          type: "4",
        },
      }).then((res) => {
        this.storeTypeC = res.data;
      });
    },
    handleClickFile(file) {
      this.$refs[file].click(); //上传文件
    },
    uploadImg($event, fileName) {
      let files = $event.target.files;
      this.$set(this.formInline, fileName, files);
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        this.prewiewUrl = e.target.result;
        console.log("prewiewUrl", this.prewiewUrl);
      };
    },
    onSubmit() {
      this.$refs["baseForm"].validate((valid) => {
        if (valid) {
          this.saveData();
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
    saveData() {
      let {
        companyAreaCode = [],
        areaCode = [],
        log,
        logPath,
        ...other
      } = this.formInline;
      let data = {
        sgin: {
          ...other,
          companyAreaCode: companyAreaCode.length
            ? companyAreaCode[companyAreaCode.length - 1]
            : "",
          areaCode: areaCode.length ? areaCode[areaCode.length - 1] : "",
          storeId: this.$route.params.id,
        },
        log,
      };
      let _data = jsToFormData(data);
      let method = this.$route.params.storeId ? shopManageEdit : shopManageAdd;
      method({
        data: _data,
      }).then(() => {
        this.$message.success("提交成功");
        this.back();
      });
    },
    back() {
      this.$router.push({
        name: this.$route.query.routeName,
        params: this.$route.params,
        query: {
          activeName: this.$route.query.activeName,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.add-store-card {
  margin: 20px;
}
</style>
