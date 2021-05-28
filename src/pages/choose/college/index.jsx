import { Component } from "react";
import { View, ScrollView } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from '@tarojs/taro'
import { PickerSelect, Table } from "../../../components/index";
import { SearchSubject } from "../../../request/apis/college";
import { getScrollViewHeight } from "../../../utils/tool";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  state = {
    params: {},
    tbody: [],
  };
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    const {
      options: { subStr, fromProvince },
    } = getCurrentPages()[getCurrentPages().length - 1];
    Taro.showLoading()
    this.setState(
      {
        params: {
          subStr,
          fromProvince,
          pageNum: 1,
          pageSize: 20,
        },
      },
      () => {
        this.getList();
      }
    );
  }

  componentDidHide() {}

  handleChange(data) {
    console.log(data);
  }

  getList() {
    let { params, tbody } = this.state;
    SearchSubject(params).then((res) => {
      Taro.hideLoading()
      const { list, pages } = res.data;
      const newlist = list.map((n) => {
        return {
          ...n,
          includes: "-",
          sub: n.sub == 0 ? "不限" : "-",
        };
      });
      tbody = tbody.concat(newlist);
      if (params.pageNum < pages) {
        params.pageNum += 1;
      }
      this.setState({
        tbody,
        params,
      });
    });
  }

  render() {
    const thead = [
      {
        key: "collegeName",
        name: "院校名称",
      },
      {
        key: "majorName",
        name: "专业名称",
      },
      {
        key: "includes",
        name: "包含专业",
      },
      {
        key: "sub",
        name: "选科要求",
      },
    ];
    const {
      Common: { province, level },
    } = this.props.store;
    const pickers = [
      {
        label: "院校地区",
        range: province,
      },
      {
        label: "院校层次",
        range: level,
      },
    ];
    const scrollViewHeight = getScrollViewHeight(90);
    const { tbody } = this.state;
    return (
      <View className="b-choose-college">
        <View className="top-bar">
          <PickerSelect
            style={{ padding: "0 140rpx" }}
            range={pickers}
            onChange={this.handleChange.bind(this)}
          />
        </View>
        <ScrollView
          style={{ height: scrollViewHeight }}
          scrollY
          className="main"
          scrollWithAnimation
          onScrollToLower={this.getList.bind(this)}
          lowerThreshold={200}
        >
          <View className="list">
            <Table thead={thead} tbody={tbody} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Index;
