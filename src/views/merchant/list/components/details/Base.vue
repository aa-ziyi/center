<template>
  <div>
    <MerchantsDetails :status="$route.params.status" />
  </div>
</template>

<script>
import MerchantsDetails from "../MerchantsDetails";
export default {
  components: {
    MerchantsDetails,
  },
  data() {
    return {};
  },
};
</script>
