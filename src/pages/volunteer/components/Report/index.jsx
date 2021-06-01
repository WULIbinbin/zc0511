import { View, Text } from "@tarojs/components";
import { inject, observer } from "mobx-react";

import "./index.scss";

function Comp({ store }) {
  const {
    Review,
    Review: {
      isPay,
      orderData: { sortScore },
    },
  } = store;
  if (isPay) {
    return (
      <View className="b-vol-report">
        <View className="b-vol-report-options b-bottom-line">
          <View className="b-vol-report-main-title">志愿审核报告</View>
          <View className="b-vol-report-sub-title">
            根据成绩信息与填报情况审核结果
          </View>
        </View>
        <View className="b-vol-report-content">
          <View className="b-vol-report-result-desc">
            您此次志愿审核结果评分为：
          </View>
          <View className="b-vol-report-result-num">{sortScore}</View>
        </View>
        <View className="b-vol-report-suggest">
          <View className="b-vol-report-suggest-title">审核建议</View>
          <View className="b-vol-report-suggest-desc">依据近几年分数</View>
        </View>
        <View className="b-vol-report-btn">
          志愿符合录取院校由高到低阶梯分布
        </View>
        {/* <View className="b-vol-report-btn">冲刺院校可以再定分数高一点的学校</View>
      <View className="b-vol-report-btn">保底院校可以再定分数低一点的学校</View> */}
      </View>
    );
  } else {
    return null;
  }
}

export default inject("store")(observer(Comp));
