import { Component } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { HomeBanner } from '../../components/index'

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
    return (
      <ScrollView scrollY className='b-home-main'>
        <nav-bar />
        <View className='b-home-body'>
          <HomeBanner />
        </View>
      </ScrollView>
    )
  }
}

export default Index
