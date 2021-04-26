<template>
  <div class="space-between header">
    <span>{{ title }}</span>
    <div>
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
  z-index: 10;
  background-color: #fff;
}
</style>
