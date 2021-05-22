import { View, Image } from "@tarojs/components";
import './index.scss'

import Recommend from '../../../../static/image/recommend.png'

export default function ({ type = "recommend", title = "", desc = "" }) {
  const icons = {
    recommend:Recommend
  };
  return (
    <View className="b-vol-title">
      <View className="b-vol-title-options">
        <Image className="b-vol-title-icon" src={icons[type]}></Image>
        <View className="b-vol-title-name">{title}</View>
      </View>
      <View className="b-vol-title-desc">{desc}</View>
    </View>
  );
}
