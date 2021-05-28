import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Input, Image, ScrollView } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { PickerSelect, Search, CollegeItem } from "../../../components/index";
import { GetCollegeList } from "../../../request/apis/college";
import { getScrollViewHeight } from "../../../utils/tool";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  state = {
    showPicker: null,
    isShowPicker: false,
    pickerRange: [],
    currentData: [],
    currentPage: 0,
    params: {},
    isGetList: false,
  };
  allData = [];
  pageSize = 50;
  componentWillMount() {}

  componentDidMount() {
    this.getList();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handlePicker(data) {
    if (!data) return;
    const params = {};

    if (data.hasOwnProperty("层次")) {
      const level = data["层次"];
      if (level.length > 0) {
        if (level.includes("双一流")) {
          params.tag1 = 1;
        } else {
          params.tag1 = 0;
        }
        if (level.includes("985")) {
          params.tag2 = 1;
        } else {
          params.tag2 = 0;
        }
        if (level.includes("211")) {
          params.tag3 = 1;
        } else {
          params.tag3 = 0;
        }
        if (level.includes("本科") && !level.includes("专科")) {
          params.schoolType = "本科";
        } else if (!level.includes("本科") && level.includes("专科")) {
          params.schoolType = "专科";
        } else {
          params.schoolType = "";
        }
      }
      if (data["地区"]) {
        params.province = data["地区"].join(",");
      }
      if (data["类型"]) {
        params.category = data["类型"].join(",");
      }
    } else if (data.hasOwnProperty("schoolName")) {
      params.schoolName = data.schoolName;
    }
    console.log(params);
    this.setState({ params }, () => {
      this.getList();
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
      url: `/pages/college/detail/index?name=${name}`,
    });
  }

  render() {
    const { currentData, isGetList } = this.state;
    const {
      Common: { province, category, level },
    } = this.props.store;
    const pickers = [
      {
        label: "地区",
        range: province,
      },
      {
        label: "层次",
        range: level,
      },
      {
        label: "类型",
        range: category,
      },
    ];
    const scrollViewHeight = getScrollViewHeight(90 + 97);
    return (
      <View className="b-lib-search">
        <View className="options">
          <Search name="schoolName" onConfirm={this.handlePicker.bind(this)} />
          <View className="pickers">
            <PickerSelect
              style={{ padding: "0 25rpx" }}
              range={pickers}
              onChange={this.handlePicker.bind(this)}
            />
          </View>
        </View>
        <ScrollView
          className="result"
          style={{ height: scrollViewHeight }}
          scrollY={true}
          scrollWithAnimation
          onScrollToLower={this.addListData.bind(this)}
          lowerThreshold={100}
        >
          <View>
            {currentData.map((n) => {
              const labels = (n.college_category && [n.college_category]) || [];
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
              <View className="loadmore" onClick={this.addListData.bind(this)}>
                点击加载更多
              </View>
            )}
            {isGetList && currentData.length === 0 && (
              <View className="nomore">没有查询到相关院校</View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Index;
