import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import anime from 'animejs'

function usePrevious (value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const bubbleRenderer = data => {
  data.ref = useRef()
  const background = `hsl( ${Math.random() * 360} , 70%, 50%)`
  return (
    <div
      ref={data.ref}
      key={data.i}
      style={{
        // boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2), inset 0px 10px 30px 5px rgba(255, 255, 255, 1)',
        transformOrigin: 'center center',
        position: 'absolute',
        background,
        borderRadius: '100%',
        height: data.r + 'px',
        width: data.r + 'px'
      }}
    />
  )
}

const initCircle = d => {

}

const calcLayout = (data, layout, options) => {
  if (layout === 'divide-e2e') {
    // 等分全部长度，保证圆边缘距离相等
    const averageLength = options.width / (data.length - 1)
    const minRadius = options.radiusMin || averageLength / 5
    const maxRadius = options.radiusMax || averageLength
    const calcWidth = d3.scaleLinear()
      .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)])
      .range([minRadius, maxRadius])

    data.forEach((d, i) => {
      d.radius = calcWidth(d.value)
    })

    // 计算间距  总长度 - 所有圆直径 / 圆数量 -1
    const sl = (options.width - d3.sum(data, d => d.radius)) / (data.length - 1)

    // 左侧
    const leftPoss = data.map((d, i) => {
      if (d.i === 0) {
        return 0
      } else {
        return (data[i - 1].radius) + sl
      }
    })

    const lefts = d3.cumsum(leftPoss)

    data.forEach((d, i) => {
      d.x = lefts[i]
      d.y = options.height / 2 - d.radius / 2
    })
  } else if (layout === 'divide-c2c') {
    // 等分全部长度，保证圆心距离相同
    // 等分全部长度，保证圆边缘距离相等
    const al = options.width / (data.length - 1)
    const minRadius = options.radiusMin || al / 5
    const maxRadius = options.radiusMax || al
    const calcWidth = d3.scaleLinear()
      .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)])
      .range([minRadius, maxRadius])

    data.forEach((d, i) => {
      d.r = calcWidth(d.value)
    })

    // 左侧距离
    const leftPoss = data.map((d, i) => {
      if (d.i === 0) {
        return al / 2 - d.r / 2
      } else {
        return al - d.r / 2 + data[i - 1].r / 2
      }
    })

    const lefts = d3.cumsum(leftPoss)

    data.forEach((d, i) => {
      d.x = lefts[i]
      d.y = options.height / 2 - d.r / 2
    })
  } else if (layout === 'fixed-c2c') {
    // 固定的圆心间距
  } else if (layout === 'fixed-e2e') {
    // 固定的边缘间距
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
  layoutType = 'divide-c2c',
  duration = 10000,
  // 按距离等分
  space = 30,
  // 最大半径
  radiusMax = 60,
  // 最小半径
  radiusMin = 50,
  width = 600,
  height = 300
}) => {
  if (!Array.isArray(values)) {
    return (
      <div>
        Error {values}
      </div>
    )
  }
  const preValues = usePrevious(values)
  const bubbleData = values.map((value, i) => ({
    i,
    value
  }))

  calcLayout(bubbleData, layoutType, Object.assign({
    width,
    height,
    radiusMax,
    radiusMin,
    space
  }))

  useEffect(() => {
    bubbleData.forEach((d, i) => {
      anime({
        targets: d.ref.current,
        duration,
        delay: 100 * i,
        opacity: [0.5, 1],
        translateX: [-100, d.x],
        translateY: [d.y, d.y]
        // easing: 'spring(1, 80, 10, 0)',
      })
    })
  })

  return (
    <div style={{
      width: width + 'px',
      height: height + 'px'
    }}
    >
      {bubbleData.map(d => bubbleRenderer(d))}
    </div>
  )
}
