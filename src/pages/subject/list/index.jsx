import { Component } from 'react'
import { View, ScrollView, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { Bread } from '../../../components/index'
import ArrowRight from '../../../static/image/arrow-right.png'

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
    const sub = ['本科', '经济学']
    return (
      <ScrollView className='b-subject-list'>
        <View className='main'>
          <View className='topic'>
            <View className='title'>经济学类</View>
            <Bread items={sub} />
          </View>
          <View className='list'>
            <View className='item'>
              <View className='info'>
                <View className='title'>经济学类</View>
                <View className='desc'>
                  <Bread items={sub} />
                  <View className='year'>学制：四年</View>
                </View>
              </View>
              <Image className='arrow' src={ArrowRight}></Image>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }

}

export default Index