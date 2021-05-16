import { View, SwiperItem, Swiper, Image } from '@tarojs/components'

import './index.scss'
import BannerImage from '../../static/image/home-banner.png'

function HomeBanner() {
  const items = [
    {
      img: BannerImage,
    }
  ]
  return (
    <View className='b-home-banner'>
      <Swiper className='banner-img'>
        {items.map(n => (
          <SwiperItem>
            <Image className='banner-img' src={n.img}></Image>
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  )
}

export default HomeBanner