import { View, Image } from "@tarojs/components";
import { Table } from "../../../../components/index";
import "./index.scss";

export default function ({}) {
  const thead = [
    {
      key: "willing",
      name: "志愿",
    },
    {
      key: "code",
      name: "院校代码",
    },
    {
      key: "name",
      name: "院校名称",
    },
    {
      key: "order",
      name: "是否服从调剂",
    },
  ];
  const tbody = [
    {
      willing: "",
      code: "4757",
      name: "湘潭大学",
      order: "否",
    },
    {
      willing: "",
      code: "4757",
      name: "湘潭大学",
      order: "否",
    },
    {
      willing: "",
      code: "4757",
      name: "湘潭大学",
      order: "否",
    },
    {
      willing: "",
      code: "4757",
      name: "湘潭大学",
      order: "否",
    },
    {
      willing: "",
      code: "4757",
      name: "湘潭大学",
      order: "否",
    },
    {
      willing: "",
      code: "4757",
      name: "湘潭大学",
      order: "否",
    },
  ].map((n, i) => {
    return {
      ...n,
      willing: i + 1,
    };
  });
  return (
    <View className="b-vol-table">
      <View className="b-vol-table-main">
        <View className="b-vol-table-options b-bottom-line">
          <View className="b-underline-title">志愿填报信息</View>
          <Image className="b-vol-table-edit"></Image>
        </View>
        <View className="b-vol-table-content">
          <View className="b-vol-table-title">本科批</View>
          <Table thead={thead} tbody={tbody}></Table>
        </View>
      </View>
      <View className="b-vol-table-chance">还有2次智能审核机会</View>
      <View className="b-vol-table-btn">提交审核</View>
    </View>
  );
}
