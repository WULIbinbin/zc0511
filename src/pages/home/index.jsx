import { Component } from 'react'
import { View, ScrollView, Image, Button } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { HomeBanner, HomeTitle, HomeNavigator, HomeServer, PageView } from '../../components/index'
import { Request, getConfig } from '../../request/index'
import './index.scss'


@inject('store')
@observer
class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleGetPhone(e) {
    console.log(e)
    const { encryptedData, iv, errMsg } = e.detail
    wx.login({
      success(res) {
        console.log(res)
        Request({
          url: `/wx/miniprogram/user/login`,
          data: {
            code: res.code
          }
        }).then(res => {
          console.log(res)
          const { sessionKey } = res
          return Request({
            url: `/wx/miniprogram/user/phone`,
            data: {
              sessionKey,
              encryptedData,
              iv
            }
          }).then(res => {
            console.log(res)
          })
        })
      }
    })
  }

  handleGetUserInfo(){
    wx.getUserProfile({
      desc:'获取用户信息',
      success(res){
        console.log(res)
      },fail(err){
        console.log(err)
      }
    })
  }

  render() {
    const items = new Array(4).fill({})
    return (
      <PageView bgColor='#f7f7f7'>
        <View className='b-home'>
          {/* <nav-bar /> */}
          {/* <Button openType='getPhoneNumber' onGetPhoneNumber={this.handleGetPhone.bind(this)}>测试手机号</Button>
          <Button openType='getUserInfo' onClick={this.handleGetUserInfo.bind(this)}>测试用户信息</Button> */}
          <HomeBanner />
          <HomeNavigator items={items} />
          <HomeTitle title='人工智能指导' />
          <Image className='b-home-poster'></Image>
          <HomeTitle title='志愿填报服务' />
          <HomeServer />
        </View>
      </PageView>
    )
  }
}

export default Index
