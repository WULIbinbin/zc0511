import { View } from "@tarojs/components";
import "./index.scss";

export default function ({}) {
  const college = [
    {
      name: "中央戏剧学院",
      labels: ["综合", "985/211", "双一流", "公办"],
    },
    {
      name: "中央戏剧学院",
      labels: ["综合", "985/211", "双一流", "公办"],
    },
    {
      name: "中央戏剧学院",
      labels: ["综合", "985/211", "双一流", "公办"],
    },
    {
      name: "中央戏剧学院",
      labels: ["综合", "985/211", "双一流", "公办"],
    },
  ];
  const collegeEle = ({ name = "", score = "632", labels = [] }, index) => (
    <View className="b-vol-remd-college-main">
      <View className="b-vol-remd-college-title">
        <View className="b-vol-remd-college-name">
          {index + 1}.{name}
        </View>
        <View className="b-vol-remd-college-score">2020分数线：{score}分</View>
      </View>
      <View className="b-vol-remd-college-labels">
        {labels.map((n) => (
          <View className="b-vol-remd-college-label">{n}</View>
        ))}
      </View>
    </View>
  );
  return (
    <View className="b-vol-remd">
      <View className="b-vol-remd-options b-bottom-line">
        <View className="b-vol-remd-main-title">院校推荐</View>
        <View className="b-vol-remd-sub-title">根据当前成绩推荐如下院校</View>
      </View>
      <View className="b-vol-remd-content">
        <View className="b-vol-remd-ctn-title">本省推荐</View>
        {college.map((n, i) => collegeEle(n, i))}
        <View className="b-vol-remd-ctn-title">全国推荐</View>
        {college.map((n, i) => collegeEle(n, i))}
      </View>
    </View>
  );
}
