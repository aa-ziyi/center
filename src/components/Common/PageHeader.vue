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
  padding: 5px 20px 15px;
  background-color: #fff;
}
</style>
