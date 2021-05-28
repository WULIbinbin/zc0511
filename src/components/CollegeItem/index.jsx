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
        {labels.length > 0 && (
          <View className="labels">
            {labels.map((label) =>{
              if(!!label){
                return <View className="label">{label}</View>
              }else{
                return null
              }
            })}
          </View>
        )}
      </View>
      <View className="local">{local}</View>
    </View>
  );
}

export default CollegeItem;
