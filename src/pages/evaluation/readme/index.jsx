import { Component } from "react";
import { View, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { PageView } from "../../../components/index";
import "./index.scss";

import ReadMePng from "../image/readme.png";

@inject("store")
@observer
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <PageView bgColor="#f7f7f7">
        <Image className="b-eva-readme-bg" src={ReadMePng} mode="widthFix"></Image>
        <View className="b-eva-readme-bottom-btn">共60题，约耗时10分钟</View>
      </PageView>
    );
  }
}

export default Index;
