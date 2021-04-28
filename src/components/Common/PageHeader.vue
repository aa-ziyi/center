<template>
  <div class="header">
    <span>{{ title }}</span>
    <div class="header-op">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  padding: 0 20px 10px;
  min-height: 30px;
  position: fixed;
  left: 200px;
  right: 0;
  top: 50px;
  z-index: 100;
  background-color: #fff;
  .header-op {
    position: absolute;
    bottom: -20px;
    right: 20px;
  }
}
</style>
