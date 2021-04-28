<template>
  <div class="home" v-loading="true"></div>
</template>

<script>
import { getCurrentUser, getRolePathName } from "@/utils/auth";
export default {
  name: "Home",
  components: {},
  created() {
    let user = getCurrentUser();
    if (!user) {
      this.$router.push({
        name: "Login",
      });
      return;
    }
    let name = getRolePathName(user);
    if (name) {
      this.$router.push({
        name,
      });
      return;
    }
    this.$router.push({
      name: "403",
    });
  },
};
</script>

<style scoped>
.home {
  height: 80vh;
}
</style>
