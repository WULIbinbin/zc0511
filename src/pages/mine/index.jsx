import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { UserProfile, PageView, Card } from '../../components/index'

import './index.scss'
import VipBanner from '../../static/image/vip-banner.png'
import IconSave from '../../static/image/save.png'
import IconUniversity from '../../static/image/university.png'
import IconReport from '../../static/image/report.png'


@inject('store')
@observer
class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const numbers = [
      {
        num: 0,
        label: '我的推荐'
      },
      {
        num: 0,
        label: '我的收益'
      }
    ]
    const infos = [
      {
        label: '成绩:',
        info: ['585']
      },
      {
        label: '科类:',
        info: ['物理', '生物']
      },
      {
        label: '学籍:',
        info: ['郴州市北湖一中']
      },
    ]
    const enter1 = {
      text: '适合我的大学',
      num: 99,
      icon: IconUniversity
    }
    const enter2 = {
      text: '我的综合报告',
      num: 0,
      icon: IconReport
    }

    return (
      <PageView>
        <View className='b-mine'>
          <UserProfile />

          <View className='b-mine-numbers'>
            {
              numbers.map((n, i) => (
                <View className={['items', i === 0 && 'b-right-line']}>
                  <View className='num'>{n.num}</View>
                  <View className='label'>{n.label}</View>
                </View>
              ))
            }
          </View>

          <View className='b-mine-vip-banner'>
            <Image className='vip-banner' src={VipBanner} mode="widthFix"></Image>
          </View>

          <Card
            label='录入信息'
            icon={IconSave}
          >
            <View className='b-mine-information'>
              {
                infos.map(la => (
                  <View className='info-item'>
                    <View className='label'>{la.label}</View>
                    {
                      la.info.length && la.info.map(items => (
                        <View className='items'>{items}</View>
                      ))
                    }
                  </View>
                ))
              }
            </View>
          </Card>

          <View className='b-mine-twice-enter'>
            <View className='enter-item'>
              <View className='num'>{enter1.num}<View className='plus'>+</View></View>
              <View className='label'>
                <Image className='icon' src={enter1.icon}></Image>
                <View className='text'>{enter1.text}</View>
              </View>
            </View>
            <View className='enter-item'>
              <View className='num'>{enter2.num}</View>
              <View className='label'>
                <Image className='icon' src={enter2.icon}></Image>
                <View className='text'>{enter2.text}</View>
              </View>
            </View>
          </View>

          <View className='b-mine-contact'>联系我们：szcy_666<View className='copy'>复制</View></View>
        </View>
      </PageView>
    )
  }

}

export default Index