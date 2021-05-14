import { ScrollView, View } from '@tarojs/components'

import './index.scss'

function PageView({ children = null }) {
  return (
    <ScrollView scrollY className='b-page-main'>
      <View className='b-page-body'>
        {children}
      </View>
    </ScrollView>
  )
}

export default PageView