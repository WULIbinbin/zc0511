import { View } from "@tarojs/components";
import { inject, observer } from "mobx-react";

import "./index.scss";

function Comp({ store }) {
  const {
    Tutor: { recommendProvince, recommendAll },
  } = store;
  const collegeEle = (
    {
      college_category,
      tag1,
      tag2,
      tag3,
      college_name = "",
      edu_level,
      LowestScore = "632",
    },
    index
  ) => {
    const labels = (college_category && [college_category]) || [];
    !!edu_level && labels.push(edu_level);
    !!tag1 && labels.push("双一流");
    !!tag2 && labels.push("985");
    !!tag3 && labels.push("211");
    return (
      <View className="b-vol-remd-college-main">
        <View className="b-vol-remd-college-title">
          <View className="b-vol-remd-college-name">
            {index + 1}.{college_name}
          </View>
          <View className="b-vol-remd-college-score">
            2020分数线：{LowestScore}分
          </View>
        </View>
        <View className="b-vol-remd-college-labels">
          {labels.map((n) => (
            <View className="b-vol-remd-college-label">{n}</View>
          ))}
        </View>
      </View>
    );
  };
  return (
    <View className="b-vol-remd">
      <View className="b-vol-remd-options b-bottom-line">
        <View className="b-vol-remd-main-title">院校推荐</View>
        <View className="b-vol-remd-sub-title">根据当前成绩推荐如下院校</View>
      </View>
      <View className="b-vol-remd-content">
        <View className="b-vol-remd-ctn-title">本省推荐</View>
        {recommendProvince.map((n, i) => collegeEle(n, i))}
        <View className="b-vol-remd-ctn-title">全国推荐</View>
        {recommendAll.map((n, i) => collegeEle(n, i))}
      </View>
    </View>
  );
}

export default inject("store")(observer(Comp));
