import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import ThemeContext from '../context/ThemeContext'

function Switch({name, val, setVal, txt, ...props}) {
  const {gradient1} = useContext(ThemeContext)
  return (
    <div  {...props}>
      <div className="form-check form-switch d-flex align-items-center" >
        <input
          className="form-check-input mt-0 me-2"
          type="checkbox"
          id={`switch_${name}`}
          value={val}
          onChange={(e) => setVal(e.target.checked)}
          style={{
            width: "4rem",
            height: "2rem",
          }}
        />
        <label
          className="form-check-label theme-transition lh-1"
          htmlFor={`switch_${name}`}
          style={{color: gradient1}}
        >
          {txt}
        </label>
      </div>
    </div>
  )
}

Switch.propTypes = {
  name: PropTypes.string,
  val: PropTypes.bool.isRequired,
  setVal: PropTypes.func.isRequired,
  txt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}

export default Switch

