import * as d3 from 'd3'
import { scaleRadius } from './scale-radius.js'

export const linearLayout = (data, options) => {
  scaleRadius(data, options)

  const simulation = d3.forceSimulation(data)
    .force('y', d3.forceY(options.h / 2).strength(1))
    .force('center', d3.forceCenter(options.w / 2, options.h / 2))

  if (options.al) {
    simulation.force('collide', d3.forceCollide().radius(d => options.al).strength(1))
  } else if (options.ad) {
    simulation.force('collide', d3.forceCollide().radius(d => d.r / 2 + options.ad).strength(1))
  }
  simulation.tick(50)

  return simulation.nodes()
}
