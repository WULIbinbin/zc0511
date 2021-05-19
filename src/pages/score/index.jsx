import { Component } from "react";
import { View, Picker } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { Table, SelectLabel } from "../../components/index";

import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const thead = [
      {
        key: "year",
        name: "年份",
      },
      {
        key: "batch",
        name: "批次",
      },
      {
        key: "score",
        name: "分数",
      },
    ];
    const tbody = [
      {
        year: "2020",
        batch: "提前批",
        score: "686",
      },
      {
        year: "2020",
        batch: "提前批",
        score: "686",
      },
    ];
    return (
      <View className="b-score-search">
        <View className="top-select">
          <Picker>
            <SelectLabel label="省份：" />
          </Picker>
          <SelectLabel label="年份：" />
          <SelectLabel label="科类：" />
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
