import { View, Image } from "@tarojs/components";
import { Table } from "../../../../components/index";
import "./index.scss";

import Recommend from "../../../../static/image/recommend.png";

export default function ({}) {
  const subject = ["物理", "生物", "化学"];
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
  const thead = [
    {
      key: "year",
      name: "年份",
    },
    {
      key: "subject",
      name: "科目",
    },
    {
      key: "score",
      name: "分数",
    },
    {
      key: "queue",
      name: "排名",
    },
  ];
  const tbody = [
    {
      year:'2020',
      subject:'物/化/生',
      score:'520',
      queue:'37565'
    },
    {
      year:'2020',
      subject:'物/化/生',
      score:'520',
      queue:'37565'
    },
    {
      year:'2020',
      subject:'物/化/生',
      score:'520',
      queue:'37565'
    },
  ]
  return (
    <View className="b-vol-test">
      <View className="b-vol-test-options">
        <View className="b-underline-title">我的考试信息</View>
        <Image className="b-vol-test-edit"></Image>
      </View>
      <View className="b-vol-test-content">
        <View className="b-vol-test-local">
          性别:男&nbsp;&nbsp;&nbsp;地区：北京丰台区
        </View>
        <View className="b-vol-test-score">
          <View className="b-vol-test-score-text">总分:</View>
          <View className="b-vol-test-score-num">520</View>
          {subject.map((n) => (
            <View className="b-vol-test-subject">{n}</View>
          ))}
        </View>
        <View className="b-vol-test-all-score">
          {score.map((n) => (
            <View className="b-vol-test-all-score-item">
              <View>{n.sub}</View>
              <View>{n.score}</View>
            </View>
          ))}
        </View>
        <View className="b-vol-test-traslate">转化为近两年成绩</View>
        <Table thead={thead} tbody={tbody} theadType='default'/>
      </View>
    </View>
  );
}
