import { Component } from "react";
import { View } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { PageView } from "../../../components/index";
import {
  VolStar
} from "../components/index";
import "./index.scss";

import Yuwen from '../image/yuwen.png'
import Shuxue from '../image/shuxue.png'
import Yingyu from '../image/yingyu.png'
import Wuli from '../image/wuli.png'
import Shengwu from '../image/shengwu.png'
import Huaxue from '../image/huaxue.png'


@inject("store")
@observer
class Index extends Component {

  componentDidMount() {

  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const Stars = [
      {
        icon:Yuwen,
        name:'语文'
      },
      {
        icon:Shuxue,
        name:'数学'
      },
      {
        icon:Yingyu,
        name:'英语'
      },
      {
        icon:Wuli,
        name:'物理'
      },
      {
        icon:Huaxue,
        name:'化学'
      },
      {
        icon:Shengwu,
        name:'生物'
      },
    ]
    return (
      <PageView bgColor='#f7f7f7'>
       <View>
         {Stars.map(n=>(
           <VolStar {...n}/>
         ))}
       </View>
      </PageView>
    );
  }
}

export default Index;
