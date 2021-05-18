import { View, Image } from "@tarojs/components";
import "./index.scss";

function CollegeItem({ name = "", labels = [], local = "", icon = "" }) {
  return (
    <View className="college-item">
      <Image className="logo" src={icon}></Image>
      <View className="info">
        <View className="name">{name}</View>
        <View className="labels">
          {labels.map((label) => (
            <View className="label">{label}</View>
          ))}
        </View>
      </View>
      <View className="local">{local}</View>
    </View>
  );
}

export default CollegeItem;
