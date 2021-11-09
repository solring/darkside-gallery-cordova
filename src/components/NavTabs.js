import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import ThemeContext from '../context/ThemeContext'
import styles from './NavTabs.module.scss'
import { Collapse } from 'react-bootstrap'

import Tag from './Tag'

function NavTabs(props) {
  const { items, selected, selectedTags, onSelect, onTagSelect, scrollPos = 0 } = props

  const tags = (selected >= 0 && selected < items.length) ?
                items[selected].tags : []
  const toggle = tags && tags.length > 0;

  const {gradient2} = useContext(ThemeContext)
  const scrolled = scrollPos > 4
  const bg = scrolled ? { background: gradient2 } : {}

  if (!items) return <div></div>

  return (
    <nav className={styles.navtabs} style={bg} data-testid="navTabs" data-scroll={scrolled}>

      <ul role="tablist" className={styles.inner} data-open={toggle}>
        {items.map((item, idx) => (
          <li
            key={idx} role="tab"
            className={`d-inline-block me-3 ${styles.itemWrap}`}
            data-active={selected === idx}
          >
            <button className={`
              hvr-underline-from-center
              ${styles.item}
              ${selected === idx ? "active" : ""}
            `}
              onClick={() => onSelect(idx)}>
              <h3 className="h5">{item.category}</h3>
            </button>
          </li>
        ))}
      </ul>
      <Collapse in={toggle} role="tabpanel" className="bg-light">
        <div>{/* Empty div is essential */}

        <div className="container">
          <div className="d-flex flex-wrap justify-content-center py-3">
            {tags && Array.isArray(tags) && tags.map((t, idx) => (
              <Tag
                className="me-3 mb-1"
                key={idx} active={selectedTags && selectedTags[t]}
                onClick={() => onTagSelect(t, idx)}
              >
                {`#${t}`}
              </Tag>
            ))}
          </div>
        </div>

        </div>
      </Collapse>

    </nav>
  )
}

NavTabs.propTypes = {
  items: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  selectedTags: PropTypes.object,
  onSelect: PropTypes.func,
  onTagSelect: PropTypes.func,
  scollPos: PropTypes.number,
}

export default NavTabs

