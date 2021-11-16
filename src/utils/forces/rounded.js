import * as d3 from 'd3'
import { scaleRadius } from './scale-radius.js'

// 圆形分布
export const roundedLayout = (data, options) => {
  scaleRadius(data, options)
  const nodes = data.map(d => ({
    r: d.r || 20,
    x: d.x,
    y: d.y
  }))

  // 最小半径
  const defaultAd = (Math.PI * 2 * (options.r / 2 || 1000) / data.length)
  const sim = d3.forceSimulation(nodes)
    .force('radial', d3.forceRadial(options.r || 1000, options.w / 2, options.h / 2).strength(1))
    .force('collide', d3.forceCollide().radius(d => {
      if (options.ad) {
        return d.r / 2 + options.ad
      } else {
        return defaultAd - 5
      }
    }).strength(1))
    .tick(100)

  return sim.nodes()
}
