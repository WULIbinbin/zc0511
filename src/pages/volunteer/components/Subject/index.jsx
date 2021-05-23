import { View, Text } from "@tarojs/components";
import "./index.scss";

export default function ({}) {
  const subject = [
    {
      title: "环境设计学",
      degree: "经济学学士",
      job:
        "室内设计、室外设计、空间设计;城市环境设计、园林艺术设计、建筑景观设计。",
      desc:
        "环境设计主要研究艺术学、设计学、建筑学、社会学、环境学等方面的基本知识和技能，涉及地球表层空间设计、城市规划设计、建筑设计、室内设计、室外设计、公共艺术设计等。例如:公园地形地貌、道路、假山的设计,城市公路、绿化带、建筑的规划设计，住宅、商场室内布局的设计等。",
    },
  ];
  return (
    <View className="b-vol-subject">
      <View className="b-vol-subject-options b-bottom-line">
        <View className="b-vol-subject-main-title">专业推荐</View>
        <View className="b-vol-subject-sub-title">
          根据课程偏好和霍尔德模型推荐如下专业
        </View>
      </View>
      <View className="b-vol-subject-content">
        {subject.map((n) => (
          <View className="b-vol-subject-item">
            <View className="b-vol-subject-item-title">{n.title}</View>
            <View className="b-vol-subject-item-degree">{n.degree}</View>
            <View className="b-vol-subject-item-job">
              <Text>相关职业：</Text>
              <Text>{n.job}</Text>
            </View>
            <View className="b-vol-subject-item-desc">
              <Text>专业介绍</Text>
              <Text className='checkall'>{n.desc}</Text>
              <Text className="b-vol-subject-item-checkall">点击查看更多</Text>
            </View>
          </View>
        ))}
      </View>
      <View className='b-vol-subject-btn'>查看主修课程</View>
    </View>
  );
}
