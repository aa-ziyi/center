import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import Layout from "@/components/Layout";
import LayoutEmpty from "@/components/LayoutEmpty";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    hidden: true,
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: () =>
      import(/* webpackChunkName: "welcome" */ "../views/welcome.vue"),
  },
  {
    path: "/merchant",
    name: "Merchant",
    component: Layout,
    redirect: {
      name: "MerchantList",
    },
    meta: {
      title: "商品管理",
    },
    children: [
      {
        path: "list",
        name: "MerchantList",
        component: LayoutEmpty,
        redirect: {
          name: "MerchantListIndex",
        },
        meta: {
          title: "商户列表",
        },
        children: [
          {
            path: "index",
            name: "MerchantListIndex",
            component: () => import("../views/merchant/list/index.vue"),
            meta: {
              title: "商户列表",
              hidden: true,
              hiddenBreadcrumb: true,
            },
          },
          {
            path: "join",
            name: "MerchantListJoin",
            component: () => import("../views/merchant/list/join.vue"),
            meta: {
              title: "商户入驻",
              hidden: true,
            },
          },
          {
            path: "update/:id/:status",
            name: "MerchantListUpdate",
            component: () => import("../views/merchant/list/join.vue"),
            meta: {
              title: "商户编辑",
              hidden: true,
            },
          },
          {
            path: "audit/:id/:status",
            name: "MerchantListAudit",
            component: () => import("../views/merchant/list/audit.vue"),
            meta: {
              title: "商户审核",
              hidden: true,
            },
          },
          {
            path: "details/:id/:status",
            name: "MerchantListDetails",
            component: LayoutEmpty,
            meta: {
              title: "商户详情",
              hidden: true,
            },
            redirect: {
              name: "MerchantListDetailsIndex",
            },
            children: [
              {
                path: "index",
                name: "MerchantListDetailsIndex",
                component: () => import("../views/merchant/list/details.vue"),
                meta: {
                  hidden: true,
                  hiddenBreadcrumb: true,
                },
              },
              {
                path: "store/add",
                name: "MerchantListDetailsStoreAdd",
                component: () => import("../views/merchant/store/add.vue"),
                meta: {
                  title: "添加门店",
                  hidden: true,
                },
              },
              {
                path: "store/edit/:storeId",
                name: "MerchantListDetailsStoreEdit",
                component: () => import("../views/merchant/store/add.vue"),
                meta: {
                  title: "修改门店",
                  hidden: true,
                },
              },
              {
                path: "account/add",
                name: "MerchantListDetailsAccountAdd",
                component: () => import("../views/merchant/account/add.vue"),
                meta: {
                  title: "添加账号",
                  hidden: true,
                },
              },
              {
                path: "account/edit/:accountId",
                name: "MerchantListDetailsAccountEdit",
                component: () => import("../views/merchant/account/add.vue"),
                meta: {
                  title: "修改账号",
                  hidden: true,
                },
              },
              {
                path: "children-store/add",
                name: "MerchantListDetailsChildrenStoreAdd",
                component: () =>
                  import("../views/merchant/children-store/add.vue"),
                meta: {
                  title: "添加子商户",
                  hidden: true,
                },
              },
              {
                path: "children-store/detail/:childrenId/:childrenStatus",
                name: "MerchantListDetailsChildrenStoreDetail",
                component: () => import("../views/merchant/list/c-details.vue"),
                meta: {
                  title: "子商户详情",
                  hidden: true,
                },
              },
            ],
          },
        ],
      },
      {
        path: "store",
        name: "MerchantStore",
        meta: {
          title: "门店列表",
        },
        redirect: {
          name: "MerchantStoreIndex",
        },
        component: LayoutEmpty,
        children: [
          {
            path: "index",
            name: "MerchantStoreIndex",
            component: () => import("../views/merchant/store/index.vue"),
            meta: {
              hidden: true,
              hiddenBreadcrumb: true,
            },
          },
          {
            path: "edit/:id",
            name: "MerchantStoreEdit",
            component: () => import("../views/merchant/store/add.vue"),
            meta: {
              title: "修改门店",
              hidden: true,
            },
          },
        ],
      },
    ],
  },
  {
    path: "/setting",
    name: "Setting",
    component: Layout,
    redirect: {
      name: "SettingPlay",
    },
    meta: {
      title: "系统管理",
    },
    children: [
      {
        path: "play",
        name: "SettingPlay",
        component: LayoutEmpty,
        meta: {
          title: "支付设置",
        },
        redirect: {
          name: "SettingPlayIndex",
        },
        children: [
          {
            path: "index",
            name: "SettingPlayIndex",
            component: () => import("../views/setting/play.vue"),
            meta: {
              hiddenBreadcrumb: true,
              hidden: true,
            },
          },
          {
            path: "add",
            name: "SettingPlayAdd",
            component: () => import("../views/setting/add-play.vue"),
            meta: {
              title: "添加支付方式",
              hidden: true,
            },
          },
          {
            path: "update/:id",
            name: "SettingPlayUpdate",
            component: () => import("../views/setting/add-play.vue"),
            meta: {
              title: "修改支付方式",
              hidden: true,
            },
          },
          {
            path: "show/:id",
            name: "SettingPlayShow",
            component: () => import("../views/setting/show-play.vue"),
            meta: {
              title: "支付方式详情",
              hidden: true,
            },
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/403"),
    hidden: true,
  },
  { path: "*", redirect: "/404", hidden: true },
];

const router = new VueRouter({
  routes,
});

export default router;
