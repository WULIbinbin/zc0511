import { View, Image } from "@tarojs/components";
import "./index.scss";

import EditIcon from "../../image/edit.png";

export default function ({ title = "", showIcon = true, goEdit = null }) {
  return (
    <View className="b-vol-pages-options b-bottom-line">
      <View className="b-underline-title">{title}</View>
      {showIcon && (
        <Image
          className="b-vol-pages-options-edit"
          src={EditIcon}
          onClick={()=>{
            goEdit && goEdit()
          }}
        ></Image>
      )}
    </View>
  );
}
