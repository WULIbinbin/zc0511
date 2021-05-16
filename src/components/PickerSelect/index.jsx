import { useCallback, useEffect, useState } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import PickerLabel from '../PickerLabel/index'
import './index.scss'

import SelectIcon from '../../static/image/select.png'

function PickerSelect({ placeHolder = '请选择', onChange = null }) {
  const mapItems = new Array(50).fill(null).map((item, i) => {
    return {
      name: '北京' + i,
      value: '北京',
      selected: false
    }
  })
  const pickers = [
    {
      label: '地区',
      range: mapItems
    },
    {
      label: '层次',
      range: []
    },
    {
      label: '类型',
      range: []
    },
  ]
  const [selected, setSelect] = useState(new Set())
  const [currentShow, setPicker] = useState(-1)
  const [maps, setMaps] = useState([])

  const showPicker = (whichShow) => {
    if (whichShow === currentShow) {
      setPicker(-1)
      return
    }
    setPicker(whichShow)
    setMaps(pickers[whichShow].range)
    onChange && onChange()
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
    const result = maps.filter(m => !!m.selected)
    onChange && onChange(result)
  })

  const { screenWidth } = wx.getSystemInfoSync()
  const selectViewStyle = { width: screenWidth + 'PX' }
  return (
    <View className='b-picker-item'>
      <View className='picker-group'>
        {
          pickers.map((p, pdx) => (
            <PickerLabel 
              value={p.label}
              onChange={()=>{
                showPicker(pdx)
              }}
            />
          ))
        }
      </View>
      {
        currentShow >= 0 &&
        <View className='select-view' style={selectViewStyle}>
          <View className='select-content'>
            <ScrollView scrollY className='select-wrap'>
              <View className='select-items'>
                {
                  maps.map((item, idx) => (
                    <View
                      className={`item ${item.selected && 'selected'}`}
                      onClick={() => {
                        handleSelect(idx)
                      }}
                    >{item.name}</View>
                  ))
                }
              </View>
            </ScrollView>
            <View className='btn-view'>
              <View className='reset btn' onClick={handleReset}>重置</View>
              <View className='submit btn' onClick={handleSubmit}>确定</View>
            </View>
          </View>
          <View className='select-mark' onClick={() => {
            setPicker(-1)
          }}></View>
        </View>
      }
    </View>
  )
}

export default PickerSelect