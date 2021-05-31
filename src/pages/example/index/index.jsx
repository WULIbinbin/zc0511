import { Component } from "react";
import { View, ScrollView, Image, Button } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";

import "./index.scss";

import Shili1 from "../image/shili1.png";
import Shili2 from "../image/shili2.png";
import Shili4 from "../image/shili4.png";

@inject("store")
@observer
class Index extends Component {
  state = {
    banner: [],
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='b-shili-page'>
        <Image className="b-shili-img" mode="widthFix" src={Shili1}></Image>
        <Image className="b-shili-img" mode="widthFix" src={Shili2}></Image>
        <Image className="b-shili-img" mode="widthFix" src={Shili4}></Image>
      </View>
    );
  }
}

export default Index;
