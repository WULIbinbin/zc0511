export default {
  pages: [
    'pages/home/index',
    'pages/mine/index',
    'pages/college/lib/index',
    'pages/college/detail/index',
    'pages/subject/lib/index',
    'pages/subject/list/index',
    'pages/subject/detail/index',
  ],
  tabBar: {
    color: '#333333',
    selectedColor: '#EA4438',
    backgroundColor: '#ffffff',
    list: [
      {
        iconPath: 'static/image/home-nor.png',
        selectedIconPath: 'static/image/home-sel.png',
        text: '首页',
        pagePath: 'pages/home/index',
      },
      {
        iconPath: 'static/image/mine-nor.png',
        selectedIconPath: 'static/image/mine-sel.png',
        text: '我的',
        pagePath: 'pages/mine/index',
      },
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  }
}
