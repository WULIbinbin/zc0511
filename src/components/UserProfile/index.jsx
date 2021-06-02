import { View, OpenData } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { observer, inject } from "mobx-react";

import "./index.scss";

function UserProfile({ phone = "", isVip = false, store }) {
  const gotoVip = () => {
    const {
      Account: { studentInfo },
    } = store;
    if (!studentInfo.id) {
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
      return;
    }
    Taro.navigateTo({
      url: "/pages/vip/guide/index",
    });
  };
  return (
    <View className="b-user-profile">
      <OpenData type="userAvatarUrl" className="left"></OpenData>
      <View className="right" onClick={gotoVip}>
        {phone && <View className="phone">{phone}</View>}
        {!isVip ? (
          <View className="vip">开通会员</View>
        ) : (
          <View className="vipv">VIP会员</View>
        )}
      </View>
    </View>
  );
}

export default inject("store")(observer(UserProfile));
