import * as d3 from 'd3'
// 固定的等边缘间距
export default function (data, options) {
  const ad = options.ad || options.radiusMin || d3.max(data, d => d.value)
  // 最小与最大直径
  const minRadius = options.radiusMin || ad * 5
  const maxRadius = options.radiusMax || ad

  const calcWidth = d3.scaleLinear()
    .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)])
    .range([minRadius, maxRadius])

  data.forEach((d, i) => {
    d.r = calcWidth(d.value)
  })

  let lastInc = 0
  data.forEach((d, i) => {
    d.x = lastInc
    d.y = options.height / 2 - d.r / 2
    lastInc += d.r + ad
  })
}
