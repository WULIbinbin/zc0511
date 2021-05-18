import { Component } from "react";
import { View, Image, ScrollView } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { Tabbar, Search, CollegeItem } from "../../../components/index";
import "./index.scss";

import PositionIcon from "../../../static/image/position.png";
import RemoveIcon from "../../../static/image/remove.png";

@inject("store")
@observer
class Index extends Component {
  state = {
    activeTab: "按专业查选科",
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleChange(activeTab) {
    this.setState({
      activeTab,
    });
  }

  render() {
    const tabs = ["按选科查专业", "按学校查选科", "按专业查选科"];
    const { activeTab } = this.state;
    const subItems = ["物理", "历史"];
    const college = new Array(20).fill({});
    const historyItem = ["物理", "历史", "23333"];
    return (
      <View className="b-choose">
        <View className="top-bar">
          <View className="position">
            <Image className="icon" src={PositionIcon}></Image>
            <View className="label">省份</View>
            <View className="province">湖南</View>
          </View>
          <Tabbar
            tabs={tabs}
            activeTab={activeTab}
            onChange={({ target }) => {
              this.handleChange(target);
            }}
          />
        </View>
        {activeTab === "按选科查专业" && (
          <ScrollView scrollY className="main">
            <View className="choose-subject">
              <View className="sub-select">
                <View className="sub-title">首选科目</View>
                <View className="sub-list">
                  {subItems.map((n) => (
                    <View className="sub-item">{n}</View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        )}
        {activeTab === "按学校查选科" && (
          <View className="main">
            <View className="search-bar">
              <Search />
            </View>
            <ScrollView scrollY className="search-list">
              {college.map((n) => (
                <CollegeItem
                  name="北京大学"
                  labels={["综合类", "985/211", "双一流", "公办"]}
                  local="北京"
                />
              ))}
            </ScrollView>
          </View>
        )}
        {activeTab === "按专业查选科" && (
          <View className="main">
            <View className="search-bar2">
              <Search placeholder="搜索专业" />
            </View>
            <View className="history-option">
              <View className="title">历史搜索</View>
              <Image className="remove" src={RemoveIcon}></Image>
            </View>
            <View className="history-list">
              {historyItem.map((n) => (
                <View className="item">{n}</View>
              ))}
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Index;
