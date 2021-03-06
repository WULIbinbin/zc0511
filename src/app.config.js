export default {
  pages: [
    "pages/home/index",
    "pages/login/index",
    "pages/mine/index",
    "pages/college/lib/index",
    "pages/college/detail/index",
    "pages/college/score/index",
    "pages/subject/lib/index",
    "pages/subject/list/index",
    "pages/subject/detail/index",
    "pages/choose/index/index",
    "pages/choose/college/index",
    "pages/webview/index",
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
        "reviewDetail/index",
        "tutorDetail/index",
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
    {
      root: "pages/befit/",
      pages: ["index/index", "list/index"],
    },
    {
      root: "pages/vip/",
      pages: ["guide/index", "bind/index", "report/index"],
    },
    {
      root: "pages/recommend/",
      pages: ["index/index", "list/index"],
    },
    {
      root: "pages/example/",
      pages: ["index/index"],
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
        text: "้ฆ้กต",
        pagePath: "pages/home/index",
      },
      {
        iconPath: "static/image/mine-nor.png",
        selectedIconPath: "static/image/mine-sel.png",
        text: "ๆ็",
        pagePath: "pages/mine/index",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#ffffff",
    navigationBarTextStyle: "black",
    // backgroundColor: "#f7f7f7",
    // navigationBarTitleText: "",
  },
};
