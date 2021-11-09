import React from 'react'
import PropTypes from 'prop-types'

import { Accordion } from 'react-bootstrap'
import FullScreenCollapse from './FullscreenCollapse'
import Icon from './Icon'
import Tag from './Tag'

import styles from './NavTabsFullscreen.module.scss'

function NavTabsFullscreen(props) {
  const { toggle, items, selectedTags, onSelect, onTagSelect, onClose } = props

  if (!items) return <div></div>

  return (
    <FullScreenCollapse
      toggle={toggle}
      onClose={onClose}
      title={
        <span className="text-uppercase h3">
          <Icon name="filter_list" className="align-middle me-2"/>
          Filter
        </span>
      }
    >
      <div className={styles.wrapper + " shadow-down"} data-testid="navTabs">
        <Accordion>
          { items.map((item, i) => (
            <Accordion.Item key={i} eventKey={i}>
              <Accordion.Header onClick={() => onSelect(i)}>
                <h3 className="text-uppercase" >{item.category}</h3>
              </Accordion.Header>
              <Accordion.Body className="text-center" >
                {item.tags && Array.isArray(item.tags) && item.tags.map((t, j) => (
                  <Tag
                    className="my-2"
                    key={j} active={selectedTags && selectedTags[t]}
                    onClick={() => onTagSelect(t, j)}
                  >
                    {`#${t}`}
                  </Tag>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          )) }
        </Accordion>
      </div>

    </FullScreenCollapse>
  )
}

NavTabsFullscreen.propTypes = {
  toggle: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  selectedTags: PropTypes.object,
  onSelect: PropTypes.func,
  onTagSelect: PropTypes.func,
  onClose: PropTypes.func.isRequired,
}

export default NavTabsFullscreen

