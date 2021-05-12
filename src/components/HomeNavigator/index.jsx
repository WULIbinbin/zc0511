import { View, Text, Image } from '@tarojs/components'

import './index.scss'

function HomeNavigator({ items = [] }) {
  return (
    <View className='b-home-navigator'>
      {
        items.map((n,i) => (
          <View className='item'>
            <Image className='icon'></Image>
            <Text className='label'>item{i+1}</Text>
          </View>
        ))
      }
    </View>
  )
}

export default HomeNavigator