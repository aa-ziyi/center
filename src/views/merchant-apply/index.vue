<template>
  <div>
    <page-header title="申请入驻"> </page-header>
    <el-tabs v-model="activeName" class="details-el-tabs">
      <el-tab-pane label="首页" name="first">
        <div class="apply-content">
          <div class="apply-card" @click="handleClickCard">
            <div class="apply-card-content">
              <i class="apply-icon el-icon-circle-plus"></i>
              <div>自主申请入驻平台</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClickCard() {
      this.$router.push({
        name: "merchantApplyJoin",
        query: {
          routeName: this.$route.name,
        },
      });
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
