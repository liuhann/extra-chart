import React, { useEffect, useRef } from 'react'
import divideE2e from './layout/divide-e2e.js'
import divideC2c from './layout/divide-c2c.js'
import fixedC2c from './layout/fixed-c2c.js'
import fixedE2e from './layout/fixed-e2e.js'

import anime, { getRelativeValue } from '../anime.es'
import './button.css'

const layoutStrategy = {
  divideE2e,
  divideC2c,
  fixedC2c,
  fixedE2e
}

function usePrevious (value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const button33 = {
  boxShadow: 'rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px',
  boxShadowHover: 'rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px',
  backgroundColor: '#c2fbd7'
}

const button42 = {
  boxShadow: 'rgba(0, 0, 0, 0.1) 0 2px 4px',
  boxShadowHover: 'rgba(253, 76, 0, 0.5) 0 3px 8px',
  background: 'linear-gradient(-180deg, #FF7E31, #E62C03)'
}

const button2 = {
  background: 'rgba(51, 51, 51, 0.05)',
  color: '#333333'
}

const button5 = {
  background: '#fa6400',
  boxShadow: 'rgba(0, 0, 0, 0.02) 0 1px 3px 0',
  boxShadowHover: 'rgba(0, 0, 0, 0.1) 0 4px 12px'
}
const button19 = {
  background: '#1899D6',
  boxShadow: 'rgba(0, 0, 0, 0.02) 0 1px 3px 0',
  boxShadowHover: 'rgba(0, 0, 0, 0.1) 0 4px 12px'
}

const button7 = {
  boxShadow: 'rgba(255, 255, 255, .4) 0 1px 0 0 inset',
  border: '1px solid transparent',
  backgroundColor: '#0095ff'
}
const initStyles = {
  basic: d => {
    const background = `hsl( ${Math.random() * 360} , 70%, 50%)`
    return Object.assign({
      opactiy: 0,
      transformOrigin: 'center center',
      position: 'absolute',
      borderRadius: '100%',
      height: d.r + 'px',
      width: d.r + 'px'
    }, button19)
  }
}

const bubbleRenderer = (d, styleName, datas, options) => {
  let style = null
  if (typeof styleName === 'string') {
    style = initStyles[styleName](d)
  } else if (typeof styleName === 'function') {
    style = styleName(d)
  }

  return (
    <div
      data-seq={'bubble-' + d.i}
      className='bubble'
      key={d.i}
      style={style}
    />
  )
}

const calcLayout = (data, layout, options) => {
  if (layoutStrategy[layout]) {
    layoutStrategy[layout](data, options)
  } else if (typeof layout === 'function') {
    layout(data, options)
  } else {
    console.error('Provide Correct Layout Strategy： layout=' + layout, 'Availables: divideE2e,divideC2c,fixedC2c')
  }
}

export default ({
  values = [45, 23, 102, 43, 55, 82, 69],
  data = [{
    label: 'A'
  }, {
    label: ''
  }],
  // 分布方式：按边缘等分、按圆心距离等分、固定圆心距离
  layoutType = 'divideE2e',
  bubbleStyle = 'basic',
  // Average Length按距离等分
  al = 30,
  // Average Distance
  ad = 20,
  duration = 800,
  // 最大半径
  radiusMax = 60,
  // 最小半径
  radiusMin = 50,
  // 进入动画相关
  entranceDelay = 100,
  entranceTranslateX = '=0',
  entranceTranslateY = '-=0',
  entranceEasing = 'spring(1, 80, 10, 0)',
  width = 600,
  height = 300
}) => {
  const ref = useRef()
  if (!Array.isArray(values)) {
    return (
      <div>
        Error {values}
      </div>
    )
  }
  const bubbleData = values.map((value, i) => ({
    i,
    value
  }))

  calcLayout(bubbleData, layoutType, Object.assign({
    width,
    height,
    radiusMax,
    radiusMin,
    al,
    ad
  }))
  const preValues = usePrevious(bubbleData)
  useEffect(() => {
    if (preValues) {
      anime({
        targets: ref.current.querySelectorAll('.bubble'),
        duration,
        width: (el, i) => ([preValues[i] ? preValues[i].r : 0, bubbleData[i].r]),
        height: (el, i) => ([preValues[i] ? preValues[i].r : 0, bubbleData[i].r]),
        delay: (el, i) => entranceDelay * i,
        translateX: (el, i) => {
          if (preValues[i]) {
            return [preValues[i].x, bubbleData[i].x]
          } else {
            return [anime.getRelativeValue(entranceTranslateX, bubbleData[i].x), bubbleData[i].x]
          }
        },
        translateY: (el, i) => {
          if (preValues[i]) {
            return [preValues[i].y, bubbleData[i].y]
          } else {
            return [anime.getRelativeValue(entranceTranslateY, bubbleData[i].y), bubbleData[i].y]
          }
        },
        easing: entranceEasing
      })
    } else {
      anime({
        targets: ref.current.querySelectorAll('.bubble'),
        duration,
        opacity: [0, 1],
        width: (el, i) => ([0, bubbleData[i].r]),
        height: (el, i) => ([0, bubbleData[i].r]),
        delay: (el, i) => entranceDelay * i,
        translateX: (el, i) => {
          return [anime.getRelativeValue(entranceTranslateX, bubbleData[i].x), bubbleData[i].x]
        },
        translateY: (el, i) => {
          return [anime.getRelativeValue(entranceTranslateY, bubbleData[i].y), bubbleData[i].y]
        },
        easing: entranceEasing
      })
    }
  })

  return (
    <div
      style={{
        width: width + 'px',
        height: height + 'px',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
      }}
      ref={ref}
    >
      {bubbleData.map(d => bubbleRenderer(d, bubbleStyle, bubbleData))}
    </div>
  )
}
