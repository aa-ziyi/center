import Vue from "vue";
import { hasPermission } from "@/utils/tool";

Vue.directive("has", {
  inserted: function (el, binding) {
    if (!hasPermission(binding.value)) {
      el.parentNode.removeChild(el);
    }
  },
});
