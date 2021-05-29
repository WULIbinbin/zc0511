import { View,Image } from "@tarojs/components";
import MidTitle from "../MidTitle";
import "./index.scss";

export default function ({}) {
  const score = [
    {
      sub: "语文",
      score: 100,
    },
    {
      sub: "数学",
      score: 100,
    },
    {
      sub: "英语",
      score: 100,
    },
    {
      sub: "物理",
      score: 100,
    },

    {
      sub: "生物",
      score: 100,
    },
    {
      sub: "化学",
      score: 100,
    },
  ];
  return (
    <View className="b-vol-pref">
      <MidTitle title='我的课程偏好'/>
      <View className="b-vol-pref-all-score">
        {score.map((n) => (
          <View className="b-vol-pref-all-score-item">
            <View>{n.sub}</View>
            <View>{n.score}</View>
          </View>
        ))}
      </View>
    </View>
  );
}
