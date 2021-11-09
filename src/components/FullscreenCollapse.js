import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import { Collapse } from 'react-bootstrap'
import { useClickAway } from 'react-use'
import styles from './FullscreenCollapse.module.scss'

function FullScreenCollapse (props) {
  const { toggle, onClose, title} = props;

  const ref = useRef(null)
  useClickAway(ref, (e) => {
    e.stopPropagation()
    onClose()
  }, ['mouseup', 'touchend'])

  return(
    <Collapse in={toggle} className={styles.collapse} data-testid="fs-collapse">
      <div> {/* Essential for Collapse to animate smoothly.*/}
      <div className={styles.wrapper}>

        <div ref={ref}>
          {title &&
            <div className={`${styles.header} bg-light`}>
              <div>{title}</div>
              <button type="button" className="btn btn-link text-dark" onClick={onClose}>
                <span className="material-icons icon-lg">close</span>
              </button>
            </div>
          }

          <div className={styles.content}>
            {props.children}
          </div>
        </div>

      </div>
      </div>
    </Collapse>
  )
}

FullScreenCollapse.propTypes = {
  toggle: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([
   PropTypes.string,
   PropTypes.object,
  ]),
}

export default FullScreenCollapse

