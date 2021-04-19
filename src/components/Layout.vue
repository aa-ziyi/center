<template>
  <el-container>
    <el-aside style="width: 200px">
      <LeftMenu />
    </el-aside>
    <el-container>
      <el-header>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="route in currentMatched"
            :key="route.name"
            :to="{ name: route.name }"
          >
            {{ route.meta && route.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LeftMenu from "@/components/LeftMenu";
export default {
  components: {
    LeftMenu,
  },
  data() {
    return {
      currentMatched: [],
    };
  },
  watch: {
    $route(newRoute) {
      let matched = newRoute.matched;
      this.initMatched(matched);
    },
  },
  created() {
    let matched = this.$route.matched;
    this.initMatched(matched);
  },
  methods: {
    initMatched(matched) {
      this.currentMatched = matched.filter((route) => {
        return route.meta && !route.meta.hiddenBreadcrumb;
      });
    },
  },
};
</script>

<style>
.el-header {
  color: #333;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-aside {
  color: #333;
  height: 100vh;
  background-color: #16a085;
}
.el-main.main {
  background-color: #f4f4f4;
  min-height: 100vh;
  padding: 0;
}
</style>
