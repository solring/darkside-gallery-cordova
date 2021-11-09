import React, { useState, useMemo, useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { useMedia, useIntersection } from 'react-use'

import PicCard from './PicCard'
import PicModal from './PicModal'

import {BS_BREAKPOINT_SM, BS_BREAKPOINT_LG, BS_BREAKPOINT_XL} from '../utils/constants'

/**
 * assignRows:
 * Assign each picture item a row using greedy policy.
 * @items : a list of picture items
 * @rowNum : number of rows to assign items to
 */
function assignRows(items, rowNum) {
  if(!items || !rowNum) return []

  let rows = Array(rowNum).fill(0).map(() => [])
  let rowH = Array(rowNum).fill(0)

  // can use min heap but there are only 4 rows at most
  function getShortestRow(){
    if(rowNum === 1) return 0

    let res = 0
    let min = rowH[0]
    for (let i = 1; i < rowH.length; i++) {
      const h = rowH[i];
      if (h < min) {
        min = h
        res = i
      }
    }
    return res
  }

  for (let i = 0; i < items.length; i++) {
    const ele = items[i]
    const r = getShortestRow()
    rows[r].push(ele)
    rowH[r] += ele.height
  }

  return rows
}

function PicGrid(props) {
  const { items, onExhausted } = props

  // RWD
  const isPhone = useMedia(`(max-width: ${BS_BREAKPOINT_SM})`)
  const isTablet = useMedia(`(max-width: ${BS_BREAKPOINT_LG})`)
  const isScreen = useMedia(`(max-width: ${BS_BREAKPOINT_XL})`)

  const rowNum = isPhone ? 1
                  : isTablet ? 2
                  : isScreen ? 3 : 4

  const rows = useMemo(() => assignRows(items, rowNum), [items, rowNum])

  // modal control
  const [on, setOn] = useState(false)
  const [currPic, setCurrPic] = useState(null)

  const onPicCardClick = (item) => {
    setCurrPic(item)
    setOn(true)
  }

  // intersection hook
  const lastEle = useRef()
  const intersection = useIntersection(lastEle, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  })
  const ratio = intersection ? intersection.intersectionRatio : 0;

  // monitor intersection to load more pictures
  useLayoutEffect(() => {
    //console.log(`ratio: ${ratio}`)
    if (ratio === 1) {
      if(onExhausted) onExhausted()
    }
  }, [ratio, onExhausted])

  // monitor input empty
  useLayoutEffect(() => {
    if (items.length === 0) {
      if(onExhausted) onExhausted()
    }
  }, [items, onExhausted])


  if(!items || items.length === 0) return <div></div>

  return (
    <div data-testid="picGrid" className={props.className}>
      <div className="row g-3 my-3 mx-sm-3">
        {rows.map((row, i) => (
          <div key={i} className="col" >
            {row.map((item, j) => {
              // if last element: register intersection observer
              return (
                <div key={j} ref={item === items[items.length-1] ? lastEle : null}>
                  <PicCard className="mb-3" data={item} onClick={isPhone ? null : onPicCardClick}/>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <PicModal
      toggle={on}
      onClose={() => setOn(false)}
      data={currPic}
      />
    </div>
  )
}

PicGrid.propTypes = {
  items: PropTypes.array.isRequired,
  onExhausted: PropTypes.func,
}

export default PicGrid

