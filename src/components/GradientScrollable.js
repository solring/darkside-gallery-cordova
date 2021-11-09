import React, { useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import useScrollThrottle from '../hooks/useScrollThrottle'
import { RGBtoHex, hexToRGB } from '../utils/colorUtils'

function GradientScrollable({color1, color2, height, onScroll, ...props}) {
  const THROTTLE = 100

  const ref = useRef()
  const [x, pos] = useScrollThrottle(ref, THROTTLE)

  const _color1 = hexToRGB(color1)
  const _color2 = hexToRGB(color2)
  let c1 = Math.floor(pos/height)%2 > 0 ? _color2: _color1
  let c2 = Math.floor(pos/height)%2 > 0 ? _color1: _color2

  let offset = Math.round(pos % height / height * 100) // in percentage
  let offsetC1 = calcuColor(c2, c1, offset/100)
  let offsetC2 = calcuColor(c1, c2, offset/100)

  let style = {
    overflowX: "hidden",
    overflowY: "scroll",
    height: `${height}px`,
    background: `linear-gradient(${RGBtoHex(offsetC1)} 0%, ${RGBtoHex(c1)} ${offset}%, ${RGBtoHex(offsetC2)} 100%)`,
  }

  function calcuColor(c1, c2, w) {
    let n1 = c1.map((c, i) => {
      return Math.round(c * w + c2[i] * (1-w))
    })
    return n1
  }

  useLayoutEffect(() => {
    if(onScroll) onScroll(x, pos)
  }, [x, pos, onScroll])

  return (
    <div ref={ref} style={style} className={`${props.className} theme-transition`}>
      {props.children}
    </div>
  )
}

GradientScrollable.propTypes = {
  color1: PropTypes.string.isRequired,
  color2: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  onScroll: PropTypes.func,
}

export default GradientScrollable