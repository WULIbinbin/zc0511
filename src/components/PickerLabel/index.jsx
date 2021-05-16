import { useCallback, useState } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'

import SelectIcon from '../../static/image/select.png'

function PickerLabel({ placeHolder = '请选择', value = '', onShow = false, onChange = null }) {
  const handleClick = useCallback(() => {
    onChange && onChange()
  })
  return (
    <View className='picker-view' onClick={handleClick}>
      <View className={`label ${onShow && 'on-show'}`}>{value || placeHolder}</View>
      <Image className={`icon ${onShow && 'up'}`} src={SelectIcon}></Image>
    </View>
  )
}

export default PickerLabel