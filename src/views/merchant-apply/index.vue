<template>
  <div v-loading="tableLoading">
    <page-header title="申请入驻"> </page-header>
    <el-tabs v-model="activeName" class="details-el-tabs">
      <el-tab-pane label="首页" name="first">
        <div class="apply-content">
          <div class="apply-card" @click="handleClickCard">
            <div class="apply-card-content">
              <i class="apply-icon el-icon-circle-plus"></i>
              <div>
                {{ tableData.length ? "你已经申请过商户" : "自主申请入驻平台" }}
              </div>
            </div>
          </div>
          <div v-if="tableData.length">
            <div class="mb20">申请记录</div>
            <el-table :data="tableData" style="width: 100%" border>
              <el-table-column prop="storeId" label="商户编号" />
              <el-table-column prop="name" label="商户名称">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="handleGoDetails(scope.row)"
                  >
                    {{ scope.row.name }}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="createSource" label="商户来源" />
              <el-table-column prop="storeType" label="分类" />
              <el-table-column
                prop="createTime"
                label="申请时间"
                min-width="120"
              >
                <template slot-scope="scope">
                  {{ scope.row.createTime | dateFormatter }}
                </template>
              </el-table-column>
              <el-table-column prop="status" label="审核状态">
                <template slot-scope="scope">
                  {{ scope.row.status | statusString }}
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    v-if="
                      String(scope.row.fileStatus) == '1' ||
                      String(scope.row.fileStatus) == '3'
                    "
                    @click="handleSgin(scope.row)"
                    type="text"
                    size="small"
                    >签约</el-button
                  >
                  <el-button
                    v-else
                    @click="handleUpdate(scope.row)"
                    type="text"
                    size="small"
                    >修改</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              v-if="pageCount > 1"
              class="mt20"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="curPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount"
            >
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getStoretList } from "@/api/merchant";
export default {
  data() {
    return {
      activeName: "first",
      tableData: [],
      pageSize: 10,
      curPage: 1,
      totalCount: 0,
      pageCount: 0,
      tableLoading: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleGoDetails(row) {
      this.$router.push({
        name: "merchantApplyDetails",
        params: {
          id: row.storeId,
          status: row.status,
        },
      });
    },
    handleUpdate(row) {
      this.$router.push({
        name: "merchantApplyEdit",
        params: {
          id: row.storeId,
          status: row.status,
        },
        query: {
          routeName: this.$route.name,
        },
      });
    },
    handleSgin(row) {
      this.$router.push({
        name: "merchantApplySign",
        params: {
          id: row.storeId,
          status: row.status,
        },
        query: {
          routeName: this.$route.name,
        },
      });
    },
    handleClickCard() {
      if (this.tableData.length) {
        return;
      }
      this.$router.push({
        name: "merchantApplyJoin",
        query: {
          routeName: this.$route.name,
        },
      });
    },
    getData() {
      this.tableLoading = true;
      getStoretList({
        data: {
          type: "2",
          page: this.curPage,
          pageSize: this.pageSize,
        },
      })
        .then((res) => {
          let { list, curPage, pageSize, totalCount, pageCount } = res.data;
          this.tableData = list || [];
          this.pageSize = pageSize;
          this.curPage = curPage;
          this.totalCount = totalCount;
          this.pageCount = pageCount;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    handleSizeChange(value) {
      this.pageSize = value;
      this.getData();
    },
    handleCurrentChange(value) {
      this.curPage = value;
      this.getData();
    },
  },
};
</script>
<style lang="less" scoped>
.apply-content {
  min-height: calc(100vh - 200px);
  .apply-card {
    width: 25%;
    border-radius: 2px;
    height: 150px;
    background-color: #16a085;
    color: #fff;
    align-items: center;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    .apply-card-content {
      text-align: center;
      cursor: pointer;
      .apply-icon {
        font-size: 34px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
