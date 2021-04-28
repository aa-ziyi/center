import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Element from "element-ui";
import AMap from "vue-amap";

import "./permission"; // permission control
import "@/filters/index.js";
import "@/directive/index.js";
import "@/components/Common";
import { hasPermission } from "@/utils/tool";

import "element-ui/lib/theme-chalk/index.css";
import "@/styles/main.less";

Vue.prototype.$hasPermission = hasPermission;
Vue.prototype.$getDownFileUrl = downFileUrl;

Vue.use(AMap);
Vue.use(Element);

AMap.initAMapApiLoader({
  key: "3be7fa233bc71d2a837d5ac073b63df0",
  plugin: [
    "AMap.Geolocation",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
  ],
  uiVersion: "1.0.11", // ui库版本，不配置不加载,
  v: "1.4.4",
});
Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

function downFileUrl(storeId, fileId) {
  return `http://118.24.122.189:8009/store-center/manage/store/downfile?id=${storeId}&fileId=${fileId}`;
}
