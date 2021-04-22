import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "./permission"; // permission control
import "@/filters/index.js";
import "@/components/Common";
import "@/styles/main.less";

Vue.use(Element);
Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
