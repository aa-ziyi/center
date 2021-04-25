<template>
  <div>
    <page-header title="门店审核"></page-header>
    <el-card class="add-store-card">
      <div slot="header" class="space-between">
        <div>门店审核</div>
      </div>
      <el-form ref="baseForm" :model="formInline" label-width="150px">
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
            <el-form-item label="门店分类:" prop="type"> </el-form-item>
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
            <el-form-item label="门店地址:" prop="storeAddress">
              <el-row>
                <el-col :span="12">
                  <area-cascader v-model="formInline.areaCode" />
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
          <el-col :span="10"></el-col>
          <el-col :span="12">
            <el-form-item label="门店logo:" prop="log"> </el-form-item>
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
          <el-button type="primary" @click="onSubmit('1')">审核通过</el-button>
          <el-button class="ml20" type="primary" @click="onSubmit('0')">
            审核驳回
          </el-button>
          <el-button class="ml20" @click="onBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog title="审核" :visible.sync="dialogFormVisible">
      <el-form
        ref="audit-form"
        v-if="dialogFormVisible"
        :model="auditForm"
        :rules="auditFormRules"
      >
        <el-form-item label="输入原因" prop="remark">
          <el-input
            v-model="auditForm.remark"
            type="textarea"
            :rows="6"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleAudit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { shopManageView, shopManageAduit } from "@/api/shop";
export default {
  data() {
    return {
      storeTypeP: [],
      storeTypeC: [],
      formInline: {
        companyAreaCode: ["360000", "360100"],
        areaCode: ["360000", "360100"],
      },
      dialogFormVisible: false,
      auditForm: {},
      loading: false,
    };
  },
  computed: {
    auditFormRules() {
      return {
        remark: [
          {
            required: this.auditForm.status == "0",
            message: "请输入商户名称",
            trigger: "blur",
          },
        ],
      };
    },
  },
  methods: {
    handleAudit() {
      this.$refs["audit-form"].validate((valid) => {
        if (valid) {
          shopManageAduit({
            data: {
              id: this.$route.params.storeId,
              ...this.auditForm,
            },
          }).then(() => {
            this.$message.success("操作成功");
            this.dialogFormVisible = false;
            this.$router.push({
              name: "MerchantListIndex",
              query: {
                activeName: this.$route.query.activeName,
              },
            });
          });
        }
      });
    },
    handleClose() {
      this.dialogFormVisible = false;
    },
    onSubmit(status) {
      this.auditForm = {
        status,
      };
      this.dialogFormVisible = true;
    },
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
            logPath,
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
