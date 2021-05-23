import { Component } from "react";
import { View, ScrollView, Image, Button } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import {
  HomeBanner,
  HomeTitle,
  HomeNavigator,
  HomeServer,
  PageView,
} from "../../components/index";
import { GetBanner } from "../../request/apis/home";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {

  state = {
    banner:[]
  }

  componentWillMount() {}

  componentDidMount() {
    GetBanner().then(res=>{
      this.setState({banner:res.data})
    })
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const items = new Array(4).fill({});
    const {banner} = this.state
    return (
      <PageView bgColor="#f7f7f7">
        <View className="b-home">
          <HomeBanner banner={banner}/>
          <HomeNavigator items={items} />
          <HomeTitle title="人工智能指导" />
          <Image className="b-home-poster"></Image>
          <HomeTitle title="志愿填报服务" />
          <HomeServer />
        </View>
      </PageView>
    );
  }
}

export default Index;
