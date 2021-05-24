import { View, Image } from "@tarojs/components";
import { useCallback } from "react";
import "./index.scss";

function CollegeItem({
  name = "",
  labels = [],
  local = "",
  icon = "",
  goto = null,
}) {
  const goDetail = useCallback(() => {
    goto && goto();
  });
  return (
    <View className="college-item" onClick={goDetail}>
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
