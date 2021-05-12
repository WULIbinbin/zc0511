import { View, Text } from '@tarojs/components'
import { Component } from 'react'

import './index.scss'

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
        <Text>自定义标题</Text>
      </View>
    </View>
  )
}

export default CustomNavigator

