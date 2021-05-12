import { Component } from 'react'
import { View, ScrollView,Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { HomeBanner, HomeTitle, HomeNavigator } from '../../components/index'

import './index.scss'


@inject('store')
@observer
class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const items = new Array(4).fill({})
    return (
      <ScrollView scrollY className='b-home-main'>
        <nav-bar />
        <View className='b-home-body'>
          <HomeBanner />
          <HomeNavigator items={items} />
          <HomeTitle title='人工智能指导' />
          <Image className='b-home-poster'></Image>
        </View>
      </ScrollView>
    )
  }
}

export default Index
