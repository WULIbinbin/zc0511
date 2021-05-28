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
    activeTab: "按学校查选科",
    position: "北京",
    isGetList: "",
    currentData: [],
    currentPage: 0,
    params: {},
  };
  allData = [];
  pageSize = 50;
  componentWillMount() {
    const { Subject } = this.props.store;
    Subject.setCurProv("北京");
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

  getList() {
    Taro.showLoading();
    this.setState({
      isGetList: false,
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
    Taro.navigateTo({
      url: `/pages/choose/college/index?schoolName=${name}`,
    });
  }

  handleSearch(e){
    this.setState({
      params:{
        schoolName:e.value
      }
    },()=>{
      this.getList()
    })
  }

  render() {
    const tabs = ["按选科查专业", "按学校查选科", "按专业查选科"];
    const { activeTab, position,currentData,isGetList } = this.state;
    const subItems = ["物理", "历史"];
    const college = new Array(20).fill({});
    const historyItem = ["物理", "历史", "23333"];
    const {
      Common,
      Subject: { subjectFilter },
    } = this.props.store;
    const scrollViewHeight = getScrollViewHeight(117+86+100)
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
              <Search onConfirm={this.handleSearch.bind(this)}/>
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
