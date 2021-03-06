import { View, Image } from "@tarojs/components";
import "./index.scss";

function Card({
  children = null,
  icon = "",
  label = "",
  access = true,
  accessTo = null,
}) {
  return (
    <View className="b-card-main">
      <View className="b-card-options" onClick={accessTo}>
        <View className="left">
          {icon && <Image className="icon" src={icon}></Image>}
          {label && <View className="label">{label}</View>}
        </View>
        <View className="right">
          {access && <View className="b-arrow-right"></View>}
        </View>
      </View>
      {children && (
        <View className="b-card-content b-top-line">{children}</View>
      )}
    </View>
  );
}

export default Card;
