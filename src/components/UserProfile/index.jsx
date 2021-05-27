import { View, OpenData } from "@tarojs/components";
import "./index.scss";

function UserProfile({ phone = "" }) {
  return (
    <View className="b-user-profile">
      <OpenData type="userAvatarUrl" className="left"></OpenData>
      <View className="right">
        {phone && <View className="phone">{phone}</View>}
        <View className="vip">开通会员</View>
      </View>
    </View>
  );
}

export default UserProfile;
