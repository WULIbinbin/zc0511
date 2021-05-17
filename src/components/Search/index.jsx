import { View, Input,Image } from '@tarojs/components'

import './index.scss'
import SearchIcon from '../../static/image/search.png'

function Search() {
  return (
    <View className='b-search'>
      <Image className='icon' src={SearchIcon}></Image>
      <Input className='input' placeholder='搜索大学'></Input>
    </View>
  )
}

export default Search