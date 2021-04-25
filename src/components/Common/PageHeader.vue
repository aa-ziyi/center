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
  background-color: #fff;
  min-height: 30px;
}
</style>
