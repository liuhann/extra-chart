import * as d3 from 'd3'

// 圆形分布
const roundedLayout = (data, options) => {
  const nodes = data.map(d => ({
    r: d.r || 20,
    x: d.x,
    y: d.y
  }))

  // 最小半径
  const radiusMin = d3.min(nodes.map(d => d.r))
  const defaultAd = (Math.PI * 2 * (options.r / 2 || 1000) / data.length)
  console.log('defaultAd', radiusMin, defaultAd)
  const sim = d3.forceSimulation(nodes)
    .force('radial', d3.forceRadial(options.r || 1000, options.w / 2, options.h / 2).strength(1))
    .force('collide', d3.forceCollide().radius(d => {
      if (options.ad) {
        return d.r / 2 + (options.ad || 2)
      } else {
        return defaultAd - 5
      }
    }).strength(1))
    .tick(10)

  // return new Promise((resolve, reject) => {
  //   sim.on('tick', () => {
  //     resolve(sim.nodes())
  //   })
  // })
  return sim.nodes()
}

const pathLayout = (data, options) => {
  const nodes = data.map(d => ({
    r: d.r || 20,
    x: d.x,
    y: d.y
  }))

  const force = pathForce(options.path, nodes)

  const sim = d3.forceSimulation(nodes)
    .force('svg-path', force)
    .force('collide', d3.forceCollide().radius(6))
    .tick(4000)
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

export {
  roundedLayout,
  pathLayout
}
