import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { Search, Tabbar } from "../../../components/index";
import { GetSubjectTypeList } from "../../../request/apis/college";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  state = {
    activeTab: "本科专业",
    curLeft: "",
    left: [],
    right: [],
  };

  allSubject = [];
  allClassify = [];
  componentWillMount() {}

  componentDidMount() {
    Taro.showLoading();
    GetSubjectTypeList().then((res) => {
      Taro.hideLoading();
      this.allSubject = res.data.c;
      this.allClassify = res.data.s;
      const left = this.filterSubjectByType(true);
      const right = this.filterSubjectByCateName(left[0].subjectName);
      this.setState({
        curLeft: left[0].subjectName,
        left,
        right,
      });
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleTabChange(activeTab) {
    this.setState(
      {
        activeTab,
      },
      () => {
        this.handleConfirm({
          value: this.state.searchName,
        });
      }
    );
  }

  handleChangeSubject(subjectName) {
    const right = this.filterSubjectByCateName(subjectName);
    this.setState({
      curLeft: subjectName,
      right,
    });
  }

  filterSubjectByType(type = true, data = this.allClassify) {
    return data.filter((item) => item.type === type);
  }

  filterSubjectByCateName(subjectName = "", data = this.allSubject) {
    return data.filter((item) => item.subjectName === subjectName);
  }

  goList(n) {
    Taro.navigateTo({
      url: `/pages/subject/list/index?subjectName=${
        n.subjectName
      }&categoryName=${n.categoryName}&type=${!!n.type ? "本科" : "专科"}`,
    });
  }

  filterSubjectLikeName(name) {
    if (!name) {
      return this.allSubject;
    } else {
      return this.allSubject.filter(
        (item) => item.categoryName.indexOf(name) > -1
      );
    }
  }

  handleConfirm(e) {
    const { activeTab } = this.state;
    const filterSubject = this.filterSubjectLikeName(e.value);
    const filterSubjectByType = this.filterSubjectByType(
      activeTab === "本科专业",
      filterSubject
    );
    const left = [];
    filterSubjectByType.forEach((item) => {
      if (left.findIndex((f) => f.subjectName === item.subjectName) === -1) {
        left.push({
          subjectName: item.subjectName,
        });
      }
    });
    const curLeft = left[0].subjectName;
    const right = this.filterSubjectByCateName(curLeft);
    this.setState({
      searchName: e.value,
      left,
      right,
      curLeft,
    });
  }

  render() {
    const tabs = ["本科专业", "专科专业"];
    const { activeTab, left, right, curLeft } = this.state;
    const { windowHeight } = wx.getSystemInfoSync();
    const scrollViewHeight = windowHeight - 96;
    return (
      <View className="b-subject-lib">
        <Search
          placeholder="搜索专业"
          onConfirm={this.handleConfirm.bind(this)}
        />
        <View className="tab-bar">
          <Tabbar
            tabs={tabs}
            activeTab={activeTab}
            onChange={({ target }) => {
              this.handleTabChange(target);
            }}
          />
        </View>
        <View className="main">
          <ScrollView
            scrollY={true}
            style={{ height: scrollViewHeight }}
            className="left"
          >
            <View className="info">
              {left.map((n, i) => (
                <View
                  className={`item ${n.subjectName === curLeft && "selected"}`}
                  onClick={this.handleChangeSubject.bind(this, n.subjectName)}
                >
                  <View className={`value`}>{n.subjectName}</View>
                </View>
              ))}
            </View>
          </ScrollView>
          <ScrollView
            scrollY={true}
            style={{ height: scrollViewHeight }}
            className="right"
          >
            <View className="b-bottom-line title">{curLeft}</View>
            <View className="info">
              {right.map((n) => (
                <View className="item" onClick={this.goList.bind(this, n)}>
                  <View className="value">{n.categoryName}</View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Index;
