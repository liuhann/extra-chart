import * as d3 from 'd3'
import { scaleRadius } from './scale-radius.js'

export const centeredLayout = (data, options) => {
  scaleRadius(data, options)

  const simulation = d3.forceSimulation(data)
    .force('x', d3.forceX(options.w / 2).strength(1))
    .force('y', d3.forceY(options.h / 2).strength(1))
    .force('collide', d3.forceCollide().radius(d => d.r / 2 + (options.ad || 0)).strength(1))
    .force('center', d3.forceCenter(options.w / 2, options.h / 2))
    .tick(300)

  return simulation.nodes()
}
