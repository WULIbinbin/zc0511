import { View, Image } from "@tarojs/components";
import { Table } from "../../../../components/index";
import MidTitle from "../MidTitle";
import Store from "../../../../store/index";
import "./index.scss";

export default function ({
  showMidTitle = true,
  midTitle = "center",
  tableData = [],
}) {
  const {
    Account: { studentInfo, subjectInfo },
  } = Store;
  const mainSubject = ["语文", "数学", "英语"];
  const mapSubject = [...subjectInfo]
  const otherSubject = mapSubject.filter(f=>!mainSubject.includes(f.subject)).map(n=>n.subject)
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
      year: "2020",
      subject: "物/化/生",
      score: "520",
      queue: "37565",
    },
    {
      year: "2020",
      subject: "物/化/生",
      score: "520",
      queue: "37565",
    },
    {
      year: "2020",
      subject: "物/化/生",
      score: "520",
      queue: "37565",
    },
  ];
  return (
    <View className="b-vol-test">
      {showMidTitle &&
        (midTitle === "center" ? (
          <MidTitle title="我的考试信息" showIcon={false} />
        ) : (
          midTitle
        ))}
      <View className="b-vol-test-content">
        <View className="b-vol-test-local">
          性别:{studentInfo.sex}&nbsp;&nbsp;&nbsp;&nbsp;地区:{studentInfo.area}
        </View>
        <View className="b-vol-test-score">
          <View className="b-vol-test-score-text">总分:</View>
          <View className="b-vol-test-score-num">{studentInfo.score}</View>
          {otherSubject.map((n) => (
            <View className="b-vol-test-subject">{n}</View>
          ))}
        </View>
        <View className="b-vol-test-all-score">
          {mapSubject.map((n) => (
            <View className="b-vol-test-all-score-item">
              <View>{n.subject}</View>
              <View>{n.score}</View>
            </View>
          ))}
        </View>
        {tableData.length > 0 && (
          <>
            <View className="b-vol-test-traslate">转化为近两年成绩</View>
            <Table thead={thead} tbody={tbody} theadType="default" />
          </>
        )}
      </View>
    </View>
  );
}
