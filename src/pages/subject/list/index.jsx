import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { Bread } from "../../../components/index";
import { GetSubjectList } from "../../../request/apis/college";

import ArrowRight from "../../../static/image/arrow-right.png";

import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  state = {
    topic: {
      subjectName: "",
      categoryName: "",
      type: "",
    },
    list: [],
  };
  componentWillMount() {}

  componentDidMount() {
    const {
      options: { subjectName, categoryName, type },
    } = getCurrentPages()[getCurrentPages().length - 1];
    Taro.showLoading({title:'加载中'});
    GetSubjectList({
      // categoryId: categoryName,
      majorName: subjectName,
      categoryName,
    }).then((res) => {
      Taro.hideLoading();
      this.setState({
        topic: {
          subjectName,
          categoryName,
          type,
        },
        list: res.data,
      });
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  goDetail(n) {
    Taro.navigateTo({
      url: `/pages/subject/detail/index?code=${n.code}`,
    });
  }

  render() {
    const { topic, list } = this.state;
    return (
      <ScrollView scrollY className="b-subject-list">
        <View className="main">
          <View className="topic">
            <View className="title">{topic.categoryName}</View>
            <Bread items={[topic.type, topic.subjectName]} />
          </View>
          <View className="list">
            {list.map((item) => (
              <View
                className="item b-bottom-line"
                onClick={this.goDetail.bind(this, item)}
              >
                <View className="info">
                  <View className="title">{item.majorName}</View>
                  <View className="desc">
                    <Bread items={[topic.type, item.subjectName]} />
                    <View className="year">
                      学制：{topic.type === "本科" ? "四年" : "三年"}
                    </View>
                  </View>
                </View>
                <Image className="arrow" src={ArrowRight}></Image>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Index;
