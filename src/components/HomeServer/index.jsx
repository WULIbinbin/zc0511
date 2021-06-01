import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { observer, inject } from "mobx-react";
import "./index.scss";
import Lock from "../../static/image/lock.png";
import ShenHe from "../../static/image/shenhe.png";
import TianBao from "../../static/image/tianbao.png";
import ZhiDao from "../../static/image/zhidao.png";

import Tuxing1 from "../../static/image/tuxing1.png";
import Tuxing2 from "../../static/image/tuxing2.png";
import Tuxing3 from "../../static/image/tuxing3.png";

function HomeServer({ store }) {
  const { Review, Tutor } = store;
  const items = [
    {
      icon: ShenHe,
      title: "志愿审核服务",
      desc:
        "根据近几年高考数据和最新高考政策，基于大数据和人工智能算法，帮您分析所填的志愿方案，是否合理，是否为最佳配置！",
      label: "院校审核",
      bg: Tuxing1,
      bgClass: "linear-bg1",
      isLock: !Review.hasPay,
      link: "/pages/volunteer/review/index",
    },
    {
      icon: TianBao,
      title: "志愿填报辅导",
      desc:
        "根据近几年高考数据和最新高考政策，结合全国就业趋势，利用大数据和人工智能算法、霍兰德职业模型、MBTI职业性格模型，帮您一键推荐最优院校、最适合的专业！",
      label: "智能推荐",
      bg: Tuxing2,
      bgClass: "linear-bg2",
      isLock: !Tutor.hasPay,
      link: "/pages/volunteer/tutor/index",
    },
    {
      icon: ZhiDao,
      title: "专家在线指导填报",
      desc:
        "拥有10年以上志愿指导经验的教育专家，在线指导填报，参考考生的分数、性格特点，依据今年各大院校的招生计划，有针对性的一对一VIP指导！",
      label: "在线指导",
      bg: Tuxing3,
      bgClass: "linear-bg3",
      isLock: true,
      link: "/pages/volunteer/online/index",
    },
  ];
  return (
    <View className="b-home-server">
      {items.map((n) => (
        <View
          className={`server-item ${n.bgClass}`}
          onClick={() => {
            Taro.navigateTo({
              url: n.link,
            });
          }}
        >
          <Image className="icon" src={n.icon}></Image>
          <View className="content">
            {n.isLock && (
              <View className="right-top">
                <Image className="lock" src={Lock}></Image>
              </View>
            )}
            <View className="title">{n.title}</View>
            <View className="desc">{n.desc}</View>
            <View className="bottom">
              <View className="label">{n.label}</View>
              <Image className="bg" mode="heightFix" src={n.bg}></Image>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

export default inject("store")(observer(HomeServer));
