import router from "./router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import getPageTitle from "./utils/get-page-title";
import { getToken, getCurrentUser } from "./utils/auth";
import { hasPermission } from "@/utils/tool";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["Login", "403", "404"];
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title);
  if (whiteList.indexOf(to.name) > -1) {
    next();
    NProgress.done();
    return;
  }
  if (!getToken() || !getCurrentUser()) {
    next({
      name: "Login",
      replace: true,
    });
    NProgress.done();
    return;
  }
  let { permission } = to.meta || {};
  if (permission && !hasPermission(permission)) {
    next({
      name: "403",
      replace: true,
    });
    NProgress.done();
    return;
  }
  // 判断路由权限
  next();
  NProgress.done();
});

router.afterEach(() => {
  NProgress.done();
});
