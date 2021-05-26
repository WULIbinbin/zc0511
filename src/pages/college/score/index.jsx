import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Picker } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { Table, SelectLabel } from "../../../components/index";
import { SearchScoreLine } from "../../../request/apis/college";
import "./index.scss";

const thead = [
  {
    key: "Year",
    name: "年份",
  },
  {
    key: "ScoreBatch",
    name: "批次",
  },
  {
    key: "Score",
    name: "分数",
  },
];

const years = ((now, yes) => {
  return new Array(now - yes + 1).fill(0).map((n, i) => {
    return 2020 - i;
  });
})(2020, 2015);

@inject("store")
@observer
class Index extends Component {
  state = {
    province: "北京",
    year: "2020",
    category: "综合",
    tbody: [],
  };
  componentWillMount() {}

  componentDidMount() {
    const params = { ...this.state };
    delete params.tbody;
    this.getScore(params);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleChange(key, e) {
    const { Common } = this.props.store;
    const { value } = e.detail;
    const params = { ...this.state };
    delete params.tbody;
    switch (key) {
      case "province":
        params["province"] = Common["province"][value];
        break;
      case "year":
        params["year"] = years[value];
        break;
      case "category":
        params["category"] = Common["subtype"][value];
        break;
    }
    this.getScore(params);
  }
  getScore(params) {
    Taro.showLoading({mask:true})
    SearchScoreLine(params).then((res) => {
      Taro.hideLoading()
      this.setState({
        ...params,
        tbody: res.data,
      });
    }).catch(err=>{
      Taro.hideLoading()
    });
  }
  render() {
    const { province, year, category, tbody } = this.state;
    const { Common } = this.props.store;
    return (
      <View className="b-score-search">
        <View className="top-select">
          <Picker
            range={Common.province}
            value={province}
            onChange={this.handleChange.bind(this, "province")}
          >
            <SelectLabel label="省份：" value={province} />
          </Picker>
          <Picker
            range={years}
            value={year}
            onChange={this.handleChange.bind(this, "year")}
          >
            <SelectLabel label="年份：" value={year} />
          </Picker>

          <Picker
            range={Common.subtype}
            value={category}
            onChange={this.handleChange.bind(this, "category")}
          >
            <SelectLabel label="科类：" value={category} />
          </Picker>
        </View>
        <View className="body-table">
          <View className="title">录取分数</View>
          <Table thead={thead} tbody={tbody} />
        </View>
      </View>
    );
  }
}

export default Index;
