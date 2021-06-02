import { Component } from "react";
import { View, Image, ScrollView, Picker, Button } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { Tabbar, Search, CollegeItem } from "../../../components/index";
import Taro from "@tarojs/taro";
import { GetCollegeList } from "../../../request/apis/college";
import { getScrollViewHeight } from "../../../utils/tool";

import "./index.scss";

import PositionIcon from "../../../static/image/position.png";
import RemoveIcon from "../../../static/image/remove.png";

@inject("store")
@observer
class Index extends Component {
  state = {
    activeTab: "按选科查专业",
    curProv: "北京",
    isGetList: "",
    currentData: [],
    currentPage: 0,
    majorHistory: [],
    params: {
      province: "北京",
    },
    random:''
  };
  allData = [];
  pageSize = 50;
  componentWillMount() {
    const { Subject,Account:{studentInfo} } = this.props.store;
    const state = {
      random:(80+Math.round(Math.random()*16)+Math.ceil(Math.random()*10)/10)
    }
    if(!!studentInfo.province){
      Subject.setCurProv(studentInfo.province);
      state.curProv = studentInfo.province
    }else{
      Subject.setCurProv("北京");
    }
    this.setState(state)
    this.getList();
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
    const {
      Common: { province },
      Subject,
    } = this.props.store;
    const prov = province[e.detail.value];
    this.setState(
      {
        curProv: prov,
        params: {
          ...this.state.params,
          province: prov,
        },
      },
      () => {
        Subject.setCurProv(prov);
        this.getList();
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

  getList() {
    Taro.showLoading();
    let majorHistory = Taro.getStorageSync("majorHistory") || [];
    this.setState({
      isGetList: false,
      majorHistory,
    });
    const { params } = this.state;
    GetCollegeList(params).then((res) => {
      Taro.hideLoading();
      const { list } = res.data;
      let currentData = [];
      if (list.length > 0) {
        this.allData = list;
        currentData = list.slice(0, this.pageSize);
      }
      this.setState({
        currentData,
        isGetList: true,
      });
    });
  }

  addListData() {
    let { currentData, currentPage } = this.state;
    const len = currentData.length;
    const newData = currentData.concat(
      this.allData.slice(len, len + this.pageSize)
    );
    this.setState({
      currentData: newData,
      currentPage: currentPage + 1,
    });
  }

  goDetail(name) {
    const { curProv } = this.state;
    Taro.navigateTo({
      url: `/pages/choose/college/index?schoolName=${name}&fromProvince=${curProv}`,
    });
  }

  handleSearchCollege(e) {
    this.setState(
      {
        params: {
          schoolName: e.value,
        },
      },
      () => {
        this.getList();
      }
    );
  }

  handleSearchMajor(e) {
    const { value } = e;
    let majorHistory = Taro.getStorageSync("majorHistory");
    if (majorHistory.constructor === Array) {
      const findIdx = majorHistory.findIndex((f) => f == value);
      if (findIdx > -1) {
        majorHistory.splice(findIdx, 0);
      }
      majorHistory.push(value);
    } else {
      majorHistory = [value];
    }
    Taro.setStorageSync("majorHistory", majorHistory);
    this.setState({
      majorHistory,
    });
    this.goMajor(value);
  }

  handleRmHistory() {
    Taro.setStorageSync("majorHistory", []);
    this.setState({
      majorHistory: [],
    });
  }

  goMajor(majorName) {
    const { curProv } = this.state;
    Taro.navigateTo({
      url: `/pages/choose/college/index?majorName=${majorName}&fromProvince=${curProv}`,
    });
  }

  render() {
    const tabs = ["按选科查专业", "按学校查选科", "按专业查选科"];
    const {
      activeTab,
      curProv,
      currentData,
      isGetList,
      majorHistory,
      random
    } = this.state;
    const {
      Common,
      Subject: { subjectFilter },
    } = this.props.store;
    const scrollViewHeight = getScrollViewHeight(117 + 86 + 100);
    return (
      <View className="b-choose">
        <View className="top-bar">
          <Picker
            range={Common.province}
            value={curProv}
            onChange={this.handlePosition.bind(this)}
          >
            <View className="position">
              <Image className="icon" src={PositionIcon}></Image>
              <View className="label">省份</View>
              <View className="province">{curProv}</View>
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
                  <View className="sub-title">按组合选科</View>
                  <View className="sub-list">
                    {subjectFilter.sub3.map((subject) =>
                      this.stepItem(subject, 3)
                    )}
                  </View>
                  {this.isCanSubmit() && (
                    <View className="sub-desc">
                      此种选科组合可覆盖{random}%的专业
                    </View>
                  )}
                </View>
              )}
              {subjectFilter.type === "TYPE_2_AND_4" && (
                <View className="sub-select b-bottom-line">
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
              <Search onConfirm={this.handleSearchCollege.bind(this)} />
            </View>
            <ScrollView
              className="search-list"
              style={{ height: scrollViewHeight }}
              scrollY={true}
              scrollWithAnimation
              onScrollToLower={this.addListData.bind(this)}
              lowerThreshold={100}
            >
              <View>
                {currentData.map((n) => {
                  const labels =
                    (n.college_category && [n.college_category]) || [];
                  !!n.tag1 && labels.push("双一流");
                  !!n.tag2 && labels.push("985");
                  !!n.tag3 && labels.push("211");
                  return (
                    <CollegeItem
                      icon={n.cover_image}
                      name={n.college_name}
                      labels={labels}
                      local={n.province}
                      goto={this.goDetail.bind(this, n.college_name)}
                    />
                  );
                })}
                {currentData.length > this.pageSize && (
                  <View
                    className="loadmore"
                    onClick={this.addListData.bind(this)}
                  >
                    点击加载更多
                  </View>
                )}
                {isGetList && currentData.length === 0 && (
                  <View className="nomore">没有查询到相关院校</View>
                )}
              </View>
            </ScrollView>
          </View>
        )}
        {activeTab === "按专业查选科" && (
          <View className="main">
            <View className="search-bar2">
              <Search
                placeholder="搜索专业"
                onConfirm={this.handleSearchMajor.bind(this)}
              />
            </View>
            <View className="history-option">
              <View className="title">历史搜索</View>
              <Image
                className="remove"
                src={RemoveIcon}
                onClick={this.handleRmHistory.bind(this)}
              ></Image>
            </View>
            <View className="history-list">
              {majorHistory.map((n) => (
                <View className="item" onClick={this.goMajor.bind(this, n)}>
                  {n}
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Index;
