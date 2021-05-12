import { View, Text } from '@tarojs/components'
import './index.scss'

function HomeTitle({ title = '' }) {
  return (
    <View className='b-home-title'>
      <Text className='title'>{title}</Text>
    </View>
  )
}


export default HomeTitle