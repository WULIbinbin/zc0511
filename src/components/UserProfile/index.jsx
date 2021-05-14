import { View,OpenData } from '@tarojs/components'
import './index.scss'

function UserProfile(){
  return (
    <View className='b-user-profile'>
      <OpenData type="userAvatarUrl" className='left'></OpenData>
      <View className='right'>
        <View className='phone'>18823336666</View>
        <View className='vip'>开通会员</View>
      </View>
    </View>
  )
}

export default UserProfile