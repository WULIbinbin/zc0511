import { Component } from "react";
import { View, ScrollView, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { Tabbar, PickerSelect } from "../../../components/index";
import { getScrollViewHeight } from "../../../utils/tool";
import { GetMySchoolList } from "../../../request/apis/home";
import "./index.scss";

const tabs = ["冲刺院校", "适中院校", "保底院校"];

@inject("store")
@observer
class Index extends Component {
  state = {
    activeTab: "冲刺院校",
    type: 1,
  };
  componentWillMount() {}

  componentDidMount() {
    const {
      options: { type },
    } = getCurrentPages()[getCurrentPages().length - 1];
    this.setState({
      type,
      activeTab: tabs[type - 1],
    },()=>{
      this.getList(type)
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getList(){
    const {type} = this.state
    GetMySchoolList(type).then(res=>{

    })
  }

  render() {
    const {
      Common: { province, category },
    } = this.props.store;
    const { activeTab, type } = this.state;
    const pickers = [
      {
        label: "地区",
        range: province,
      },
      {
        label: "类型",
        range: category,
      },
    ];
    const scrollViewHeight = getScrollViewHeight(180);
    return (
      <View className="b-befit-list-page">
        <View className="b-befit-list-topbar">
          <Tabbar activeTab={activeTab} tabs={tabs} />
        </View>
        <View className="b-befit-list-options">
          <View className="b-befit-list-selector">
            <View className="b-befit-list-length">共130所</View>
            <PickerSelect range={pickers} style={{ flex: 4 }} />
          </View>
        </View>
        {activeTab === tabs[0] && (
          <ScrollView
            scrollY
            className="b-befit-list-content"
            style={{ height: scrollViewHeight }}
          >
            <View className="b-befit-list-item">
              <Image className="b-befit-list-item-left"></Image>
              <View className="b-befit-list-item-mid">
                <View className="b-befit-list-item-name">北京大学</View>
                <View className="b-befit-list-item-desc">北京 全国排名：1</View>
                <View className="b-befit-list-item-labels">
                  <View className="b-befit-list-item-label">综合</View>
                  <View className="b-befit-list-item-label">985/211</View>
                </View>
              </View>
              <View className="b-befit-list-item-right">
                <View className="b-befit-list-item-precent">90%</View>
                <View className="b-befit-list-item-risk">风险适中</View>
              </View>
              <View className="b-befit-list-item-top-label">保</View>
            </View>
          </ScrollView>
        )}
        {activeTab === tabs[1] && (
          <ScrollView
            scrollY
            className="b-befit-list-content"
            style={{ height: scrollViewHeight }}
          ></ScrollView>
        )}
        {activeTab === tabs[2] && (
          <ScrollView
            scrollY
            className="b-befit-list-content"
            style={{ height: scrollViewHeight }}
          ></ScrollView>
        )}
      </View>
    );
  }
}

export default Index;
