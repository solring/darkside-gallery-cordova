import React from 'react'
import PropTypes from 'prop-types'

import styles from './Tag.module.scss'

function Tag(props) {
  const { active, onClick } = props
  return (
    <button
      className={`
        hvr-underline-from-center
        ${styles['base']}
        ${active ? "active": ""}
        ${props.className}
      `}
      onClick={onClick}
    >
      {props.children}
    </button>
  )
}

Tag.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Tag