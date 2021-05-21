import { Component } from "react";
import { View, Text, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { PageView } from "../../../components/index";
import "./index.scss";

import ReadMePng from "../image/readme.png";
import ClosePng from "../image/close.png";

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
        <Image
          className="b-eva-readme-bg"
          src={ReadMePng}
          mode="widthFix"
        ></Image>
        <View className="b-eva-readme-bottom-btn">共60题，约耗时10分钟</View>
        <View className="b-eva-readme-dialog">
          <View className="b-eva-readme-dialog-body">
            <View className="b-eva-readme-dialog-main">
              <View className="b-eva-readme-dialog-top">
                <View className="b-eva-readme-dialog-icon"></View>
                <View className="b-eva-readme-dialog-top-title">温馨提示</View>
                <View className="b-eva-readme-dialog-icon"></View>
              </View>
              <View className="b-eva-readme-dialog-content" decode>
                <Text>
                  1.选项无对错之分，请放松心情，凭第一直觉选择您的真实感受。
                </Text>
                <Text>
                  2.完成后可以得到适合个人性格的职业，我们将依此为您推荐专业。
                </Text>
                <Text>
                  3.中途退出答题，则已答内容不会保存，需重新作答，请注意。
                </Text>
              </View>
              <View className="b-eva-readme-dialog-btn">开始测评</View>
            </View>
          </View>
          <View className="b-eva-readme-dialog-close">
              <Image
                className="b-eva-readme-dialog-close-icon"
                src={ClosePng}
              ></Image>
            </View>
        </View>
      </PageView>
    );
  }
}

export default Index;
