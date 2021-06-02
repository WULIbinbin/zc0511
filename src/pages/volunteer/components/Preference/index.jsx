import { View } from "@tarojs/components";
import MidTitle from "../MidTitle";
import Taro from "@tarojs/taro";
import { inject, observer } from "mobx-react";

import "./index.scss";

function Comp({
  showIcon = true,
  todo = "",
  store,
}) {
  const {
    Account: { subjectInfo },
  } = store;
  const goto = () => {
    todo &&
      Taro.navigateTo({
        url: todo,
      });
  };
  return (
    <View className="b-vol-pref">
      <MidTitle title="我的课程偏好" showIcon={showIcon} goEdit={goto} />
      {subjectInfo && subjectInfo.length > 0 && (
        <View className="b-vol-pref-all-score">
          {subjectInfo.map((n) => (
            <View className="b-vol-pref-all-score-item">
              <View>{n.subject}</View>
              <View>{n.score}</View>
            </View>
          ))}
        </View>
      )}
      {(!subjectInfo || subjectInfo.length === 0) && (
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
export default inject("store")(observer(Comp));
