import * as d3 from 'd3'

// 按最大和最小半径进行计算
export const scaleRadius = (data, options) => {
  // 最小半径
  const radiusMin = options.radiusMin || 80
  const radiusMax = options.radiusMax || 30
  const calcWidth = d3.scaleLinear()
    .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)])
    .range([radiusMin, radiusMax])
  data.forEach((d, i) => {
    d.r = calcWidth(d.value)
  })
  return data
}
