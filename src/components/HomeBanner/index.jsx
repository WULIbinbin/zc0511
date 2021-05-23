import { View, SwiperItem, Swiper, Image } from "@tarojs/components";
import {getConfig} from '../../request/index'
import "./index.scss";

function HomeBanner({ banner = [] }) {
  const items = banner;
  const {baseUrl} = getConfig()
  return (
    <View className="b-home-banner">
      <Swiper className="banner-img">
        {items.map((n) => (
          <SwiperItem>
            <Image className="banner-img" src={baseUrl+'/'+n.images}></Image>
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  );
}

export default HomeBanner;
