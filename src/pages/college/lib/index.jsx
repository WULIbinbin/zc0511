import { Component } from "react";
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
    list: [],
    currentPage: 1,
  };

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
    let { currentPage } = this.state;
    GetCollegeList({ pageNum: currentPage, pageSize: 20 }).then((res) => {
      const { list, pages, pageNum } = res.data;
      if (pageNum < pages) {
        currentPage = pageNum + 1;
      }
      this.setState({
        list,
        currentPage,
      });
    });
  }

  render() {
    const { list } = this.state;
    return (
      <View className="b-lib-search">
        <View className="options">
          <Search />
          <View className="pickers">
            <PickerSelect onChange={this.handlePicker} />
          </View>
        </View>
        <ScrollView
          scrollY
          className="result"
          onScrollToLower={this.getList.bind(this)}
          lowerThreshold={50}
        >
          {list.map((n) => (
            <CollegeItem
              icon={n.schoolLogo}
              name={n.schoolName}
              labels={n.schoolTags.split(",")}
              local={n.province}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default Index;
