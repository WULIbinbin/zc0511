import { View, Input, Image } from "@tarojs/components";

import "./index.scss";
import SearchIcon from "../../static/image/search.png";
import { useCallback } from "react";

function Search({
  placeholder = "搜索大学",
  name = "value",
  onConfirm = null,
}) {
  const confirm = useCallback((e) => {
    console.log(e);
    onConfirm &&
      onConfirm({
        [name]: e.detail.value,
      });
  });
  return (
    <View className="b-search">
      <View className="b-search-main">
        <Image className="icon" src={SearchIcon}></Image>
        <Input
          className="input"
          placeholder={placeholder}
          onConfirm={confirm}
        ></Input>
      </View>
    </View>
  );
}

export default Search;
