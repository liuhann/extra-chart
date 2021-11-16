import * as d3 from 'd3'
import { scaleRadius } from './scale-radius.js'
export const pathLayout = (data, options) => {
  const svg = d3.create('svg').style('width', '600px').style('height', '600px')
    .attr('viewBox', [0, 0, 1200, 1200])

  scaleRadius(data, options)

  const nodes = data.map(d => ({
    r: d.r || 20,
    x: d.x,
    y: d.y
  }))

  const g = svg.append('g')
  // const path = g.append('path').attr('d', 'M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z')
  const path = g.append('path').attr('d', options.path)
  // const path = g.append('path').attr('d', 'M 0 5 C 2 1 6 1 9 5 L 0 5 M 0 5')
  document.body.appendChild(svg.node())

  const force = pathForce(path.node(), nodes, {
    strength: 1
  })

  const sim = d3.forceSimulation(nodes)
    .force('svg-path', force)
    .force('collide', d3.forceCollide().radius(6))
    .tick(300)

  document.body.removeChild(svg.node())
  return sim.nodes()
}

const callable = v => typeof v === 'function' ? v : () => v
// Defines a force that moves nodes along an SVG path.
//
// Parameters:
// - path: An SVGGeometryElement (e.g. a <path> element).
//         Note: Elements other than <path> need to be attached to the DOM.
// - nodes: the simulation nodes.
// - options: An object with any of the following properties:
//   - strength: ratio of the distance a node is moved towards its target at each step.
//   - offset: callback that returns a node's relative offset along the path (from 0 to 1).
//   - clamp: max movement distance per iteration step.
//   - initialize: sets each node's position to its target on the path.
function pathForce (path, nodes, {
  strength = 0.1,
  offset = (n, i, nodes) => i / nodes.length,
  initialize = true,
  clamp = Infinity
} = {}) {
  const getStrength = callable(strength)
  const getClamp = callable(clamp)
  const getScale = max => !isFinite(max)
    ? () => 1
    : (dx, dy) => {
        const d = Math.hypot(dx, dy)
        return d ? Math.min(max, d) / d : 0
      }
  const getPoint = (i, l) => path.getPointAtLength(offset(nodes[i], i, nodes) * l)
  const getLength = () => path.getTotalLength()

  // Initialize node positions along the path.
  if (initialize) {
    const l = getLength()
    for (let i = 0, p; i < nodes.length; i++) {
      p = getPoint(i, l)
      nodes[i].x = p.x
      nodes[i].y = p.y
    }
  }
  // The simulation step callback.
  return () => {
    const l = getLength()
    const s = getStrength()
    const clamp = getScale(getClamp())

    for (let i = 0, p, n, dx, dy, c; i < nodes.length; i++) {
      p = getPoint(i, l)
      n = nodes[i]
      dx = s * (p.x - n.x)
      dy = s * (p.y - n.y)
      c = clamp(dx, dy)
      n.vx += c * dx
      n.vy += c * dy
    }
  }
};
