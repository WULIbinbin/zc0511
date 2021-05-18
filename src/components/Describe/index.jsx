import { View, Text } from '@tarojs/components'
import './index.scss'

function Describe({ title = '', children = null }) {
  return (
    <View className='b-describe'>
      <View className='title'>{title}</View>
      <View className='content'>
        <Text decode>{children}</Text>
      </View>
    </View>
  )
}

export default Describe