import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Input, Image, ScrollView } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { PickerSelect, Search, CollegeItem } from "../../../components/index";
import { GetCollegeList } from "../../../request/apis/college";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  state = {
    showPicker: null,
    isShowPicker: false,
    pickerRange: [],
    currentData: [],
    currentPage: 1,
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

  handlePicker(e) {
    console.log(e);
  }

  getList() {
    Taro.showLoading();
    GetCollegeList({}).then((res) => {
      Taro.hideLoading();
      const { list } = res.data;
      this.allData = list;
      const currentData = list.slice(0, this.pageSize);
      this.setState({
        currentData,
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

  render() {
    const { currentData, currentPage } = this.state;
    const {
      Common: { province, category, level },
    } = this.props.store;
    return (
      <View className="b-lib-search">
        <View className="options">
          <Search />
          <View className="pickers">
            <PickerSelect
              province={province}
              category={category}
              level={level}
              onChange={this.handlePicker}
            />
          </View>
        </View>
        <ScrollView
          scrollY
          className="result"
          onScrollToLower={this.addListData.bind(this)}
          lowerThreshold={100}
        >
          <View>
            {currentData.map((n) => (
              <CollegeItem
                icon={n.cover_image}
                name={n.college_name}
                labels={(n.college_category && [n.college_category]) || []}
                local={n.province}
              />
            ))}
            {currentPage > 1 && (
              <View className="loadmore" onClick={this.addListData.bind(this)}>
                点击加载更多
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Index;
