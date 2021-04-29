<template>
  <div>
    <page-header title="门店详情"></page-header>
    <el-tabs v-model="activeName" class="details-el-tabs">
      <el-tab-pane label="门店详情" name="first">
        <el-form
          ref="baseForm"
          :model="formInline"
          label-width="150px"
          class="el-form-static"
        >
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="门店编号:" prop="id" v-if="formInline.id">
                {{ formInline.id }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="门店名称:" prop="name">
                {{ formInline.name }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="门店简称:" prop="shortName">
                {{ formInline.shortName }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="门店分类:" prop="type">
                {{ formInline.typeNameDesc }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="归属城市:" prop="areaCode">
                {{ formInline.areaCode }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地图坐标经度:" prop="mapLong">
                {{ formInline.mapLong }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地图坐标纬度:" prop="mapDim">
                {{ formInline.mapDim }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="有效开始时间:" prop="startTime">
                {{ formInline.startTime }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="有效结束时间:" prop="stopTime">
                {{ formInline.stopTime }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="营业时间:" prop="openTime">
                {{ formInline.openTime }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="人均消费:" prop="avgSpend">
                {{ formInline.avgSpend }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="门店手机号码:" prop="phone">
                {{ formInline.phone }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="包间数:" prop="roomNum">
                {{ formInline.roomNum }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公交线路:" prop="busLine">
                {{ formInline.busLine }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="停车位:" prop="parkPlace">
                {{ formInline.parkPlace }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="面积:" prop="area">
                {{ formInline.area }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="门店地址:" prop="storeAddress">
                {{ formInline.areaCode }}{{ formInline.storeAddress }}
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="门店备注:" prop="remark">
                {{ formInline.remark }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="门店logo:" prop="log">
                <img :src="formInline.logPath" style="width: 100px" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button
              v-if="$route.query.type != 'show'"
              type="primary"
              @click="onSubmit('1')"
              >审核通过</el-button
            >
            <el-button
              v-if="$route.query.type != 'show'"
              class="ml20"
              type="primary"
              @click="onSubmit('0')"
            >
              审核驳回
            </el-button>
            <el-button class="ml20" @click="back">返回</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

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
      activeName: "first",
      storeTypeP: [],
      storeTypeC: [],
      formInline: {
        companyAreaCode: ["360000", "360100"],
        areaCode: ["360000", "360100"],
      },
      dialogFormVisible: false,
      auditForm: {},
      auditFormRules: {
        remark: [
          {
            required: true,
            message: "请输入原因",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  created() {
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
          this.formInline = res.data.shopInfo;
        })
        .finally(() => {
          this.loading = false;
        });
    },
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
            this.back();
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
    back() {
      this.$router.push({
        name: "MerchantStoreIndex",
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
