export default {
  pages: [
    "pages/home/index",
    "pages/login/index",
    "pages/mine/index",
    "pages/college/lib/index",
    "pages/college/detail/index",
    "pages/subject/lib/index",
    "pages/subject/list/index",
    "pages/subject/detail/index",
    "pages/choose/index/index",
    "pages/choose/college/index",
    "pages/score/index",
    "pages/guide/index",
  ],
  subpackages: [
    {
      root: "pages/volunteer/",
      pages: [
        "tutor/index",
        "prefer/index",
        "review/index",
        "online/index",
        "batch/index",
        "batchInfo/index",
      ],
    },
    {
      root: "pages/evaluation/",
      pages: ["readme/index", "exam/index"],
    },
    {
      root: "pages/user/",
      pages: ["income/index", "record/index"],
    },
  ],
  tabBar: {
    color: "#333333",
    selectedColor: "#EA4438",
    backgroundColor: "#ffffff",
    list: [
      {
        iconPath: "static/image/home-nor.png",
        selectedIconPath: "static/image/home-sel.png",
        text: "首页",
        pagePath: "pages/home/index",
      },
      {
        iconPath: "static/image/mine-nor.png",
        selectedIconPath: "static/image/mine-sel.png",
        text: "我的",
        pagePath: "pages/mine/index",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
};
