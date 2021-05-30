import { View, OpenData } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

function UserProfile({ phone = "", isVip = false }) {
  const gotoVip = () => {
    Taro.navigateTo({
      url: "/pages/vip/guide/index",
    });
  };
  return (
    <View className="b-user-profile">
      <OpenData type="userAvatarUrl" className="left"></OpenData>
      <View className="right" onClick={gotoVip}>
        {phone && <View className="phone">{phone}</View>}
        {!isVip && <View className="vip">开通会员</View>}
      </View>
    </View>
  );
}

export default UserProfile;
