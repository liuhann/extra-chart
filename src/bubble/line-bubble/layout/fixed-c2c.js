import * as d3 from 'd3'
// 固定的圆心间距, 按圆心位置平分
export default function (data, options) {
  const al = options.al || d3.max(data, d => d.value)
  // 最小与最大直径
  const minRadius = options.radiusMin || al / 5
  const maxRadius = options.radiusMax || al

  const calcWidth = d3.scaleLinear()
    .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)])
    .range([minRadius, maxRadius])

  data.forEach((d, i) => {
    d.r = calcWidth(d.value)
  })

  data.forEach((d, i) => {
    d.x = (al * i - 1) + al / 2 - d.r / 2
    d.y = options.height / 2 - d.r / 2
  })
}
