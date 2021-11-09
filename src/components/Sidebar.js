import React, { useContext, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Collapse } from 'react-bootstrap'
import { useClickAway, useToggle } from 'react-use'

import GradientWord from './GradientWord'
import SocialNetworkBtns from './SocialNetworkBtns'

import ThemeContext from '../context/ThemeContext'

import styles from './Sidebar.module.scss'

function CancelTouchWrapper(props) {
  const ref = useRef(null)

  const cancel = (e) => {
    e.stopPropagation()
  }
  
  useEffect(() => {
    const ele = ref.current
    if (!ele) return

    ele.addEventListener('touchend', cancel)
    return () => {
      ele.removeEventListener('touchend', cancel)
    }
  }, [])

  return (
    <div className={props.className} ref={ref}>
      {props.children}
    </div>
  )
}

function Sidebar(props) {
  const { footer, fullscreen = false } = props
  const { gradient1, gradient2, background } = useContext(ThemeContext)

  const [on, toggle] = useToggle(true) // default on

  const ref = useRef(null)

  useClickAway(ref, () => {
    toggle(false)
  }, ['touchend'])

  useEffect(() => {
    const ele = ref.current
    if (!ele) return

    ele.addEventListener('touchend', toggle)
    return () => {
      ele.removeEventListener('touchend', toggle)
    }
  }, [toggle])

  const Content = (
    <div className="h-100 d-flex flex-column justify-content-between pt-4">
      <div className="order-md-2">
        <CancelTouchWrapper>
          {footer}
        </CancelTouchWrapper>
      </div>
      <div className="order-md-1">
        <h1 className="visually-hidden">Welcome to My Rabbit Hole</h1>
        <GradientWord
          className="font-title"
          color1={gradient1}
          color2={gradient2}
          texts={["Welcome", "to my", "Rabbit Hole."]}
          fz={54}
          gap={4}
          width={250}
        />

        <h2 className="h4 text-muted mt-5">Personal Gallery of Solring.</h2>
        <CancelTouchWrapper className="mt-4 d-inline-block mb-3">
          <SocialNetworkBtns />
        </CancelTouchWrapper>
      </div>
    </div>
  )

  if(fullscreen) {
    return (
      <header ref={ref} className={styles.sidebar + " theme-transition"} style={{ background }}>
        <Collapse
          in={on}
        >
          <div>
            {Content}
          </div>
        </Collapse>
        <div ref={ref} className={styles.hiddenButton}>
          <span className="visually-hidden">toggle sidebar</span>
        </div>
      </header>
    )
  } else {
    return (
      <header className={styles.sidebar + " theme-transition"} style={{ background }}>
        {Content}
      </header>
    )
  }
}

Sidebar.propTypes = {
  footer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  fullscreen: PropTypes.bool,
}

export default Sidebar

