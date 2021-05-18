import { View, Input, Image } from "@tarojs/components";

import "./index.scss";
import SearchIcon from "../../static/image/search.png";

function Search({ placeholder = "搜索大学" }) {
  return (
    <View className="b-search">
      <Image className="icon" src={SearchIcon}></Image>
      <Input className="input" placeholder={placeholder}></Input>
    </View>
  );
}

export default Search;
