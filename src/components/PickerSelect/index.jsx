import { useCallback, useEffect, useState } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import './index.scss'

import SelectIcon from '../../static/image/select.png'

function PickerSelect({ placeHolder = '请选择', value = '', items = [], onChange = null }) {
  const mapItems = new Array(50).fill(null).map((item, i) => {
    return {
      name: '北京' + i,
      value: '北京',
      selected: false
    }
  })
  const [isShow, setShow] = useState(false)
  const [selected, setSelect] = useState(new Set())
  const [maps, setMaps] = useState(mapItems)

  const showPicker = (e) => {
    setShow(!isShow)
  }

  const handleSelect = (sel) => {
    const newMaps = [...maps]
    if (!selected.has(sel)) {
      selected.add(sel)
      newMaps[sel].selected = true
    } else {
      selected.delete(sel)
      newMaps[sel].selected = false
    }
    setSelect(selected)
    setMaps(newMaps)
  }

  const handleReset = useCallback(() => {
    const newMaps = [...maps].map(item => {
      return {
        ...item,
        selected: false
      }
    })
    selected.clear()
    setSelect(selected)
    setMaps(newMaps)
  })

  const handleSubmit = useCallback(() => {
    onChange && onChange(selected)
  })

  const iconDirection = isShow ? 'up' : ''
  return (
    <View className='b-picker-item'>
      <View className='picker-view' onClick={showPicker}>
        <View className='label'>{value || placeHolder}</View>
        <Image className={`icon ${iconDirection}`} src={SelectIcon}></Image>
      </View>
      {
        isShow &&
        <View className='select-view'>
          <View className='select-content'>
            <ScrollView scrollY className='select-wrap'>
              <View className='select-items'>
                {
                  maps.map((item, idx) => (
                    <View className={`item ${item.selected ? 'selected' : ''}`} onClick={() => {
                      handleSelect(idx)
                    }}>{item.name}</View>
                  )).slice()
                }
              </View>
            </ScrollView>
            <View className='btn-view'>
              <View className='reset btn' onClick={handleReset}>重置</View>
              <View className='submit btn' onClick={handleSubmit}>确定</View>
            </View>
          </View>
          <View className='select-mark'></View>
        </View>
      }
    </View>
  )
}

export default PickerSelect