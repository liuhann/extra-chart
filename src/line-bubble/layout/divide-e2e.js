import * as d3 from 'd3'
// 等分全部长度，保证圆边缘距离相等
export default function (data, options) {
    const averageLength = options.width / (data.length - 1)
    const minRadius = options.radiusMin || averageLength / 5
    const maxRadius = options.radiusMax || averageLength
    const calcWidth = d3.scaleLinear()
      .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)])
      .range([minRadius, maxRadius])

    data.forEach((d, i) => {
      d.r = calcWidth(d.value)
    })

    // 计算间距  总长度 - 所有圆直径 / 圆数量 -1
    const sl = (options.width - d3.sum(data, d => d.r)) / (data.length - 1)

    // 左侧
    const leftPoss = data.map((d, i) => {
      if (d.i === 0) {
        return 0
      } else {
        return (data[i - 1].r) + sl
      }
    })

    const lefts = d3.cumsum(leftPoss)

    data.forEach((d, i) => {
      d.x = lefts[i]
      d.y = options.height / 2 - d.r / 2
    })
}