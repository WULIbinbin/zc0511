import { View, Image } from "@tarojs/components";
import { Table } from "../../../../components/index";
import MidTitle from "../MidTitle";
import "./index.scss";

export default function ({
  showIcon = true,
  showMidTitle = true,
  batch = "本科批",
  data = [],
}) {
  const thead = [
    {
      key: "sort",
      name: "志愿",
    },
    {
      key: "code",
      name: "院校代码",
    },
    {
      key: "schoolName",
      name: "院校名称",
    },
    {
      key: "adjust",
      name: "是否服从调剂",
    },
  ];

  return (
    <View className="b-vol-table">
      <View className="b-vol-table-main">
        {showMidTitle && <MidTitle title="志愿填报信息" showIcon={showIcon} />}
        <View className="b-vol-table-content">
          <View className="b-vol-table-title">{batch}</View>
          <Table thead={thead} tbody={data}></Table>
        </View>
      </View>
      {/* <View className="b-vol-table-chance">还有2次智能审核机会</View>
      <View className="b-vol-table-btn">提交审核</View> */}
    </View>
  );
}
