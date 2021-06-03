import { View, SwiperItem, Swiper, Image } from "@tarojs/components";
import { getConfig } from "../../request/index";
import Taro from "@tarojs/taro";
import "./index.scss";

function HomeBanner({ banner = [] }) {
  const items = banner;
  const { baseUrl } = getConfig();
  const handleTo = (data) => {
    console.log(data)
    if (!data.isLink || !data.linkAddress) return;
    if (
      data.linkAddress.includes("http://") ||
      data.linkAddress.includes("https://")
    ) {
      Taro.navigateTo({
        url: `/pages/webview/index?url=${data.linkAddress}&title=${data.title}`,
      });
    } else {
      Taro.navigateTo({
        url: data.linkAddress,
      });
    }
  };
  return (
    <View className="b-home-banner">
      <Swiper className="banner-img">
        {items.map((n) => (
          <SwiperItem>
            <Image
              className="banner-img"
              src={baseUrl + "/" + n.images}
              onClick={()=>{
                handleTo(n)
              }}
            ></Image>
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  );
}

export default HomeBanner;
