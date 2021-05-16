import { ScrollView, View } from '@tarojs/components'

import './index.scss'

function PageView({ children = null, bgColor = '#fff' }) {
  return (
    <ScrollView scrollY className='b-page-main' style={{ backgroundColor: bgColor }}>
      <View className='b-page-body'>
        {children}
      </View>
    </ScrollView>
  )
}

export default PageView