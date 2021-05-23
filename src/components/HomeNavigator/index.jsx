import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

import Tubiao1 from '../../static/image/tubiao1.png'
import Tubiao2 from '../../static/image/tubiao2.png'
import Tubiao3 from '../../static/image/tubiao3.png'
import Tubiao4 from '../../static/image/tubiao4.png'



function HomeNavigator() {
  const items = [
    {
      icon:Tubiao1,
      text:'院校库',
      url:'/pages/college/lib/index'
    },
    {
      icon:Tubiao2,
      text:'专业库',
      url:'/pages/subject/lib/index'
    },
    {
      icon:Tubiao3,
      text:'新高考选科',
      url:'/pages/choose/index/index'
    },
    {
      icon:Tubiao4,
      text:'分数线查询',
      url:'/pages/score/index'
    },
  ]
  const handleTo = (url)=>{
    Taro.navigateTo({url})
  }
  return (
    <View className='b-home-navigator'>
      {
        items.map((n,i) => (
          <View className='item' onClick={()=>{handleTo(n.url)}}>
            <Image className='icon' src={n.icon}></Image>
            <Text className='label'>{n.text}</Text>
          </View>
        ))
      }
    </View>
  )
}

export default HomeNavigator