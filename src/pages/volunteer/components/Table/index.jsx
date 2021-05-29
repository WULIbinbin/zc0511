import { View, Image } from "@tarojs/components";
import { Table } from "../../../../components/index";
import Taro from "@tarojs/taro";
import MidTitle from "../MidTitle";
import "./index.scss";

export default function ({
  showIcon = true,
  showMidTitle = true,
  batch = "本科批",
  data = [],
  showData = true,
  todo = "",
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

  const goto = () => {
    todo &&
      Taro.navigateTo({
        url: todo,
      });
  };

  return (
    <View className="b-vol-table">
      <View className="b-vol-table-main">
        {showMidTitle && (
          <MidTitle title="志愿填报信息" showIcon={showIcon} goEdit={goto} />
        )}
        <View className="b-vol-table-content">
          {showData && <View className="b-vol-table-title">{batch}</View>}
          {showData && <Table thead={thead} tbody={data}></Table>}
          {!showData && (
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
      </View>
      {/* <View className="b-vol-table-chance">还有2次智能审核机会</View>
      <View className="b-vol-table-btn">提交审核</View> */}
    </View>
  );
}
