import { View } from "@tarojs/components";
import "./index.scss";

function Table({ thead = [], tbody = [], theadType = "primary" }) {
  const theadClassType = {
    primary: "",
    default: "b-table-default",
  };
  return (
    <View className="b-table">
      <View className={`b-table-thead ${theadClassType[theadType]}`}>
        {[...thead].map((th) => (
          <View className="th">{th.name}</View>
        ))}
      </View>
      <View className="b-table-tbody">
        {tbody.length > 0 &&
          tbody.map((item) => (
            <View className="tr">
              {[...thead].map((head) => (
                <View className="td">{item[head.key]}</View>
              ))}
            </View>
          ))}
        {tbody.length === 0 && <View className='b-table-no-data'>暂无数据</View>}
      </View>
    </View>
  );
}

export default Table;
