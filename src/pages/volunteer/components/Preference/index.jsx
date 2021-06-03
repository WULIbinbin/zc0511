import { View } from "@tarojs/components";
import MidTitle from "../MidTitle";
import Taro from "@tarojs/taro";
import { inject, observer } from "mobx-react";

import "./index.scss";

function Comp({ showIcon = true, todo = "/pages/volunteer/prefer/index", store }) {
  const {
    Account: { subjectInfo },
  } = store;
  const goto = () => {
    if (subjectInfo.length === 0) {
      Taro.showToast({ title: "请先填写考试成绩", icon: "none" });
      return;
    }
    todo &&
      Taro.navigateTo({
        url: todo,
      });
  };
  return (
    <View className="b-vol-pref">
      <MidTitle title="我的课程偏好" showIcon={showIcon} goEdit={goto} />
      {subjectInfo &&
      subjectInfo.length > 0 &&
      subjectInfo.findIndex((s) => s.star != null) > -1 ? (
        <View className="b-vol-pref-all-score">
          {subjectInfo.map((n) => (
            <View className="b-vol-pref-all-score-item">
              <View>{n.subject}</View>
              <View>{n.star || 0}</View>
            </View>
          ))}
        </View>
      ) : (
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
