import Taro, { request } from "@tarojs/taro";

export const Environment = "DEV";

export const getConfig = () => {
  const config = {
    DEV: {
      appId: "wx2671abc7f83d2f0c",
      baseUrl: "https://r16754555n.51mypc.cn",
    },
  };
  return config[Environment];
};

const whiteList = [
  "/wx/miniprogram/user/login",
  "/wx/miniprogram/user/phone",
  "/oauth/token",
  "/wx/miniprogram/user/getBanner",
];

export function Request({ data = {}, url = "", method = "GET" }) {
  const { baseUrl } = getConfig();
  const TokenStorage = Taro.getStorageSync("token");
  const header = {};
  if (TokenStorage && TokenStorage.access_token) {
    const { access_token, token_type } = TokenStorage;
    header["Authorization"] = token_type + " " + access_token;
  }
  return request({
    data,
    method,
    header,
    url: baseUrl + url,
  })
    .then((response) => {
      console.log("请求成功===================》》》", response);
      const { statusCode, data } = response;
      if (statusCode === 200) {
        return Promise.resolve(data);
      } else {
        if (statusCode === 401 && !whiteList.includes(url)) {
          Taro.showModal({
            title: "您还未登录",
            content: "请授权手机登录",
          }).then((res) => {
            if (res.confirm) {
              Taro.navigateTo({
                url: "/pages/login/index",
              });
            }
          });
        }
        return Promise.reject(response);
      }
    })
    .catch((error) => {
      Taro.hideLoading()
      console.warn("服务器异常===============》》》", error);
      return Promise.reject(error);
    });
}
