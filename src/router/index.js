import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/components/Layout";
import LayoutEmpty from "@/components/LayoutEmpty";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home.vue"),
    hidden: true,
  },
  {
    path: "/my-merchant",
    name: "myMerchant",
    component: Layout,
    redirect: {
      name: "myMerchantDetiles",
    },
    meta: {
      title: "我的商户",
    },
    children: [
      {
        path: "details",
        name: "myMerchantDetiles",
        component: () => import("../views/my-merchant/details.vue"),
        meta: {
          title: "商户详情",
          hidden: true,
        },
      },
    ],
  },
  {
    path: "/merchant-apply",
    name: "merchantApply",
    component: Layout,
    redirect: {
      name: "merchantApply",
    },
    meta: {
      title: "自主申请",
      permission: "merchantsenter",
    },
    children: [
      {
        path: "by-self",
        name: "merchantApplyBySelf",
        component: LayoutEmpty,
        meta: {
          title: "申请入驻",
          permission: "merchantsenter#opreate",
        },
        redirect: {
          name: "merchantApplyBySelfIndex",
        },
        children: [
          {
            path: "index",
            name: "merchantApplyBySelfIndex",
            component: () => import("../views/merchant-apply/index.vue"),
            meta: {
              hidden: true,
              hiddenBreadcrumb: true,
              activeName: "merchantApplyBySelf",
              permission: "merchantsenter#opreate",
            },
          },
          {
            path: "join",
            name: "merchantApplyJoin",
            component: () => import("../views/merchant/list/join.vue"),
            meta: {
              title: "商户入驻",
              hidden: true,
              activeName: "merchantApplyBySelf",
              permission: "merchantsenter#opreate#addbyself",
            },
          },
          {
            path: "edit/:id/:status",
            name: "merchantApplyEdit",
            component: () => import("../views/merchant/list/join.vue"),
            meta: {
              title: "商户编辑",
              hidden: true,
              activeName: "merchantApplyBySelf",
            },
          },
          {
            path: "sign",
            name: "merchantApplySign",
            component: () => import("../views/merchant/list/join.vue"),
            meta: {
              title: "商户入驻",
              hidden: true,
              activeName: "merchantApplyBySelf",
            },
          },
        ],
      },
    ],
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
      permission: "storemange",
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
          permission: "storemange#list",
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
              activeName: "MerchantList",
              permission: "storemange#list",
            },
          },
          {
            path: "join",
            name: "MerchantListJoin",
            component: () => import("../views/merchant/list/join.vue"),
            meta: {
              title: "商户入驻",
              hidden: true,
              activeName: "MerchantList",
              permission: "storemange#list#addstore",
            },
          },
          {
            path: "update/:id/:status",
            name: "MerchantListUpdate",
            component: () => import("../views/merchant/list/join.vue"),
            meta: {
              title: "商户编辑",
              hidden: true,
              activeName: "MerchantList",
            },
          },
          {
            path: "sign/:id/:status",
            name: "MerchantListSignt",
            component: () => import("../views/merchant/list/join.vue"),
            meta: {
              title: "商户签约",
              hidden: true,
              activeName: "MerchantList",
            },
          },
          {
            path: "sign-audit/:id/:status",
            name: "MerchantListSignAudit",
            component: () => import("../views/merchant/list/join.vue"),
            meta: {
              title: "商户签约",
              hidden: true,
              activeName: "MerchantList",
            },
          },
          {
            path: "audit/:id/:status",
            name: "MerchantListAudit",
            component: () => import("../views/merchant/list/audit.vue"),
            meta: {
              title: "商户审核",
              hidden: true,
              activeName: "MerchantList",
            },
          },
          {
            path: "details/:id/:status",
            name: "MerchantListDetails",
            component: LayoutEmpty,
            meta: {
              title: "商户详情",
              hidden: true,
              activeName: "MerchantList",
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
                  activeName: "MerchantList",
                },
              },
              {
                path: "store/add",
                name: "MerchantListDetailsStoreAdd",
                component: () => import("../views/merchant/store/add.vue"),
                meta: {
                  title: "添加门店",
                  hidden: true,
                  activeName: "MerchantList",
                },
              },
              {
                path: "store/edit/:storeId",
                name: "MerchantListDetailsStoreEdit",
                component: () => import("../views/merchant/store/add.vue"),
                meta: {
                  title: "修改门店",
                  hidden: true,
                  activeName: "MerchantList",
                },
              },
              {
                path: "account/add",
                name: "MerchantListDetailsAccountAdd",
                component: () => import("../views/merchant/account/add.vue"),
                meta: {
                  title: "添加账号",
                  hidden: true,
                  activeName: "MerchantList",
                },
              },
              {
                path: "account/edit/:accountId",
                name: "MerchantListDetailsAccountEdit",
                component: () => import("../views/merchant/account/add.vue"),
                meta: {
                  title: "修改账号",
                  hidden: true,
                  activeName: "MerchantList",
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
                  activeName: "MerchantList",
                },
              },
              {
                path: "children-store/detail/:childrenId/:childrenStatus",
                name: "MerchantListDetailsChildrenStoreDetail",
                component: () => import("../views/merchant/list/c-details.vue"),
                meta: {
                  title: "子商户详情",
                  hidden: true,
                  activeName: "MerchantList",
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
              activeName: "MerchantStore",
              permission: "storemange#shopmanage",
            },
          },
          {
            path: "edit/:storeId",
            name: "MerchantStoreEdit",
            component: () => import("../views/merchant/store/add.vue"),
            meta: {
              title: "修改门店",
              hidden: true,
              activeName: "MerchantStore",
            },
          },
          {
            path: "audit/:storeId",
            name: "MerchantStoreAudit",
            component: () => import("../views/merchant/store/audit.vue"),
            meta: {
              title: "门店详情",
              hidden: true,
              activeName: "MerchantStore",
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
      permission: "sysmanage",
    },
    children: [
      {
        path: "play",
        name: "SettingPlay",
        component: LayoutEmpty,
        meta: {
          title: "支付设置",
          permission: "sysmanage#paymentset",
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
              activeName: "SettingPlay",
              permission: "sysmanage#paymentset",
            },
          },
          {
            path: "add",
            name: "SettingPlayAdd",
            component: () => import("../views/setting/add-play.vue"),
            meta: {
              title: "添加支付方式",
              hidden: true,
              activeName: "SettingPlay",
            },
          },
          {
            path: "update/:id",
            name: "SettingPlayUpdate",
            component: () => import("../views/setting/add-play.vue"),
            meta: {
              title: "修改支付方式",
              hidden: true,
              activeName: "SettingPlay",
            },
          },
          {
            path: "show/:id",
            name: "SettingPlayShow",
            component: () => import("../views/setting/show-play.vue"),
            meta: {
              title: "支付方式详情",
              hidden: true,
              activeName: "SettingPlay",
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
    component: Layout,
    meta: {
      title: "404",
      hidden: true,
    },
    redirect: {
      name: "404Home",
    },
    children: [
      {
        path: "home",
        name: "404Home",
        component: () => import("@/views/404"),
        meta: {
          title: "404",
          hidden: true,
        },
      },
    ],
  },
  {
    path: "/403",
    name: "403",
    component: Layout,
    redirect: {
      name: "403Home",
    },
    meta: {
      title: "403",
      hidden: true,
    },
    children: [
      {
        path: "home",
        name: "403Home",
        component: () => import("@/views/403"),
        meta: {
          title: "403",
          hidden: true,
        },
      },
    ],
  },
  { path: "*", redirect: "/404", hidden: true },
];

const router = new VueRouter({
  routes,
});

export default router;
