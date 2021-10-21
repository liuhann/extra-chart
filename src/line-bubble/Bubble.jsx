import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'

export default ({
  values = [45, 23, 102, 43, 55, 82, 69],
  // 按间距等分
  divideEqualBetween = 30,
  width = 1200,
  height = 300
}) => {
  if (!Array.isArray(values)) {
    return <div>
      Error {values}
    </div>
  }
  const ref = React.createRef()
  const [oldValues, setOldValue] = useState(values);

  const bubbleData = values.map(v => ({
    value: v
  }))

  // 等间距排列
  if (divideEqualBetween) {
      const availableTotalWidth = (width - divideEqualBetween * (values.length - 1))
      const calcWidth = d3.scaleLinear()
        .domain([0, d3.sum(values)])
        .range([0, availableTotalWidth])

      bubbleData.forEach((d, i)=> {
        d.radius = calcWidth(d.value)
      })

      const leftPoss = bubbleData.map((d, i) => {
        if (i === 0) {
          return 0
        } else {
          return bubbleData[i - 1].radius + divideEqualBetween
        }
      })

      const lefts = d3.cumsum(leftPoss)

      bubbleData.forEach((d, i)=> {
        d.left = lefts[i]
        d.top = height / 2 - d.radius / 2
      })
  }
  

  return <div style={{
      width: width + 'px',
      height: height + 'px'
  }}>
    {bubbleData.map((d, i) =>(<div
      key={i}
      style={{
        transition: 'transform .8s, width .8s, height .8s',
        transformOrigin: 'center center',
        position: 'absolute',
        background: '#444',
        transform: `translate(${d.left}px, ${d.top}px)`,
        height: d.radius + 'px',
        borderRadius: '100%',
        width: d.radius + 'px'
      }}>
    </div>))}
  </div>
}
