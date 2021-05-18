import { Component } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { Describe } from '../../../components/index'

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
      <ScrollView className='b-subject-detail'>
        <View className='main'>
          <View className='topic'>
            <View className='title'>经济学类</View>
            <View className='code'>专业代码：020101</View>
          </View>
          <Describe title='基本信息'>
            学课门类:经济学
            学课大类:经济学类
            修业年限: 4
            授予学位:经济学学士
          </Describe>
        </View>
      </ScrollView>
    )
  }

}

export default Index