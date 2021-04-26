<template>
  <div class="home" v-loading="true"></div>
</template>

<script>
import { getCurrentUser, getRolePathName } from "@/utils/auth";
export default {
  name: "Home",
  components: {},
  created() {
    this.$router.push("/merchant");
    let user = getCurrentUser() || {};
    let name = getRolePathName(user);
    this.$router.push({
      name,
    });
  },
};
</script>

<style scoped>
.home {
  height: 80vh;
}
</style>
