import { View, Text } from "@tarojs/components";
import { inject, observer } from "mobx-react";
import { useCallback, useState } from "react";
import Taro from "@tarojs/taro";

import "./index.scss";

function Comp({ store }) {
  const {
    Tutor: { hollandMajorList },
  } = store;
  const mapList = hollandMajorList.map((item) => {
    return {
      ...item,
      checkall: false,
    };
  });
  const [list, setList] = useState(mapList);
  const handleCheckAll = useCallback(
    (i) => {
      const nlist = [...list];
      nlist[i].checkall = true;
      setList(nlist);
    },
    [list]
  );
  return (
    <View className="b-vol-subject">
      <View className="b-vol-subject-options b-bottom-line">
        <View className="b-vol-subject-main-title">专业推荐</View>
        <View className="b-vol-subject-sub-title">
          根据课程偏好和霍尔德模型推荐如下专业
        </View>
      </View>
      <View className="b-vol-subject-content">
        {list.map((n, i) => (
          <>
            <View className="b-vol-subject-item">
              <View className="b-vol-subject-item-title">{n.majorName}</View>
              <View className="b-vol-subject-item-degree">{n.degree}</View>
              <View className="b-vol-subject-item-job">
                <Text>相关职业：</Text>
                <Text>{n.job}</Text>
              </View>
              <View className="b-vol-subject-item-desc">
                <Text>专业介绍</Text>
                <Text className={`${n.checkall && "checkall"}`}>
                  {n.introduce}
                </Text>
                {!n.checkall && (
                  <Text
                    className="b-vol-subject-item-checkall"
                    onClick={() => {
                      handleCheckAll(i);
                    }}
                  >
                    点击查看更多
                  </Text>
                )}
              </View>
            </View>
            <View
              className="b-vol-subject-btn"
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/subject/detail/index?code=${n.code}`,
                });
              }}
            >
              查看主修课程
            </View>
          </>
        ))}
      </View>
    </View>
  );
}
export default inject("store")(observer(Comp));
