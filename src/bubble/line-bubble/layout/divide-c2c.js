import * as d3 from 'd3'
// 等分全部长度，保证圆边缘距离相等
export default function (data, options) {
  const al = options.width / (data.length)
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
}
