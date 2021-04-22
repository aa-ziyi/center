import Vue from "vue";
import * as filters from "./filter"; // global filters

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
