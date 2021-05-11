import { View, Text } from '@tarojs/components'
import { Component } from 'react'

import './index.less'

function CustomNavigator() {
  const { statusBarHeight, system } = wx.getSystemInfoSync()
  const isIOS = system.indexOf('iOS') > -1
  const navBarHeight = isIOS ? 44 : 48
  const style = {
    paddingTop: `${statusBarHeight}PX`,
    height: `${navBarHeight}PX`,
  }
  return (
    <View className='b-custom-navbar' style={style}>
      <View className='left'>
        <Text>2333</Text>
      </View>
    </View>
  )
}

export default CustomNavigator