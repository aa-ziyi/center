<template>
  <div @click="handleClickCard">自主申请入驻平台</div>
</template>
<script>
export default {
  methods: {
    handleClickCard() {
      this.$router.push({
        name: "MerchantJoin",
      });
    },
  },
};
</script>
