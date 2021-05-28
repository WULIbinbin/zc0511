import { Component } from "react";
import { View, Image, ScrollView, Picker, Button } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import {
  Tabbar,
  Search,
  CollegeItem,
} from "../../../components/index";
import Taro from "@tarojs/taro";
import "./index.scss";

import PositionIcon from "../../../static/image/position.png";
import RemoveIcon from "../../../static/image/remove.png";

@inject("store")
@observer
class Index extends Component {
  state = {
    activeTab: "按选科查专业",
    position: "北京",
  };

  componentWillMount() {
    const { Subject } = this.props.store;
    Subject.setCurProv("北京");
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleChange(activeTab) {
    this.setState({
      activeTab,
    });
  }

  handlePosition(e) {
    console.log(e);
    const {
      Common: { province },
      Subject,
    } = this.props.store;
    this.setState(
      {
        position: province[e.detail.value],
      },
      () => {
        Subject.setCurProv(province[e.detail.value]);
      }
    );
  }

  handleSelectSubject(e) {
    const { Subject } = this.props.store;
    Subject.selectSubject(e);
  }

  stepItem(subject, cur) {
    const {
      Subject: { subjectFilter, curSubjectList },
    } = this.props.store;
    return (
      <View
        className={`sub-item ${curSubjectList.includes(subject) && "selected"}`}
        onClick={this.handleSelectSubject.bind(this, {
          type: subjectFilter.type,
          cur,
          subject,
        })}
      >
        <View className="sub-item-text">{subject}</View>
      </View>
    );
  }

  isCanSubmit() {
    const {
      Subject: { showSubList, subjectFilter },
    } = this.props.store;
    if (showSubList.length === subjectFilter.mustSelect) {
      return true;
    }
    return false;
  }

  handleSubmit() {
    const {
      Subject: { showSubList, curProv },
    } = this.props.store;
    Taro.navigateTo({
      url: `/pages/choose/college/index?subStr=${showSubList
        .map((n) => n.subject)
        .join("")}&fromProvince=${curProv}`,
    });
  }

  render() {
    const tabs = ["按选科查专业", "按学校查选科", "按专业查选科"];
    const { activeTab, position } = this.state;
    const subItems = ["物理", "历史"];
    const college = new Array(20).fill({});
    const historyItem = ["物理", "历史", "23333"];
    const {
      Common,
      Subject: { subjectFilter },
    } = this.props.store;
    return (
      <View className="b-choose">
        <View className="top-bar">
          <Picker
            range={Common.province}
            value={position}
            onChange={this.handlePosition.bind(this)}
          >
            <View className="position">
              <Image className="icon" src={PositionIcon}></Image>
              <View className="label">省份</View>
              <View className="province">{position}</View>
            </View>
          </Picker>
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
              {subjectFilter.type === "TYPE_ALL_IN_3" && (
                <View className="sub-select">
                  <View className="sub-title">组合选科</View>
                  <View className="sub-list">
                    {subjectFilter.sub3.map((subject) =>
                      this.stepItem(subject, 3)
                    )}
                  </View>
                </View>
              )}
              {subjectFilter.type === "TYPE_2_AND_4" && (
                <View className="sub-select">
                  <View className="sub-title">首选科目</View>
                  <View className="sub-list">
                    {subjectFilter.sub1.map((subject) =>
                      this.stepItem(subject, 1)
                    )}
                  </View>
                  <View className="sub-title">次选科目</View>
                  <View className="sub-list">
                    {subjectFilter.sub2.map((subject) =>
                      this.stepItem(subject, 2)
                    )}
                  </View>
                </View>
              )}
              {subjectFilter.type === "ZH_2_IN_1" && (
                <View className="sub-select">
                  <View className="sub-title">高考选科</View>
                  <View className="sub-list">
                    {subjectFilter.sub3.map((subject) =>
                      this.stepItem(subject, 3)
                    )}
                  </View>
                </View>
              )}
              <View className="btn-view">
                {!this.isCanSubmit() ? (
                  <View className={`btn`}>
                    <View className="text">确定</View>
                  </View>
                ) : (
                  <Button
                    className={`btn can-click`}
                    onClick={this.handleSubmit.bind(this)}
                  >
                    <View className="text">确定</View>
                  </Button>
                )}
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
