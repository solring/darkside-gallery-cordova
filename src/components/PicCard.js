import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import useLongPress from '../hooks/useLongPress'

import styles from './PicCard.module.scss'

function PicCard(props) {
  const {data, onClick} = props
  const {title, img, desc, tags} = data

  const ref = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  let longPress = useLongPress(ref)

  const Article = (
    <article ref={ref} className={`shadow-btn ${styles.card} ${props.className}`}>

      <img
        src={img}
        alt={title}
        onLoad={() => setIsLoaded(true)}
      />

      <div className={styles.overlay} data-longpress={longPress}>
        <div className={`p-3 ${styles.text}`}>
          <h4>{title}</h4>
          <p className={styles.subtitle}>{desc}</p>
          <div className="text-wrap">
            {tags && tags.map((t, i) => (
              <small key={i} className="me-1">#{t}</small>
            ))}
          </div>
        </div>
      </div>

    </article>
  )

  if (onClick) {
    return (
        <button className={styles.btn + " d-block"} onClick={() => onClick(data)}>
          {Article}
        </button>
    )
  } else {
    return (
        <div> {/* This div is to protect the ref of Article from being affected by Reveal. */}
          {Article}
        </div>
    )
  }
}

PicCard.propTypes = {
  data: PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string,
    desc: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  onClick: PropTypes.func,
}

export default PicCard

