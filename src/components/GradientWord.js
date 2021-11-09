import React from 'react'
import PropTypes from 'prop-types'

function GradientWord({color1, color2, texts, fz = 16, gap = 8, width = 200, ...props}) {

  const h = texts.length * (fz+gap)

  return (
    <svg viewBox={`0 0 ${width} ${h}`} xmlns="http://www.w3.org/2000/svg" width="100%">
      <defs>
        <linearGradient id="themeGradient" gradientTransform="rotate(-15)">
          <stop offset="0%" stopColor={color1}/>
          <stop offset="40%" stopColor={color2}/>
        </linearGradient>
      </defs>

      <text x="0" y="0" className={props.className} fill="url(#themeGradient)">
        {texts.map((t, i) => (
          <tspan key={i} x="0" dy={fz+gap} fontSize={fz}>
            {t}
          </tspan>
        ))}
      </text>
    </svg>
  )
}

GradientWord.propTypes = {
  color1: PropTypes.string.isRequired,
  color2: PropTypes.string.isRequired,
  texts: PropTypes.arrayOf(PropTypes.string).isRequired,
  fz: PropTypes.number,
  gap: PropTypes.number,
  width: PropTypes.number,
}

export default GradientWord

