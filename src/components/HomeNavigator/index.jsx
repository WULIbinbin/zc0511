import { View, Text, Image } from '@tarojs/components'

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
      url:''
    },
    {
      icon:Tubiao2,
      text:'专业库',
      url:''
    },
    {
      icon:Tubiao3,
      text:'新高考选科',
      url:''
    },
    {
      icon:Tubiao4,
      text:'分数线查询',
      url:''
    },
  ]
  return (
    <View className='b-home-navigator'>
      {
        items.map((n,i) => (
          <View className='item'>
            <Image className='icon' src={n.icon}></Image>
            <Text className='label'>{n.text}</Text>
          </View>
        ))
      }
    </View>
  )
}

export default HomeNavigator