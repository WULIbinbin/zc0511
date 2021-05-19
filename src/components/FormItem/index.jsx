import { View } from "@tarojs/components";
import "./index.scss";

function FormItem({
  label = "",
  contentWidth = 420,
  labelWidth = 150,
  children = null,
}) {
  return (
    <View className="b-form-item">
      <View className="b-form-label" style={{ width: `${labelWidth}rpx` }}>
        {label}
      </View>
      <View className="b-form-content" style={{ width: `${contentWidth}rpx` }}>
        {children}
      </View>
    </View>
  );
}

export default FormItem;
