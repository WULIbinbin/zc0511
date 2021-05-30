import { View, Image } from "@tarojs/components";
import MidTitle from "../MidTitle";
import Taro from "@tarojs/taro";
import "./index.scss";

export default function ({
  showIcon = true,
  showMidTitle = true,
  data = [],
  showData = true,
  todo = "",
}) {
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
  const goto = () => {
    todo &&
      Taro.navigateTo({
        url: todo,
      });
  };
  return (
    <View className="b-vol-pref">
      <MidTitle title="我的课程偏好" showIcon={showIcon} goEdit={goto} />
      {showData && (
        <View className="b-vol-pref-all-score">
          {data.map((n) => (
            <View className="b-vol-pref-all-score-item">
              <View>{n.sub}</View>
              <View>{n.score}</View>
            </View>
          ))}
        </View>
      )}
      {!showData && (
        <View className="b-vol-comp-no-data">
          <View className="b-vol-comp-no-data-desc">
            添加后推荐与课程偏好相关专业
          </View>
          <View className="b-vol-comp-no-data-btn" onClick={goto}>
            立即添加
          </View>
        </View>
      )}
    </View>
  );
}
