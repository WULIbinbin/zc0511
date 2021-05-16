import { useState } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'

import SelectIcon from '../../static/image/select.png'

function PickerSelect({ placeHolder = '请选择', value = '', onChange = null }) {
  const [isShow, setShow] = useState(false)
  const showPicker = (e) => {
    setShow(!isShow)
  }
  const iconDirection = isShow ? 'up' : ''
  return (
    <View className='b-picker-item'>
      <View className='picker-view' onClick={showPicker}>
        <View className='label'>{value || placeHolder}</View>
        <Image className={`icon ${iconDirection}`} src={SelectIcon}></Image>
      </View>
      {isShow && <View className='picker-content'>23333</View>}
    </View>
  )
}

export default PickerSelect