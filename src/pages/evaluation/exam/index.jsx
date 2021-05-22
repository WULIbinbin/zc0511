import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { PageView } from "../../../components/index";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  state = {};
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <PageView bgColor="#f7f7f7">
        <View className="b-eva-exam-main">
          <View className="b-eva-exam-title">
            30.我喜欢不时地夸耀自己取得的好成就。
          </View>
          <View className="b-eva-exam-options">
            <View className="b-eva-exam-option">是的</View>
            <View className="b-eva-exam-option checked">不是</View>
          </View>
        </View>
        <View className="b-eva-exam-bottom">
          <View className="b-eva-exam-process">
            <View className="b-eva-exam-process-top">
              <View className="b-eva-exam-process-title">完成度</View>
              <View className="b-eva-exam-process-desc">
                <Text>30</Text>
                /60
              </View>
            </View>
            <View className="b-eva-exam-process-bg">
              <View className="b-eva-exam-process-bar" style='width:60%'></View>
            </View>
          </View>
          <View className="b-eva-exam-button">上一题</View>
        </View>
      </PageView>
    );
  }
}

export default Index;
